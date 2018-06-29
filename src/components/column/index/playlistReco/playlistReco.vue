<template>
  <div>
    推荐歌单：
    <plRecoBlocks v-bind:playlistList="playlistList"></plRecoBlocks>
  </div>
</template>

<script>
import axios from 'axios'
import plRecoBlocks from '../../../block/playlistRecoBlocks'
export default {
  name: 'plReco',
  components: { plRecoBlocks },
  data () {
    return {
      playlistList: []
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
          this.playlistList = a.slice(0, 6)
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
