import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import IndexComponent from '../components/index/index.vue'
import Song from '../components/song/song.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      // component: IndexComponent
      redirect: '/index'
    },
    {
      path: '/index',
      component: IndexComponent
    },
    {
      path: '/song/:id',
      component: Song
    }
  ]
})
