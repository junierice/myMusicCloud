<template>
  <div>{{subtitle}}</div>
</template>

<script>
export default {
  name: 'subtitle',
  props: {
    subtitle: String
  }
}
</script>

<style scoped>
div{
  text-align: left;
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
}
</style>
