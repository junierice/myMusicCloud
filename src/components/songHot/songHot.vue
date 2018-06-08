<template>
    <div>
      <img src="../../../img/btf-pic.png"/>
      <songHotBlocks></songHotBlocks>
      <div>查看完整榜单</div>
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
