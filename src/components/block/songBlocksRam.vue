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
      song.ar.forEach((arNames, index) => {
        artists = artists + (index > 0 ? ` / ` : ``) + arNames.name
      })
      let label = `${artists} - ${song.al.name}`
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
