import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MakeBean from '../views/MakeBean.vue'
import changeMarkDown from '../views/ChangeMarkDownTest.vue'
import showMakrDownFile from '../views/markDown/ShowMakrDownFile.vue'
import showArticleList from '../views/markDown/ShowArticleList.vue'
import editorMakrDownFile from '../views/markDown/EditorMakrDownFile.vue'
import HelloWord from '../components/HelloWorld'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/MakeBean',
    name: 'MakeBean',
    component: MakeBean
  },
  {
    path: '/changeMarkDown',
    name: 'changeMarkDown',
    component: changeMarkDown
  },
  {
    path: '/showMakrDownFile',
    name: 'showMakrDownFile',
    component: showMakrDownFile
  },
  {
    path: '/showArticleList',
    name: 'showArticleList',
    component: showArticleList
  },
  {
    path: '/editorMakrDownFile',
    name: 'editorMakrDownFile',
    component: editorMakrDownFile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
