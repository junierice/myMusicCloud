<template>
    <div>
      <playlistReco></playlistReco>
      <songNew></songNew>
      <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
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
