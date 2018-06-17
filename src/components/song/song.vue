<template>
  <div>
    <div class="m-song-clickarea" v-on:click="switchP()"></div>
    <audio id="music" :src="mp3Url" @canplay="playS()" @ended="stopS()"></audio>
    <div class="m-song-wrap">
      <div class="m-song-disc">
        <div class="m-song-rollwrap">
          <img class = "m-song-pic" :class="isStop?'':(isPlay?'Rotation play':'Rotation pause')" :src ="picUrl"/>
          <!-- :class="isPlay?'play':'pause'" -->
        </div>
      </div>
    </div>
    <lyric></lyric>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import lyric from './lyric'
export default {
  name: 'Song',
  components: {lyric},
  data () {
    return {
      picUrl: null,
      isStop: true,
      isPlay: false,
      mp3Url: null
    }
  },
  created () {
    this.updateSong()
    // console.log('create')
  },
  methods: {
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
        console.log(err)
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
.m-song-wrap{
  background-color: pink;
  padding-top: 63px;
}
.m-song-disc{
  background-color: aquamarine;
  height: 248px;
  position: relative;
}
.m-song-rollwrap{
  height: 150px;
  width: 150px;
  margin: -75px 0 0 -75px;
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
  bottom: 12px;
  z-index: 10;
  /* background-color: rgba(0, 0, 0, 0.1); */
}
.Rotation{
  transform: rotate(360deg);
  animation: rotation 10s linear infinite;
  -moz-animation: rotation 10s linear infinite;
  -webkit-animation: rotation 10s linear infinite;
  -o-animation: rotation 10s linear infinite;
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
}
@media screen and (min-width: 360px){
.m-song-wrap{
  background-color: pink;
  padding-top: 70px;
}
.m-song-disc{
  background-color: aquamarine;
  height: 296px;
}
.m-song-rollwrap{
  height: 184px;
  width: 184px;
  margin: -92px 0 0 -92px;
}
}
@media screen and (min-width: 414px){
.m-song-wrap{
  background-color: pink;
  padding-top: 80px;
}
.m-song-disc{
  background-color: aquamarine;
  height: 342px;
}
.m-song-rollwrap{
  height: 212px;
  width: 212px;
  margin: -106px 0 0 -106px;
}
}
</style>
