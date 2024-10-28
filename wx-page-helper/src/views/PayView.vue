<template>
  <div class="page-container">
    <NavBar />
    
    <main class="main-container">
      <h1 class="title">支付中心</h1>
      <p class="subtitle">选择您的会员套餐</p>

      <div class="pricing-grid">
        <div class="pricing-card">
          <div class="pricing-header">
            <h2>基础版</h2>
            <div class="price">
              <span class="amount">¥29</span>
              <span class="period">/月</span>
            </div>
          </div>
          <ul class="features">
            <li>每日100次请求</li>
            <li>基础客服支持</li>
            <li>标准API访问</li>
          </ul>
          <button class="buy-button">立即购买</button>
        </div>

        <div class="pricing-card popular">
          <div class="popular-badge">最受欢迎</div>
          <div class="pricing-header">
            <h2>专业版</h2>
            <div class="price">
              <span class="amount">¥99</span>
              <span class="period">/月</span>
            </div>
          </div>
          <ul class="features">
            <li>每日1000次请求</li>
            <li>优先客服支持</li>
            <li>高级API访问</li>
            <li>自定义导出格式</li>
          </ul>
          <button class="buy-button">立即购买</button>
        </div>

        <div class="pricing-card">
          <div class="pricing-header">
            <h2>企业版</h2>
            <div class="price">
              <span class="amount">¥299</span>
              <span class="period">/月</span>
            </div>
          </div>
          <ul class="features">
            <li>无限次请求</li>
            <li>24/7专属支持</li>
            <li>完整API访问</li>
            <li>自定义功能开发</li>
            <li>专属服务器资源</li>
          </ul>
          <button class="buy-button">立即购买</button>
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

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.pricing-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  transition: transform 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.pricing-card.popular {
  border: 2px solid #177F62;
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #177F62;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.pricing-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pricing-header h2 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: #177F62;
}

.period {
  color: #64748b;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.features li {
  padding: 0.5rem 0;
  color: #4b5563;
  display: flex;
  align-items: center;
}

.features li::before {
  content: "✓";
  color: #177F62;
  margin-right: 0.5rem;
  font-weight: bold;
}

.buy-button {
  width: 100%;
  padding: 1rem;
  background: #177F62;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buy-button:hover {
  background: #146c54;
}

@media (max-width: 768px) {
  .main-container {
    padding: 2rem 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
