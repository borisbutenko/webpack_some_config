<template>
  <main id="app" :class="app.container">
    {{ message }}
  </main>
</template>

<script>
  export default {
    name: 'App',

    data() {
      return {
        message: 'Hello World'
      }
    }
  }
</script>

<style lang="scss" module="app">
  $white: #FFF;

  .container {
    background-color: $white;
  }
</style>

