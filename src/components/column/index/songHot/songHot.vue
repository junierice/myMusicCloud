<template>
    <div>
      <img src="../../../../../img/btf-pic.png"/>
      <songBlocksRank></songBlocksRank>
      <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
    </div>
</template>

<script>
import songBlocksRank from '../../../block/songBlocksRank'
export default {
  name: 'songHot',
  components: {songBlocksRank}
}
</script>

<style scoped>
img{
  width: 100%;
}
</style>
