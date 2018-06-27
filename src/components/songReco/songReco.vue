<template>
    <div>
      <plReco></plReco>
      <sNew></sNew>
    </div>
</template>

<script>
import plReco from '../playlistReco/playlistReco'
import sNew from '../songNew/songNew'
export default {
  name: 'songReco',
  components: { plReco, sNew }
}
</script>

<style scoped>

</style>
