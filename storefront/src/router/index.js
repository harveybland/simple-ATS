import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import VacanciesView from '../views/VacanciesView.vue'
import favourites from '../views/favourites'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/VacanciesView/:id',
    name: 'VacanciesView',
    component: VacanciesView
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: favourites
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
