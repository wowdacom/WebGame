<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: {
    title: "Hello Gamer",
    gameState: {
      isRegister: false,
      isChooseCard: false,
      isRollingPlate: false,
      isShowResult: false
    },
    rules: {
      'blue': 2,
      'green': 4,
      'red': 7,
      'yellow': 13,
      'purple': 26,
      'gold': 51,
      'salmon': 51
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
