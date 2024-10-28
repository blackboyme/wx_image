<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #1f2937;
  background: #f8fafc;
}

button {
  font-family: inherit;
}

input, textarea {
  font-family: inherit;
}
</style>
