import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import IndexComponent from '../components/index/index.vue'
import Song from '../components/song/song.vue'

Vue.use(Router)

export default new Router({
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(to)
  //   console.log(from)
  //   console.log(savedPosition)
  //   if (from.fullPath.match('^/song.*$') && to.fullPath.match('^/index.*$')) {
  //     console.log('不要存位置')
  //     return { x: 0, y: 0 }
  //   }
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
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
