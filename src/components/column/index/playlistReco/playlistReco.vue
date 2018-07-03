<template>
  <div>
    <atitle v-bind:titletxt="`推荐歌单：`"></atitle>
    <plRecoBlocks v-bind:playlistList="playlistList"></plRecoBlocks>
    <plRecoBlocks v-bind:playlistList="playlistList1"></plRecoBlocks>
  </div>
</template>

<script>
import axios from 'axios'
import atitle from '../../../block/atitle'
import plRecoBlocks from '../../../block/playlistRecoBlocks'
export default {
  name: 'plReco',
  components: { plRecoBlocks, atitle },
  data () {
    return {
      playlistList: [],
      playlistList1: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/personalized')
        .then(res => {
          let a = [...res.data.result]
          this.playlistList = a.slice(0, 3)
          this.playlistList1 = a.slice(3, 6)
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
