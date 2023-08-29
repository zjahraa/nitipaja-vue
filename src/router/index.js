import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Sidebar from '@/components/Sidebar.vue';
import Home from '@/views/Home.vue';
import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue';
import CreateAdmin from '/src/views/CreateAdmin.vue'
import SendEmail from '/src/views/SendEmail.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/Sidebar', 
    component: Sidebar,
    children: [
      { path: '', component: User },
      { path: '/user', component: User },
      { path: '/home', component: Home }, 
      { path: '/admin', component: Admin },
      { path: '/createadmin', component: CreateAdmin },
      { path: '/sendemail', component: SendEmail},
    ]
  },
  // { path: '/createadmin', component: CreateAdmin },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router