<template>
    <div>
      <img src="../../../img/btf-pic.png"/>
      <songHotBlocks></songHotBlocks>
      <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
    </div>
</template>

<script>
import songHotBlocks from './songHotBlocks'
export default {
  name: 'songHot',
  components: {songHotBlocks}
}
</script>

<style scoped>
img{
  width: 100%;
}
</style>
