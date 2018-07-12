<template>
    <div class="songBlock">
      <div class="song" v-for="song in simpleResult" :key="song.id" @click="getSong(song.id)" :class="song.withoutCopyRight ? `gray` : ``">
        <mt-cell :title='song.songName' :label='song.label'>
          <img src="../../../img/play.png" width="26" height="26" />
        </mt-cell>
      </div>
    </div>
</template>

<script>
export default {
  name: 'songResBlocksRam',
  props: {
    simpleResult: Array
  },
  methods: {
    getSong (id) {
      this.$router.push({
        path: `/song/${id}`
      })
    }
  }
}
</script>

<style scoped>
.songBlock{
  text-align: left;
}
.song{
  display: flex;
}
.gray{
  color: #ccc;
}
</style>
