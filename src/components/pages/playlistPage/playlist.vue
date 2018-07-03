<template>
  <div>
    <div class="pl-header">
      <div class="bg" v-bind:style="{backgroundImage:'url('+picUrl+')'}"></div>
      <div class="header">
        <img class="pic" :src="picUrl"/>
        <div class="detail">
          <div class="name">
            <h2>{{ name }}</h2>
            <div class="nname">{{ nickname }}</div>
          </div>
        </div>
      </div>
    </div>
    <introBlock :intro="intro"></introBlock>
    <subtitle :subtitle="`歌曲列表`"></subtitle>
    <song-blocks-list v-bind:songList="playlist"></song-blocks-list>
    <subtitle :subtitle="`精彩评论`"></subtitle>
    <comment :comments="commentGood"></comment>
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
  name: 'Playlist',
  components: {introBlock, songBlocksList, subtitle, comment},
  data () {
    return {
      picUrl: null,
      intro: '',
      playlist: [],
      commentGood: [],
      name: '',
      nickname: ''
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
          this.picUrl = res.data.playlist.coverImgUrl
          this.intro = res.data.playlist.description
          this.name = res.data.playlist.name
          this.nickname = res.data.playlist.creator.nickname
        })
        .catch(err => {
          console.error(err)
        })
      axios.get('api/comment/playlist?id=' + this.$route.params.id)
        .then(res => {
          this.commentGood = res.data.hotComments
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
.pl-header{
  position: relative;
  padding: 30px 10px 30px 15px;
  overflow: hidden;
}
.bg{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-size:100% auto;
  z-index: -1;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}
.header{
  height: 126px;
  text-align: left;
}
.pic{
  height: 100%;
  float: left;
}
.detail{
  height: 100%;
  margin-left: 16px;
  float: left;
}
h2{
  margin: 0;
  padding: 0;
  padding-top: 1px;
  font-size: 17px;
  line-height: 1.5;
  color: #fefefe;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
}
.nname{
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1.5;
  color: #fefefe;
}
</style>
