const express = require('express')
const cors = require('cors')
const axios = require('axios')
const cheerio = require('cheerio')
const archiver = require('archiver')
const path = require('path')
const fs = require('fs').promises
const { createWriteStream } = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 服务静态文件
app.use(express.static(path.join(__dirname, '../dist')))

// 创建临时文件夹用于存储下载的图片
const TEMP_DIR = path.join(__dirname, 'temp')
const ensureTempDir = async () => {
  try {
    await fs.access(TEMP_DIR)
  } catch {
    await fs.mkdir(TEMP_DIR, { recursive: true })
  }
}

// 提取文章内容
app.post('/api/extract', async (req, res) => {
  try {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: '请提供文章链接' })
    }

    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    
    // 提取文章内容（根据实际微信文章HTML结构调整选择器）
    const content = $('#js_content').text().trim()
    
    res.json({ content })
  } catch (error) {
    console.error('提取内容失败:', error)
    res.status(500).json({ error: '内容提取失败' })
  }
})

// 获取图片列表
app.post('/api/images', async (req, res) => {
  try {
    const { url } = req.body
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    
    // 提取所有图片URL（根据实际微信文章HTML结构调整选择器）
    const images = []
    $('#js_content img').each((i, elem) => {
      const imgUrl = $(elem).attr('data-src') || $(elem).attr('src')
      if (imgUrl) {
        images.push(imgUrl)
      }
    })
    
    res.json({ images })
  } catch (error) {
    console.error('获取图片列表失败:', error)
    res.status(500).json({ error: '获取图片失败' })
  }
})

// 下载图片并打包
app.post('/api/download-images', async (req, res) => {
  try {
    const { images } = req.body
    await ensureTempDir()
    
    // 创建zip文件
    const archive = archiver('zip', {
      zlib: { level: 9 }
    })
    
    const zipPath = path.join(TEMP_DIR, `images-${Date.now()}.zip`)
    const output = createWriteStream(zipPath)
    
    archive.pipe(output)
    
    // 下载每张图片并添加到zip
    for (let [index, imageUrl] of images.entries()) {
      const response = await axios({
        url: imageUrl,
        responseType: 'arraybuffer'
      })
      
      const extension = path.extname(imageUrl) || '.jpg'
      const filename = `image-${index + 1}${extension}`
      
      archive.append(response.data, { name: filename })
    }
    
    await archive.finalize()
    
    // 等待zip文件写入完成
    await new Promise((resolve) => output.on('close', resolve))
    
    // 发送zip文件
    res.download(zipPath, 'images.zip', async (err) => {
      if (err) {
        console.error('发送zip文件失败:', err)
      }
      
      // 清理临时文件
      try {
        await fs.unlink(zipPath)
      } catch (error) {
        console.error('清理临时文件失败:', error)
      }
    })
  } catch (error) {
    console.error('下载图片失败:', error)
    res.status(500).json({ error: '下载图片失败' })
  }
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: '服务器内部错误' })
})

// 所有其他请求都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})
