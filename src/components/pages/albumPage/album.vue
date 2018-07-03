<template>
  <div>
    <div class="album-header">
      <div class="header">
        <img :src="picUrl"/>
        <div class="detail">
          <h2>{{albumName}}</h2>
          <div class="singName">
            歌手：
            <span class="names" v-for="artist in artists" v-bind:key="artist.id" @click="getArtist(artist.id)">
              {{ artist.name }}&nbsp;
            </span>
          </div>
          <div class="amhed_time">
            发行时间：{{publicTime}}
          </div>
        </div>
      </div>
    </div>
    <introBlock :intro="intro"></introBlock>
    <subtitle :subtitle="`歌曲列表`"></subtitle>
    <song-blocks-list v-bind:songList="songList"></song-blocks-list>
    <subtitle :subtitle="`精彩评论`"></subtitle>
    <comment :comments="commentGood"></comment>
    <subtitle :subtitle="`最新评论`"></subtitle>
    <comment :comments="commentNew"></comment>
    <mt-cell title="下载" class = "mt-cell-download" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
  </div>
</template>

<script>
import axios from 'axios'
import introBlock from '../../block/introductionBlock'
import subtitle from '../../block/subtitle'
import songBlocksList from '../../block/songBlocksList'
import comment from '../../block/commentBlocks'
export default {
  name: 'Album',
  components: {songBlocksList, introBlock, subtitle, comment},
  data () {
    return {
      picUrl: null,
      albumName: null,
      artists: [],
      publicTime: null,
      intro: '',
      songList: [],
      commentGood: [],
      commentNew: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/album?id=' + this.$route.params.id)
        .then(res => {
          this.picUrl = res.data.album.picUrl
          this.albumName = res.data.album.name
          this.artists = res.data.album.artists
          let t = new Date(res.data.album.publishTime).toLocaleString()
          this.publicTime = t.substring(0, t.indexOf(','))
          this.intro = res.data.album.description
          let a = [...res.data.songs]
          this.songList = a
        })
        .catch(err => {
          console.error(err)
        })
      axios.get('api/comment/album?id=' + this.$route.params.id)
        .then(res => {
          this.commentGood = res.data.hotComments
          this.commentNew = res.data.comments.slice(0, 9)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getArtist (id) {
      this.$router.push({
        path: `/artist/${id}`
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
.album-header{
  padding: 30px 10px 30px 15px;
  overflow: hidden;
  background-color: #bbb;
}
.header{
  height: 126px;
  text-align: left;
}
img{
  height: 100%;
  float: left;
}
.detail{
  height: 100%;
  margin-left: 29px;
  float: left;
}
h2{
  padding: 0;
  margin: 0;
  padding-top: 10px;
  font-size: 17px;
  line-height: 1.3;
  font-weight: 400;
  color: #fefefe;
  overflow: hidden;
  text-overflow: ellipsis;
}
.amhed_time{
  margin: 0;
  padding: 0;
  margin-top: 5px;
  font-size: 12px;
  color: hsla(0,0%,100%,.5);
}
.singName{
  margin-top: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  color: hsla(0,0%,100%,.5);
  font-size: 14px;
  line-height: 1.5;
}
.names{
  color: #fff;
}
</style>
