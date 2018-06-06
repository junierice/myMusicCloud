<template>
    <div>
        <brand></brand>
        <mt-navbar v-model="selected">
            <mt-tab-item id="songReco">推荐音乐</mt-tab-item>
            <mt-tab-item id="songHot">热歌榜</mt-tab-item>
            <mt-tab-item id="songSearch">搜索</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="songReco">
                <songReco></songReco>
            </mt-tab-container-item>
            <mt-tab-container-item id="songHot">
                <songHot></songHot>
            </mt-tab-container-item>
            <mt-tab-container-item id="songSearch">
                <songSearch></songSearch>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import brand from '../brand/brand.vue'
import songHot from '../songHot/songHot'
import songReco from '../songReco/songReco'
import songSearch from '../songSearch/songSearch'
export default {
  name: 'index',
  components: {brand, songHot, songReco, songSearch},
  data () {
    return {
      selected: 'songReco'
    }
  }
}
</script>

<style>

</style>
