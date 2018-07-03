<template>
    <div class="search">
      <mt-search placeholder="搜索歌曲、歌手、专辑"></mt-search>
      <div class="m-hotlist">
        <div class="subtitle">热门搜索</div>
        <div class="list">
          <span class="li" v-for="(hot, index) in hots" v-bind:key="index">{{hot.first}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'songSearch',
  data () {
    return {
      hots: []
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
