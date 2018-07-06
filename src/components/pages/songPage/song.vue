<template>
  <div>
    <div class="m-song_newfst" :style="`height: `+ height +`px`" id="newfst">
      <div class="m-song-clickarea" v-on:click="switchP()"></div>
      <div class="bg" v-bind:style="{backgroundImage:'url('+picUrl+')'}"></div>
      <audio id="music" :src="mp3Url" @canplay="playS()" @ended="stopS()"></audio>
      <img class="m-logo" src="../../../../img/brand.png"/>
      <div class="m-song-wrap">
        <div class="m-song-disc">
          <div class="m-song-rollwrap">
            <img class = "m-song-pic" :class="isStop?'':(isPlay?'Rotation play':'Rotation pause')" :src ="picUrl"/>
            <!-- :class="isPlay?'play':'pause'" -->
          </div>
        </div>
      </div>
      <lyric :songName="songName" :artist="artist"></lyric>
    </div>
    <div class="m-song_newcomm">
      <atitle class="color-w" :titletxt = "`精彩评论`"></atitle>
      <comments :comments = "commentsGood" :isSongPage="`yes`"></comments>
      <mt-cell title="下载" class = "mt-cell-download-songPage" to ="https://github.com/junierice/myMusicCloud.git"></mt-cell>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import lyric from './lyric/lyric'
import atitle from '../../block/atitle'
import comments from '../../block/commentBlocks'
export default {
  name: 'Song',
  components: {lyric, atitle, comments},
  data () {
    return {
      picUrl: null,
      isStop: true,
      isPlay: false,
      mp3Url: null,
      songName: null,
      artist: null,
      height: 0,
      commentsGood: []
    }
  },
  created () {
    this.height = this.getHeight() - 30
    this.updateSong()
    // console.log('create')
  },
  methods: {
    getHeight: function () {
      let h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
      return h
    },
    print: function (msg) {
      console.log(msg)
    },
    updateSong: function () {
      // 如果正在播放歌曲，要停掉
      this.isStop = true
      this.isPlay = false
      if (this.mp3Url != null) {
        document.getElementById('music').pause()
      }
      // 获得歌曲的图片
      axios.get('api/song/detail?ids=' + this.$route.params.id)
        .then(res => {
          this.picUrl = res.data.songs[0].al.picUrl
          this.songName = res.data.songs[0].name
          this.artist = ``
          res.data.songs[0].ar.forEach((ar, index) => {
            this.artist = this.artist + (index > 0 ? ` / ` : ``) + ar.name
          })
        })
        .catch(err => {
          console.error(err)
        })
      // 获取评论
      axios.get('api/comment/music?id=' + this.$route.params.id)
        .then(res => {
          this.commentsGood = res.data.hotComments
        })
        .catch(err => {
          console.error(err)
        })
      // 获取歌曲mp3
      axios.get('api/music/url?id=' + this.$route.params.id)
        .then(res => {
          this.mp3Url = res.data.data[0].url
          if (this.mp3Url === null) {
            console.log('由于版权保护，您所在的地区暂时无法使用')
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 如果有版权，就可以控制播放/暂停
    switchP: function () {
      if (this.mp3Url != null) {
        if (this.isPlay === true) {
          this.isPlay = false
          document.getElementById('music').pause()
        } else {
          this.isStop = false
          this.isPlay = true
          document.getElementById('music').play()
        }
      } else {
        console.log('由于版权保护，您所在的地区暂时无法使用')
      }
    },
    // play song
    playS: function () {
      this.isStop = false
      this.isPlay = true
      let p = document.getElementById('music').play()
      p.catch(err => {
        console.error(err)
        this.isStop = true
        this.isPlay = false
      })
    },
    // stop song
    stopS: function () {
      this.isStop = true
      this.isPlay = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.updateSong()
    }
  }
}
</script>

<style scoped>
.m-song_newcomm{
  margin: 0;
  padding: 0;
  position: relative;
  padding-top: 20px;
  min-height: 145px;
}
.bg{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-size:auto 100%;
  background-position: center;
  /* background-repeat:repeat; */
  /* background-attachment:fixed; */
  z-index: -1;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
.bg::after{
  position: fixed;
  left: 0;
  right: 0;
  content: " ";
  bottom: 0;
  top: 0;
  background-color: rgba(0,0,0,.5);
}
.m-song_newfst{
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  padding-bottom: 30px;
  /* background-color: rgba(248, 223, 1, 0.5); */
}
.m-logo{
  position: absolute;
  left: 20px;
  top: 12px;
  height: 17px;
}
.m-song-wrap{
  padding-top: 63px;
}
.m-song-disc{
  height: 248px;
  position: relative;
}
.m-song-rollwrap{
  height: 150px;
  width: 150px;
  margin: -105px 0 0 -105px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
}
.m-song-clickarea{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 30px;
  z-index: 10;
  /* background-color: rgba(255, 4, 4, 0.1); */
}
.Rotation{
  transform: rotate(360deg);
  animation: rotation 20s linear infinite;
  -moz-animation: rotation 20s linear infinite;
  -webkit-animation: rotation 20s linear infinite;
  -o-animation: rotation 20s linear infinite;
}
@keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
.play{
  animation-play-state:running;
  -webkit-animation-play-state:running; /* Safari 和 Chrome */
}
.pause{
  animation-play-state:paused;
  -webkit-animation-play-state:paused; /* Safari 和 Chrome */
}
.m-song-pic{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 30px solid black;
}
@media screen and (min-width: 360px){
.m-song-wrap{
  padding-top: 70px;
}
.m-song-disc{
  height: 296px;
}
.m-song-rollwrap{
  height: 184px;
  width: 184px;
  margin: -122px 0 0 -122px;
}
}
@media screen and (min-width: 414px){
.m-song-wrap{
  padding-top: 80px;
}
.m-song-disc{
  height: 342px;
}
.m-song-rollwrap{
  height: 212px;
  width: 212px;
  margin: -136px 0 0 -136px;
}
}
</style>
