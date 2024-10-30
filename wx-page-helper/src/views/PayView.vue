<template>
  <div class="page-container">
    <NavBar />
    <main class="main-container">
      <div class="content-card">
        <h1 class="title">赞赏支持</h1>
        <p class="subtitle">如果这个工具对你有帮助，欢迎赞赏支持</p>
        
        <div class="qr-container">
          <div class="qr-item">
            <img src="@/assets/wechat-pay.jpg" alt="微信支付" />
            <p>微信支付</p>
          </div>
          <div class="qr-item">
            <img src="@/assets/alipay.jpg" alt="支付宝" />
            <p>支付宝</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

.qr-container {
  display: flex;
  gap: 4rem;
  justify-content: center;
  margin-top: 2rem;
}

.qr-item {
  text-align: center;
}

.qr-item img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.qr-item p {
  color: #64748b;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .content-card {
    min-width: auto;
    width: 100%;
    padding: 1rem;
  }

  .qr-container {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
