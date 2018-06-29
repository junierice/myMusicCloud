<template>
    <div class="songBlock">
      <div class="song" v-for="(song, index) in songList" :key="song.id" @click="getSong(song.id)" >
        <p :class="index<3?'top_number':'number'">{{index>8?``:0}}{{index+1}}</p>
        <mt-cell class="rank" :title='song.name' :label='computeLabel(song)'>
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
.number, .top_number{
  margin-left: 10px;
  width: 28px;
  font-size: 17px;
}
.number{
  color: #999;
}
.top_number{
  color: #df3436;
}
</style>
