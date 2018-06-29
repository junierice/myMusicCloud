<template>
  <div>
    <div v-for="playlist in list" :key="playlist.id">
      {{ playlist.name }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'plRecoBlocks',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      axios.get('api/personalized')
        .then(res => {
          let a = [...res.data.result]
          this.list = a.slice(0, 6)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
