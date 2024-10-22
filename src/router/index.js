import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/personal-information',
    name: 'personal-information',
    component:() => import(/* webpackChunkName: "about" */ '../views/PersonalInformation.vue'),
    props: true
  },
  {
    path: '/game/cfef90f3-1a53-4149-9119-e31d0dabd1ba:client_id',
    name: 'game',
    component:() => import(/* webpackChunkName: "about" */ '../views/GameView.vue'),
    props: true
  },
  {
    path: '/result/cf-4c47-a458-9df75c1bab4e:result_id',
    name: 'result',
    component:() => import(/* webpackChunkName: "about" */ '../views/ResultView.vue'),
    props: true
  },
  {
    path: '/ranking/cfgkd47-a4dsasc1bab4e:questionnaire_id',
    name: 'questionnaire',
    component:() => import(/* webpackChunkName: "about" */ '../views/QuestionnaireView.vue'),
    props: true
  },
  {
    path: '/ranking',
    name: 'ranking',
    component:() => import(/* webpackChunkName: "about" */ '../views/RankingView.vue'),
    props: true
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
