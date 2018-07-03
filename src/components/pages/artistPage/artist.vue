<template>
  <div>
    <div class="art-head">
      <img :src="picUrl"/>
      <p class="name">{{artName}}</p>
    </div>
    <intro :intro="intro"></intro>
    <subtitle :subtitle="`热门50单曲`"></subtitle>
    <song-blocks-list v-bind:songList="songHotList"></song-blocks-list>
    <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
  </div>
</template>

<script>
import axios from 'axios'
import intro from '../../block/introductionBlock'
import subtitle from '../../block/subtitle'
import songBlocksList from '../../block/songBlocksList'
export default {
  name: 'Artist',
  components: {intro, subtitle, songBlocksList},
  data () {
    return {
      artName: '',
      songHotList: [],
      picUrl: null,
      intro: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/artists?id=' + this.$route.params.id)
        .then(res => {
          this.artName = res.data.artist.name
          let engN = res.data.artist.alias[0]
          if (engN != null) {
            this.artName = this.artName + ' (' + engN + ')'
          }
          this.picUrl = res.data.artist.picUrl
          this.intro = res.data.artist.briefDesc
          let a = [...res.data.hotSongs]
          this.songHotList = a
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  }
}
</script>

<style scoped>
.art-head{
  /* 相对父元素的宽度(width)做自适应 */
  padding-bottom: 68%;
  overflow: hidden;
  position: relative;
}
img{
  z-index: 1;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.name{
  text-align: left;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 5px;
  z-index: 3;
  color: #fff;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
