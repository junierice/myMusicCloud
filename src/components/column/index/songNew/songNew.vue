<template>
  <div>
    新歌榜：
    <songBlocksRam v-bind:songList="songNewList"></songBlocksRam>
  </div>
</template>

<script>
import axios from 'axios'
import songBlocksRam from '../../../block/songBlocksRam'
export default {
  name: 'songNew',
  components: { songBlocksRam },
  data () {
    return {
      songNewList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/top/list?idx=0')
        .then(res => {
          let a = [...res.data.playlist.tracks]
          this.songNewList = a.slice(0, 10)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
