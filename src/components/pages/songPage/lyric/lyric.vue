<template>
  <div>
    <div class="m-lrc">
      <h2 class="m-song-h2">
        <span class="m-song-sname">{{songName}}</span>
        <span class="m-song-gap">-</span>
        <span class="m-song-autr">{{artist}}</span>
      </h2>
      <div class="m-song-lrc">
        <div class="m-song-scroll">
          <!-- {{ playingLyric }} -->
          <div class="wrapper">
            <div class="lyric">
              <p v-for="(line,index) in currentLyric.lines" v-bind:key="index"  ref="lyricLine" :class="index === currentLineNum ? `curLine`:``">{{ line.txt }}</p>
            </div>
            <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Lyric from 'lyric-parser'
import axios from 'axios'
import BScroll from 'better-scroll'
import Lyric from '../../../../utils/Lyric.js'
export default {
  name: 'Lyric',
  components: { scroll },
  props: {
    songName: String,
    artist: String
  },
  data () {
    return {
      currentLyric: {}, // 当前歌曲的歌词对象
      currentLineNum: 0, // 当前歌曲正在播放的歌词行数
      playingLyric: '' // 当前播放的某句歌词
      // bScroll: null
    }
  },
  created () {
    this.getLrc()
  },
  methods: {
    getLrc: function () {
      console.log('go to getLrc function')
      axios.get('api/lyric?id=' + this.$route.params.id)
        .then(res => {
          // console.log(res.data.lrc.lyric)
          this.bScroll = new BScroll('.wrapper')
          if (res.data.lrc !== undefined) {
            this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
            this.$emit('lyric')
          } else {
            this.$emit('noLyric')
          }
          // console.log(this.currentLyric)
          this.$emit('lyric_loaded')
        })
        .catch(err => {
          console.error(err)
        })
    },
    start: function () {
      this.currentLyric.play()
      console.log('lyric start')
    },
    pauseOrGoon: function () {
      this.currentLyric.togglePlay()
      console.log('lyric pause / go on')
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum >= 1) {
        let lineEl = this.$refs.lyricLine[lineNum - 1]
        // 结合better-scroll，滚动歌词
        this.bScroll.scrollToElement(lineEl, 1000)
      } else {
        this.bScroll.scrollToElement(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    changeSong: function () {
      this.currentLyric = {}
      this.currentLineNum = 0
      this.playingLyric = ''
      this.getLrc()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-lrc{
  padding: 0 35px;
  margin-top: 25px;
  /* background-color: gold; */
}
.m-song-h2{
  font-size: 18px;
}
.m-song-h2, .m-song-sname, .m-song-gap, .m-song-autr{
  margin: 0;
  padding: 0;
  line-height: 1.1;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
}
.m-song-gap{
  margin: 0 4px;
}
.m-song-autr{
  font-size: 16px;
  color: hsla(0,0%,100%,.6);
}
.m-song-lrc{
  margin: 0;
  padding: 0;
  position: relative;
  margin-top: 14px;
  line-height: 1.5;
}
.m-song-scroll{
  margin: 0;
  padding: 0;
  height: 88px;
  font-size: 16px;
  line-height: 1.5;
  overflow: hidden;
  color: hsla(0,0%,100%,.6);
}
.wrapper{
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 1.5;
  color: hsla(0,0%,100%,.6);
}
.wrapper p{
  margin: 0;
  padding: 0;
  padding-bottom: 8px;
}
.curLine{
  color: rgb(255, 255, 255);
}
</style>
