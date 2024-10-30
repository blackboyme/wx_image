<script setup>
import { useWxContentStore } from '../stores/wxContent'
import NavBar from '../components/NavBar.vue'

const store = useWxContentStore()

const handleCollect = () => {
  store.fetchContent(store.url)
}

const handleDownloadText = async () => {
  try {
    await store.downloadText()
  } catch (error) {
    console.error('下载文本失败:', error)
  }
}
</script>

<template>
  <div class="page-container">
    <NavBar />
    
    <main class="main-container">
      <h1 class="title">公众号内容采集助手</h1>
      <p class="subtitle">一键获取公众号图文内容</p>

      <div class="content-card">
        <div class="input-header">
          <h2 class="input-title">请输入公众号链接</h2>
          <p class="input-desc">支持微信公众号文章链接</p>
        </div>

        <div class="input-area">
          <textarea 
            v-model="store.url" 
            placeholder="请将公众号文章链接粘贴到这里..."
            :disabled="store.isProcessing"
            class="url-input"
            rows="4"
          ></textarea>
          
          <button 
            @click="handleCollect" 
            :disabled="!store.url || store.isProcessing"
            class="action-button"
          >
            {{ store.isProcessing ? '采集中...' : '开始采集' }}
          </button>
        </div>

        <div v-if="store.error" class="error-message">
          {{ store.error }}
        </div>

        <div class="progress-section" v-if="store.isProcessing">
          <div class="task-info">
            <span>{{ store.currentTask }}</span>
            <span>{{ store.progress }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${store.progress}%` }"></div>
          </div>
        </div>

        <div class="example-section" v-if="store.images.length > 0">
          <h3>图片预览 ({{ store.totalImages }}张)</h3>
          <div class="image-grid">
            <div v-for="(image, index) in store.images" :key="index" class="image-item">
              <img :src="image" :alt="`图片 ${index + 1}`">
            </div>
          </div>
        </div>

        <div class="download-section" v-if="store.isComplete">
          <button 
            @click="handleDownloadText" 
            class="download-button"
            :disabled="store.isProcessing"
          >
            <span class="download-icon">📄</span>
            {{ store.isProcessing ? '下载中...' : '下载文字内容' }}
          </button>
          <button @click="store.downloadImages" class="download-button">
            <span class="download-icon">🖼️</span>
            下载全部图片
          </button>
        </div>
      </div>

      <!-- <div class="example-section" v-if="!store.images.length">
        <h3>例图片</h3>
        <div class="image-grid">
          <div class="image-item" v-for="n in 4" :key="n">
            <img :src="`/examples/example${n}.jpg`" :alt="`示例 ${n}`">
          </div>
        </div>
      </div> -->
    </main>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f8fafc;
  width: 100%;
}

.main-container {
  width: 100%;
  padding: 3rem 0;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  color: #177F62;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  text-align: center;
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.content-card {
  background: white;
  border-radius: 0;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 2rem;
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
}

.input-header {
  text-align: center;
  margin-bottom: 2rem;
}

.input-title {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.input-desc {
  color: #64748b;
  font-size: 0.9rem;
}

.input-area {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.url-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;
}

.url-input:focus {
  outline: none;
  border-color: #177F62;
}

.action-button {
  padding: 1rem;
  background: #177F62;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button:hover {
  background: #146c54;
}

.action-button:disabled {
  background: #e2e8f0;
  cursor: not-allowed;
}

.progress-section {
  max-width: 800px;
  width: 100%;
  margin: 0 auto 2rem;
}

.task-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #64748b;
}

.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #177F62;
  transition: width 0.3s ease;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.image-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-item:hover img {
  transform: scale(1.05);
}

.download-section {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
}

.download-button {
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s;
}

.download-button:hover {
  background: #f1f5f9;
  border-color: #177F62;
  color: #177F62;
}

.download-icon {
  font-size: 1.25rem;
}

.example-section h3 {
  color: #475569;
  margin-bottom: 1rem;
  font-weight: 500;
}

.error-message {
  max-width: 800px;
  width: 100%;
  margin: 0 auto 1rem;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 0.5rem;
  color: #dc2626;
}

@media (max-width: 768px) {
  .main-container {
    width: 100%;
    padding: 2rem 0;
  }
  
  .content-card {
    min-height: 400px;
  }
  
  .input-area,
  .progress-section,
  .example-section,
  .download-section,
  .error-message {
    padding: 0 1rem;
  }
  
  /* 其他媒体查询样式保持不变 */
}

/* 修改图片预览区域的样式 */
.example-section {
  width: 100%;
  padding: 0 2rem;
}

/* 修改下载区域样式 */
.download-section {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
}

/* 进度条区域也保持一致的宽度 */
.progress-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
}

/* 错误消息样式更新 */
.error-message {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 1rem;
  padding: 1rem 2rem;
}

@media (max-width: 768px) {
  .example-section,
  .download-section,
  .progress-section,
  .error-message {
    padding: 0 1rem;
  }
  
  .download-section {
    padding: 1rem;
  }
}
</style>
