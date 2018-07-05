<template>
  <div>
    <atitle v-bind:titletxt="`最新音乐：`"></atitle>
    <songBlocksRam v-bind:songList="songNewList"></songBlocksRam>
  </div>
</template>

<script>
import axios from 'axios'
import atitle from '../../../block/atitle'
import songBlocksRam from '../../../block/songBlocksRam'
export default {
  name: 'songNew',
  components: { songBlocksRam, atitle },
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
      axios.get('api/personalized/newsong')
        .then(res => {
          let a = [...res.data.result]
          this.songNewList = a
          // console.log(a)
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
