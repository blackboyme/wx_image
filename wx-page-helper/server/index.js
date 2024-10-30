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

// 修改静态文件服务的路径
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
    
    // 创建一个Set来存储唯一的图片URL
    const imageSet = new Set()
    
    // 1. 提取所有常规图片
    $('#js_content img').each((i, elem) => {
      const imgUrl = $(elem).attr('data-src') || $(elem).attr('src')
      if (imgUrl) {
        imageSet.add(imgUrl)
      }
    })
    
    // 2. 提取SVG标签中的图片
    $('#js_content svg image').each((i, elem) => {
      const imgUrl = $(elem).attr('xlink:href') || $(elem).attr('href')
      if (imgUrl) {
        imageSet.add(imgUrl)
      }
    })

    // 3. 提取SVG的背景图片
    $('#js_content svg').each((i, elem) => {
      const style = $(elem).attr('style')
      if (style) {
        const match = style.match(/url\(['"]?(.*?)['"]?\)/)
        if (match && match[1]) {
          imageSet.add(match[1])
        }
      }
    })

    // 4. 96编辑器特定结构
    $('#js_content section svg image, .rich_pages svg image').each((i, elem) => {
      const imgUrl = $(elem).attr('xlink:href') || $(elem).attr('href')
      if (imgUrl) {
        imageSet.add(imgUrl)
      }
    })

    // 5. 检查使用foreignObject的SVG
    $('foreignObject img').each((i, elem) => {
      const imgUrl = $(elem).attr('data-src') || $(elem).attr('src')
      if (imgUrl) {
        imageSet.add(imgUrl)
      }
    })

    // 添加调试输出
    console.log('Found SVG elements:', $('#js_content svg').length)
    console.log('Found SVG images:', $('#js_content svg image').length)
    
    // 过滤掉无效的URL
    const images = Array.from(imageSet).filter(url => {
      return url && 
             url.startsWith('http') && 
             !url.includes('blank.gif') &&
             !url.includes('icon') &&
             !url.includes('logo')
    })
    
    // 输出找到的图片数量
    console.log('Total unique images found:', images.length)
    
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
