<template>
  <div>{{titletxt}}</div>
</template>

<script>
export default {
  name: 'atitle',
  props: {
    titletxt: String
  }
}
</script>

<style scoped>
div{
  margin-top: 20px;
  text-align: left;
  padding-left: 9px;
  margin-bottom: 14px;
  font-size: 17px;
  height: 20px;
  line-height: 20px;
  border-left:3px solid #d33a31;
}
</style>
