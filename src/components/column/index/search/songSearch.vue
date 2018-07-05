<template>
    <div class="search">
      <mt-search v-model="value" placeholder="搜索歌曲、歌手、专辑" @keyup.native.enter="search(value)"></mt-search>
      <div class="m-hotlist">
        <div class="subtitle">热门搜索</div>
          <div class="list">
            <span class="li" v-for="(hot, index) in hots" v-bind:key="index" @click="search(hot.first)">{{hot.first}}</span>
          </div>
      </div>
      <div v-infinite-scroll="loadMore"
                          infinite-scroll-disabled="loading"
                          infinite-scroll-distance="0"
                          infinite-scroll-immediate-check="false">
        <songResBlocksRam :songList="searchRes"></songResBlocksRam>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import songResBlocksRam from '../../../block/songResBlocksRam'
export default {
  name: 'songSearch',
  components: { songResBlocksRam },
  props: {
    selected: String
  },
  data () {
    return {
      hots: [],
      value: '',
      offset: 0,
      searchRes: [],
      loading: true,
      allLoaded: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      axios.get('api/search/hot')
        .then(res => {
          this.hots = res.data.result.hots
        })
        .catch(err => {
          console.error(err)
        })
    },
    test () {
      console.log('test')
    },
    search (value) {
      console.log('searching...')
      this.loading = true
      this.allLoaded = false
      this.offset = 0
      this.value = value
      axios.get('api/search?keywords=' + value + '&limit=10')
        .then(res => {
          this.offset = this.offset + res.data.result.songs.length
          this.searchRes = res.data.result.songs
          console.log('offset=' + this.offset)
          // 异步
          this.loading = false
          console.log('显示完毕')
        })
        .catch(err => {
          console.error(err)
        })
    },
    loadMore () {
      console.log('loading...')
      this.loading = true
      if (this.allLoaded === true) {
        console.log('meile')
        return
      }
      console.log('ok1')
      axios.get('api/search?keywords=' + this.value + '&limit=10&offset=' + this.offset)
        .then(res => {
          if (res.data.code === 200 && res.data.result.songs != null) {
            this.offset = this.offset + res.data.result.songs.length
            this.searchRes.push(...res.data.result.songs)
            console.log('offset=' + this.offset)
          }
          if (res.data.code === 200 && res.data.result.songs === undefined) {
            this.allLoaded = true
            console.log('allLoaded=true')
          }
          // 异步
          this.loading = false
          console.log('显示完毕')
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  watch: {
    selected (curValue, oldValue) {
      if (oldValue === 'songSearch') {
        this.loading = true
      }
      if (curValue === 'songSearch' && this.allLoaded === false) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.search{
  text-align: left;
}
.m-hotlist{
  padding: 15px 10px 0;
}
.subtitle{
  font-size: 12px;
  line-height: 12px;
  color: #666;
}
.list{
  margin: 10px 0 7px;
}
.li{
  display: inline-block;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #333;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 32px;
}
</style>
