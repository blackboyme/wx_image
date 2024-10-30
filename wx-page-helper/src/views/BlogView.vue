<template>
  <div class="page-container">
    <NavBar />
    <main class="main-container">
      <div class="content-card">
        <h1 class="title">博客文章</h1>
        <p class="subtitle">分享一些技术文章和使用技巧</p>
        
        <div class="blog-list">
          <article v-for="post in blogPosts" :key="post.id" class="blog-post">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="post-meta">
              <span class="post-date">{{ post.date }}</span>
              <span class="post-author">{{ post.author }}</span>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { ref } from 'vue'

const blogPosts = ref([
  {
    id: 1,
    title: '如何使用微信文章采集工具',
    excerpt: '详细介绍工具的使用方法和注意事项...',
    date: '2024-02-29',
    author: '管理员'
  },
  // 添加更多博客文章...
])
</script>

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

.content-card {
  background: white;
  border-radius: 0;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 2rem;
  width: 100%;
  min-width: 1200px;
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

.blog-list {
  max-width: 800px;
  margin: 0 auto;
}

.blog-post {
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.blog-post:last-child {
  border-bottom: none;
}

.post-title {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 600;
}

.post-excerpt {
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .content-card {
    min-width: auto;
    width: 100%;
    padding: 1rem;
  }

  .blog-post {
    padding: 1rem;
  }
}
</style>
