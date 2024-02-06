import { createRouter, createWebHistory } from 'vue-router'
import CarView from '@/views/CarView'
import UserView from '@/views/UserView'
import AdminCategoryView from '@/views/AdminCategoryView'
import AdminUserView from '@/views/AdminUserView'
const routes = [
  {
    path: '/',
    name: 'cars',
    component: CarView
  },
  {
    path: '/me',
    name: 'me',
    component: UserView
  },
  {
    path: '/category',
    name: 'categories',
    component: AdminCategoryView
  },
  {
    path: '/users',
    name: 'users',
    component: AdminUserView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
