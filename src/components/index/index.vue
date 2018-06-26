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
                <songReco></songReco>
            </mt-tab-container-item>
            <mt-tab-container-item id="songHot">
                <songHot></songHot>
            </mt-tab-container-item>
            <mt-tab-container-item id="songSearch">
                <!-- <songSearch></songSearch> -->
                <div>
                    <li v-for="song in playlist" v-bind:key="song.id">{{song.name}}</li>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        </keep-alive>
    </div>
</template>

<script>
import axios from 'axios'
import brand from '../brand/brand.vue'
import songHot from '../songHot/songHot'
import songReco from '../songReco/songReco'
import songSearch from '../songSearch/songSearch'
export default {
  name: 'index',
  components: {brand, songHot, songReco, songSearch},
  data () {
    return {
      selected: 'songReco',
      playlist: []
    }
  },
  created () {
    this.init()
  },
  destroyed () {
    window.global.selected = this.selected
    // window.localStorage.setItem('selected', this.selected)
  },
  methods: {
    init: function () {
      window.global = window.global || {}
      this.selected = window.global.selected ? window.global.selected : 'songReco'
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
  }
}
</script>

<style>

</style>
