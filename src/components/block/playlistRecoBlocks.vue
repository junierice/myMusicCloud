<template>
  <div class="remd_songs">
    <div class="remd_li" v-for="playlist in playlistList" :key="playlist.id">
      <img :src="playlist.picUrl"/>
      <div class="text">{{ playlist.name }}</div>
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
.remd_songs{
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
}
.remd_li{
  display: inline-block;
  text-align: left;
  width: 33%;
}
img{
  width: 100%;
}
.text{
  padding: 6px 2px 0 6px;
  line-height: 1.2;
  font-size: 13px;
  max-height:30px;
  overflow: hidden;
}
</style>
