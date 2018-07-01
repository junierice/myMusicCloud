<template>
  <div>
    <song-blocks-list v-bind:songList="playlist"></song-blocks-list>
  </div>
</template>

<script>
import axios from 'axios'
import songBlocksList from '../../block/songBlocksList'
export default {
  name: 'Playlist',
  components: {songBlocksList},
  data () {
    return {
      playlist: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/playlist/detail?id=' + this.$route.params.id)
        .then(res => {
          let a = [...res.data.playlist.tracks]
          this.playlist = a
        })
    }
  }
}
</script>

<style scoped>

</style>
