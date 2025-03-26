<template>
  <AppHeader/>
  <main>
    <router-view/>
  </main>
</template>

<script>
import AppHeader from './components/Header.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    // AppFooter
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f7f7f7;
}
body{
  padding: 0;
  margin: 0;
}
form{
  height: 90vh;
}
ul{
  list-style: none;
}
a {
  text-decoration: none;
}
button{
  border: none;
  outline: none;
}

</style>
