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
          {{ $route.params.id }}
          <br>
          {{ $route.params.id }}
          <br>
          {{ $route.params.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Lyric from 'lyric-parser'
import axios from 'axios'
export default {
  name: 'Lyric',
  props: {
    songName: String,
    artist: String
  },
  created () {
    // this.ll = this.getLrc()
    // this.ll.play()
  },
  methods: {
    test: function () {
      console.log('test ok')
    },
    getLrc: function () {
      axios.get('api/lyric?id=' + this.$route.params.id)
        .then(res => {
          console.log(res.data.lrc.lyric)
          // let l = res.data.lrc.lyric
          // let ll = new Lyric(l, function (obj) {
          //   console.log(obj)
          // })
          // return ll
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-lrc{
  padding: 0 35px;
  margin-top: 25px;
  background-color: gold;
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
</style>
