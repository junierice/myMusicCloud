<template>
    <div class="songBlock">
      <div class="b" v-for="song in playlist" :key="song.id">
        <span class="a">01</span>
        <mt-cell :title='song.name' :label='computeLabel(song)'>
          <img src="../../../img/play.png" width="26" height="26">
          <!-- <span slot="icon">{{index+1}}</span> -->
        </mt-cell>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'songHotBlocks',
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
      axios.get('api/top/list?idx=1')
        .then(res => {
          let a = [...res.data.playlist.tracks]
          this.playlist = a.slice(0, 20)
        })
        .catch(err => {
          console.error(err)
        })
    },
    computeLabel (song) {
      let artists = ``
      song.ar.forEach((arNames, index) => {
        artists = artists + (index > 0 ? ` / ` : ``) + arNames.name
      })
      let label = `${artists} - ${song.al.name}`
      return label
    }
  }
}
</script>

<style scoped>
.songBlock{
  text-align: left;
}
.a, .b{
  display: flex
}
</style>
