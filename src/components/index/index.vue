<template>
    <div>
        <brand></brand>
        <mt-navbar v-model="selected">
            <mt-tab-item id="songReco">推荐音乐</mt-tab-item>
            <mt-tab-item id="songHot">热歌榜</mt-tab-item>
            <mt-tab-item id="songSearch">搜索</mt-tab-item>
        </mt-navbar>
    </div>
</template>

<script>
import brand from '../brand/brand.vue'
export default {
  name: 'index',
  components: {brand}
}
</script>

<style>

</style>
