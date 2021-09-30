import { createRouter, createWebHashHistory } from 'vue-router'
import Maintain from '@/views/maintain'
import Investigation from '@/views/investigation'
import Collection from '@/views/collection'
import Make from '@/views/make'
import AddUser from '@/views/addUser'
import UserList from '@/views/userList'
import AddTest from '@/views/addTest'
import DataMan from '@/views/dataMan'
import ProEval from '@/views/proEval'
import ResultAnalysis from '@/views/resultAnalysis'
import DataPre from '@/views/dataPre'

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
  {
    path: '/proEval',
    component: ProEval
  },
  {
    path: '/resultAnalysis',
    component: ResultAnalysis
  },
  {
    path: '/dataPre',
    component: DataPre
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
