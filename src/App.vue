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
@import 'vue-select/src/scss/vue-select.scss';

body {
  margin: 0;
  background-color: #0e83cd;
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
.-half {
  width: 50%;
}
.-br {
  border-top: 3px solid #ffffff;
  margin-top: 20px;
  padding-top: 20px;
}
.-top10 {
  margin-top: 10px;
}
.-bot10 {
  margin-bottom: 10px;
}
.-m0 {
  margin: 0 !important;
}
.-col-between {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.-row-between {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.-h-max {
  height: 100%;
}
.-w-max {
  width: 100%;
}

/* General button style (reset) */
.custom-button {
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 20px 20px;
  display: inline-block;
  margin: 0 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  /* additional styling */
  border: 2px solid #fff;
  color: #fff;
  overflow: hidden;

  &:after {
    width: 100%;
    height: 0;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -moz-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -ms-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }

  &:hover,
  &:active {
    color: #0e83cd;
  }

  &:hover:after {
    height: 230%;
    opacity: 1;
  }

  &:active:after {
    height: 300%;
    opacity: 1;
  }
}

/* Custom select styling (reset) */
.v-select {
  width: 170px;

  .vs__dropdown-toggle {
    padding: 8px 4px;
    background-color: none;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 0;

    .vs__selected {
      color: #ffffff;
    }

    .vs__open-indicator {
      fill: #ffffff;
    }
  }
}
</style>
