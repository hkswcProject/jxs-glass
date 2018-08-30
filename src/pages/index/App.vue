<template>
  <div id="app">
      <router-view>

     </router-view>
  </div>
</template>

<script>
  // 导入样式
  import '@/assets/css/reset.css';
  import '@/assets/css/global.less';
  import '@/assets/css/iconfont.css';
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
