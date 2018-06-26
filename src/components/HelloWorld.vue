<template>
  <div>
    <button @click="start()">从头放</button>
    <button @click="pause()">暂停</button>
    <button @click="goon()">继续放</button>
    <div class="playing-lyric">{{ playingLyric }}</div>
    <div class="wrapper">
      <div class="lyric">
        <p v-for="(line,index) in currentLyric.lines" v-bind:key="index"  ref="lyricLine">{{ line.txt }}</p>
      </div>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>
    <!-- <scroll class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
      <div>
        <div class="lyric">
          <p v-for="(line,index) in currentLyric.lines" v-bind:key="index"  ref="lyricLine">{{ line.txt }}</p>
        </div>
      </div>
    </scroll> -->
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Lyric from '../utils/Lyric.js'
export default {
  name: 'HelloWorld',
  components: { scroll },
  data () {
    return {
      currentLyric: {}, // 当前歌曲的歌词对象
      currentLineNum: 0, // 当前歌曲正在播放的歌词行数
      playingLyric: '', // 当前播放的某句歌词
      bScroll: null
    }
  },
  created () {
    this.test()
  },
  methods: {
    test: function () {
      axios.get('api/lyric?id=542690276')
        .then(res => {
          console.log(res.data.lrc.lyric)
          this.bScroll = new BScroll('.wrapper')
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
          console.log(this.currentLyric)
        })
    },
    start: function () {
      this.currentLyric.play()
    },
    pause: function () {
      this.currentLyric.togglePlay()
    },
    goon: function () {
      this.currentLyric.togglePlay()
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum >= 2) {
        let lineEl = this.$refs.lyricLine[lineNum - 2]
        // 结合better-scroll，滚动歌词
        this.bScroll.scrollToElement(lineEl, 1000)
      } else {
        this.bScroll.scrollToElement(0, 0, 1000)
      }
      this.playingLyric = txt
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  overflow: hidden;
  height: 120px;
}
</style>
