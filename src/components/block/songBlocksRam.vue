<template>
    <div class="songBlock">
      <div class="song" v-for="song in songList" :key="song.id" @click="getSong(song.id)" >
        <mt-cell :title='song.name' :label='computeLabel(song)'>
          <img src="../../../img/play.png" width="26" height="26" />
        </mt-cell>
      </div>
    </div>
</template>

<script>
export default {
  name: 'songBlocksRank',
  props: {
    songList: Array
  },
  methods: {
    computeLabel (song) {
      let artists = ``
      song.song.artists.forEach((ar, index) => {
        artists = artists + (index > 0 ? ` / ` : ``) + ar.name
      })
      let label = `${artists} - ${song.song.album.name}`
      return label
    },
    getSong (id) {
      this.$router.push({
        path: `/song/${id}`
      })
    }
  }
}
</script>

<style scoped>
.songBlock{
  text-align: left;
}
.song{
  display: flex
}
</style>
