<template>
    <div>
      <img src="../../../../../img/btf-pic.png"/>
      <songBlocksRank v-bind:songList="songHotList"></songBlocksRank>
      <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
    </div>
</template>

<script>
import axios from 'axios'
import songBlocksRank from '../../../block/songBlocksRank'
export default {
  name: 'songHot',
  components: {songBlocksRank},
  data () {
    return {
      songHotList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/top/list?idx=1')
        .then(res => {
          let a = [...res.data.playlist.tracks]
          this.songHotList = a.slice(0, 20)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
}
</style>
