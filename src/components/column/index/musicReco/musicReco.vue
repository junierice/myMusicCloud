<template>
    <div>
      <playlistReco></playlistReco>
      <songNew></songNew>
    </div>
</template>

<script>
import playlistReco from '../playlistReco/playlistReco'
import songNew from '../songNew/songNew'
export default {
  name: 'musicReco',
  components: { playlistReco, songNew }
}
</script>

<style scoped>

</style>
