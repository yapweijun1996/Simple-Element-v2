import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Users from '@/views/Users.vue'
import Settings from '@/views/Settings.vue'
import Reports from '@/views/Reports.vue'
import Elements from '@/views/Elements.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
  { path: '/users', name: 'Users', component: Users, meta: { title: 'Users' } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { title: 'Settings' } },
  { path: '/reports', name: 'Reports', component: Reports, meta: { title: 'Reports' } },
  { path: '/elements', name: 'Elements', component: Elements, meta: { title: 'Elements' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 