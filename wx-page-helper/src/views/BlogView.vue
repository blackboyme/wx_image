<template>
  <div class="page-container">
    <NavBar />
    
    <main class="main-container">
      <h1 class="title">博客</h1>
      <p class="subtitle">最新动态与技术分享</p>

      <div class="blog-grid">
        <article v-for="post in blogPosts" :key="post.id" class="blog-card">
          <img :src="post.image" :alt="post.title" class="blog-image">
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-date">{{ post.date }}</span>
              <span class="blog-category">{{ post.category }}</span>
            </div>
            <h2 class="blog-title">{{ post.title }}</h2>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a href="#" class="read-more">阅读更多</a>
          </div>
        </article>
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
    title: '如何提高内容采集的效率',
    excerpt: '本文将介绍几种提高内容采集效率的方法，包括批量处理、自动化工具等...',
    date: '2024-01-15',
    category: '技术教程',
    image: '/blog/post1.jpg'
  },
  {
    id: 2,
    title: '2024年内容采集新趋势',
    excerpt: '随着技术的发展，内容采集领域出现了许多新的趋势和工具...',
    date: '2024-01-10',
    category: '行业动态',
    image: '/blog/post2.jpg'
  },
  {
    id: 3,
    title: '图片采集最佳实践指南',
    excerpt: '如何更好地进行图片采集？本文将分享一些实用的技巧和注意事项...',
    date: '2024-01-05',
    category: '最佳实践',
    image: '/blog/post3.jpg'
  }
])
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f8fafc;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
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

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.blog-date,
.blog-category {
  color: #64748b;
  font-size: 0.875rem;
}

.blog-title {
  color: #1f2937;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.blog-excerpt {
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.read-more {
  color: #177F62;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s;
}

.read-more:hover {
  color: #146c54;
}

@media (max-width: 768px) {
  .main-container {
    padding: 2rem 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
