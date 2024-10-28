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
    content: null,
    images: []
  }),

  actions: {
    async fetchContent(url) {
      this.isProcessing = true
      this.progress = 0
      this.isComplete = false
      this.error = null
      
      try {
        // 开始提取文字
        this.currentTask = '正在提取文字内容...'
        const response = await axios.post('/api/extract', { url })
        
        this.content = response.data.content
        this.wordCount = this.content.length
        this.progress = 40
        
        // 开始下载图片
        this.currentTask = '正在下载图片...'
        const imagesResponse = await axios.post('/api/images', { url })
        
        this.images = imagesResponse.data.images
        this.totalImages = this.images.length
        this.progress = 90
        
        // 完成处理
        this.currentTask = '处理完成'
        this.progress = 100
        this.isComplete = true
      } catch (error) {
        this.error = error.message
        console.error('内容获取失败:', error)
      } finally {
        this.isProcessing = false
      }
    },

    async downloadText() {
      if (!this.content) return
      
      const blob = new Blob([this.content], { type: 'text/plain;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = '公众号文章内容.txt'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },

    async downloadImages() {
      if (!this.images.length) return
      
      try {
        const response = await axios.post('/api/download-images', {
          images: this.images
        }, { responseType: 'blob' })
        
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
      }
    }
  }
})
