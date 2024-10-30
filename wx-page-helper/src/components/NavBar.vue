<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-logo">
        <router-link to="/" class="logo-link">
          <img src="@/assets/logo.svg" alt="Logo" class="logo-img">
        </router-link>
      </div>
      <div class="nav-menu">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/pay" class="nav-link">Pay</router-link>
        <router-link to="/blog" class="nav-link">Blog</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 直接使用相对路径导入
import logo from '../assets/logo.svg'
// 或者确保使用正确的别名路径
// import logo from '@/assets/logo.svg'
</script>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #177F62;
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-img {
  height: 2rem;
  margin-right: 0.5rem;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #177F62;
}

@media (max-width: 768px) {
  .nav-content {
    padding: 0 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-menu {
    gap: 1rem;
  }
}
</style>
