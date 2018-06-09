<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'Song',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
