<template>
    <div>
        <brand></brand>
        <mt-navbar v-model="selected">
            <mt-tab-item id="songReco">推荐音乐</mt-tab-item>
            <mt-tab-item id="songHot">热歌榜</mt-tab-item>
            <mt-tab-item id="songSearch">搜索</mt-tab-item>
        </mt-navbar>
        <keep-alive>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="songReco">
                <musicReco></musicReco>
            </mt-tab-container-item>
            <mt-tab-container-item id="songHot">
                <songHot></songHot>
            </mt-tab-container-item>
            <mt-tab-container-item id="songSearch">
                <songSearch :selected="selected"></songSearch>
            </mt-tab-container-item>
        </mt-tab-container>
        </keep-alive>
    </div>
</template>

<script>
import axios from 'axios'
import brand from './brand/brand.vue'
import songHot from './songHot/songHot'
import musicReco from './musicReco/musicReco'
import songSearch from './search/songSearch'
export default {
  name: 'index',
  components: {brand, musicReco, songHot, songSearch},
  data () {
    return {
      selected: 'songReco',
      playlist: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      // window.global = window.global || {}
      this.selected = window.sessionStorage.getItem('selected') ? window.sessionStorage.getItem('selected') : 'songReco'
      // this.selected = window.global.selected ? window.global.selected : 'songReco'
      // this.selected = window.localStorage.getItem('selected') ? window.localStorage.getItem('selected') : 'songReco'
      axios.get('api/top/playlist?limit=10&order=new')
        .then(res => {
          this.playlist = res.data.playlists
          // console.log(this.playlist)
          return res
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  watch: {
    selected (curV, oldV) {
      window.sessionStorage.setItem('selected', this.selected)
    }
  }
}
</script>

<style>

</style>
