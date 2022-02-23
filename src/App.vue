<template>
  <div id="app">
    <transition name="el-zoom-in-center">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #ffffff;
    height: 100%;
  }
}
</style>
