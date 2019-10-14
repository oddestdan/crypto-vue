<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue';

export default {
  name: 'app',
  components: {
    Home
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Helvetica Now', 'Montserrat', Arial, sans-serif;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  box-sizing: border-box;
  margin: 0 auto;
}
hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
bold {
  font-weight: bolder;
}
light {
  font-weight: lighter;
}
.eyebrow {
  font-size: 20px;
}
.-text-primary {
  color: #39b982;
}
.-text-base {
  color: #000;
}
.-text-error {
  color: tomato;
}
.-text-gray {
  color: rgba(0, 0, 0, 0.5);
}
.-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}
</style>
