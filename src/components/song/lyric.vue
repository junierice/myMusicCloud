<template>
  <div class="m-lrc">
    <h1>{{ msg }}</h1>
    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script>
// import Lyric from 'lyric-parser'
import axios from 'axios'
export default {
  name: 'Lyric',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
      // ll: null
    }
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
  height: 97px;
}
</style>
