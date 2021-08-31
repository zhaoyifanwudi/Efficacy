import { createRouter, createWebHashHistory } from 'vue-router'
import Maintain from '@/views/maintain'
import Investigation from '@/views/investigation'
import Collection from '@/views/collection'
import Make from '@/views/make'
import AddUser from '@/views/addUser'
import UserList from '@/views/userList'
import AddTest from '@/views/addTest'
import DataMan from '@/views/dataMan'

const routes = [
  {
    path: '/',
    redirect: '/maintain'
  },
  {
    path: '/maintain',
    component: Maintain
  },
  {
    path: '/investigation',
    component: Investigation
  },
  {
    path: '/collection',
    component: Collection
  },
  {
    path: '/make',
    component: Make
  },
  {
    path: '/addUser',
    component: AddUser
  },
  {
    path: '/userList',
    component: UserList
  },
  {
    path: '/addTest',
    component: AddTest
  },
  {
    path: '/dataMan',
    component: DataMan
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
