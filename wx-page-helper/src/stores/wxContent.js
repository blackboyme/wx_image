import { defineStore } from 'pinia'
import axios from 'axios'

export const useWxContentStore = defineStore('wxContent', {
  state: () => ({
    url: '',
    isProcessing: false,
    progress: 0,
    currentTask: '',
    totalImages: 0,
    wordCount: 0,
    isComplete: false,
    error: null,
    content: '',
    images: []
  }),

  actions: {
    async fetchContent(url) {
      if (!url) {
        this.error = '请输入文章链接'
        return
      }

      this.isProcessing = true
      this.progress = 0
      this.isComplete = false
      this.error = null
      this.content = ''
      this.images = []
      
      try {
        // 开始提取文字
        this.currentTask = '正在提取文字内容...'
        const textResponse = await axios.post('/api/extract', { url })
        
        // 检查响应数据
        if (!textResponse || !textResponse.data) {
          throw new Error('获取文章内容失败')
        }

        // 如果服务器返回错误
        if (textResponse.data.error) {
          throw new Error(textResponse.data.error)
        }

        // 设置内容
        this.content = textResponse.data.content || ''
        this.wordCount = this.content.length
        this.progress = 40
        
        // 开始获取图片
        this.currentTask = '正在获取图片...'
        const imagesResponse = await axios.post('/api/images', { url })
        
        // 检查图片响应
        if (!imagesResponse || !imagesResponse.data) {
          throw new Error('获取图片列表失败')
        }

        // 确保 images 是数组
        this.images = Array.isArray(imagesResponse.data.images) 
          ? imagesResponse.data.images 
          : []
        
        this.totalImages = this.images.length
        this.progress = 90
        
        // 完成处理
        this.currentTask = '处理完成'
        this.progress = 100
        this.isComplete = true

        return {
          content: this.content,
          images: this.images
        }
      } catch (error) {
        console.error('内容获取失败:', error)
        this.error = error.message || '内容获取失败'
        // 重置状态
        this.content = ''
        this.images = []
        this.totalImages = 0
        this.wordCount = 0
        this.isComplete = false
      } finally {
        this.isProcessing = false
      }
    },

    async downloadText() {
      if (!this.url) {
        this.error = '请先输入文章链接'
        return
      }
      
      try {
        this.isProcessing = true
        const response = await axios({
          method: 'post',
          url: '/api/extract',
          data: { url: this.url },
          responseType: 'blob',
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // 检查响应类型
        const contentType = response.headers['content-type']
        if (contentType && contentType.includes('application/json')) {
          // 如果返回的是JSON（错误信息）
          const reader = new FileReader()
          reader.onload = () => {
            const result = JSON.parse(reader.result)
            this.error = result.error || '下载失败'
          }
          reader.readAsText(response.data)
          return
        }

        // 创建下载链接
        const blob = new Blob([response.data], { type: 'text/plain;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        
        // 使用当前时间戳作为文件名的一部分
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        link.download = `微信文章_${timestamp}.txt`
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        this.error = null
      } catch (error) {
        console.error('文本下载失败:', error)
        this.error = error.response?.data?.error || '文本下载失败，请重试'
      } finally {
        this.isProcessing = false
      }
    },

    async downloadImages() {
      if (!this.images.length) {
        this.error = '没有可下载的图片'
        return
      }
      
      try {
        const response = await axios({
          method: 'post',
          url: '/api/download-images',
          data: { images: this.images },
          responseType: 'blob'
        })
        
        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = url
        link.download = '公众号图片.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('图片下载失败:', error)
        this.error = '图片下载失败'
      }
    },

    reset() {
      this.url = ''
      this.isProcessing = false
      this.progress = 0
      this.currentTask = ''
      this.totalImages = 0
      this.wordCount = 0
      this.isComplete = false
      this.error = null
      this.content = ''
      this.images = []
    }
  }
})
