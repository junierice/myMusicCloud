import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import IndexComponent from "@/components/index/index.vue";



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:"/index",
      component:IndexComponent,
    },
  ]
})

