<template>
  <div>
    <div v-for="playlist in playlistList" :key="playlist.id">
      {{ playlist.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'plRecoBlocks',
  props: {
    playlistList: Array
  }
}
</script>

<style scoped>

</style>
