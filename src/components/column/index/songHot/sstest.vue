<template>
  <div>
    {{ param }}
    <p v-for="song in songList" :key="song.id">
      {{ song.name }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    param: String,
    songList: Array
  }
}
</script>

<style scoped>

</style>
