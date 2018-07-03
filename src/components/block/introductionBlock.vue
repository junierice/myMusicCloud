<template>
  <div @click="show">
    <div :class="{'intro':isHide,'show-intro':!isHide}">
      简介：{{ intro }}
    </div>
    <div class="hint">{{ hint }}</div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data () {
    return {
      isHide: true,
      hint: '详情↓'
    }
  },
  props: {
    intro: String
  },
  methods: {
    show () {
      if (this.isHide) {
        this.hint = '收起↑'
      } else {
        this.hint = '详情↓'
      }
      this.isHide = !this.isHide
    }
  }
}
</script>

<style scoped>
.intro, .show-intro{
  text-align: left;
  font-size: 14px;
  line-height: 19px;
  color: #666;
  margin: 10px 15px 0;
}
.intro{
  height: 56px;
  overflow: hidden;
}
.show-intro{
  min-height:56px;
}
.hint{
  margin: 0 15px;
  text-align: right;
  font-size: 14px;
  color: #888;
  height: 18px;
}
</style>
