<template>
    <div>
      <img src="../../../../../img/btf-pic.png"/>
      <tst v-bind:param="tt" v-bind:songList="songHotList"></tst>
      <songBlocksRank></songBlocksRank>
      <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
    </div>
</template>

<script>
import axios from 'axios'
import tst from './sstest'
import songBlocksRank from '../../../block/songBlocksRank'
export default {
  name: 'songHot',
  components: {songBlocksRank, tst},
  data () {
    return {
      tt: 'fang',
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
