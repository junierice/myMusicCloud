<template>
  <div>
    <button @click="start()">从头放</button>
    <button @click="pause()">暂停</button>
    <button @click="goon()">继续放</button>
    <div class="playing-lyric">{{ playingLyric }}</div>
    </div>
</template>

<script>
import axios from 'axios'
// import Lyric from 'lyric-parser'
import Lyric from '../utils/Lyric.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentLyric: null, // 当前歌曲的歌词对象
      currentLineNum: 0, // 当前歌曲正在播放的歌词行数
      playingLyric: '' // 当前播放的某句歌词
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
      /* 如果当前歌词的行数大于6，则将该行歌词滚动到歌词列表中间，否则滚动到歌词列表顶部，这里滚动都加了1000ms的过渡动画 */
      // if (lineNum > 6) {
      //   let lineEle = this.$refs.lyricLine[lineNum - 6]
      //   this.$refs.lyricList.scrollToElement(lineEle, 1000)
      // } else {
      //   this.$refs.lyricList.scrollTo(0, 0, 1000)
      // }
      this.playingLyric = txt
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
