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
        <songResBlocksRam :simpleResult="simpleResult"></songResBlocksRam>
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
      simpleResult: [],
      hots: [],
      value: '',
      offset: 0,
      loading: true,
      allLoaded: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    mkResultJson (rawResult) {
      rawResult.forEach(item => {
        let data = {}
        data['id'] = item.id
        data['songName'] = item.name
        let artists = ``
        item.artists.forEach((ar, index) => {
          artists = artists + (index > 0 ? ` / ` : ``) + ar.name
        })
        let label = `${artists} - ${item.album.name}`
        data['label'] = label
        data['withoutCopyRight'] = (item.album.copyrightId === 1000 && item.album.status === 1) || (item.album.copyrightId === 0 && item.album.status === -1)
        // console.log(data)
        this.simpleResult.push(data)
      })
    },
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
      this.loading = true
      console.log('searching...')
      this.allLoaded = false
      this.offset = 0
      this.value = value
      this.simpleResult = []
      axios.get('api/search?keywords=' + value + '&limit=10')
        .then(res => {
          this.offset = this.offset + res.data.result.songs.length
          // this.searchRes = res.data.result.songs // 如果length===0？？？？
          this.mkResultJson(res.data.result.songs)
          console.log('offset=' + this.offset)
          // 异步
          console.log('显示完毕')
          this.loading = false
          console.log(this.loading)
        })
        .catch(err => {
          console.error(err)
        })
    },
    loadMore () {
      this.loading = true
      console.log('loading...')
      axios.get('api/search?keywords=' + this.value + '&offset=' + this.offset) // 加上&limit=10 后台出bug
        .then(res => {
          if (res.data.code === 200 && res.data.result.songs != null) {
            let list
            if (res.data.result.songs.length > 10) {
              list = res.data.result.songs.slice(0, 10)
            } else {
              list = res.data.result.songs
            }
            this.offset = this.offset + list.length
            // this.searchRes.push(...res.data.result.songs)
            this.mkResultJson(list)
            console.log('offset=' + this.offset)
          }
          if (res.data.code === 200 && res.data.result.songs === undefined) {
            this.allLoaded = true
            console.log('没了')
            return
          }
          // 异步
          console.log('显示完毕')
          this.loading = false
          console.log(this.loading)
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
