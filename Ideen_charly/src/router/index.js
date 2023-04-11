import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Login from "../views/Login.vue"
import Registro from "../views/Registro.vue"
import Listado from "../views/Listado.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'inicio',
      component: Dashboard
    },
    {
      path: '/lista',
      name: 'lista',
      component: Listado
    },
    {
      path: '/',
      name: 'Inicio de sesion',
      component: Login
    },
    {
      path: '/register',
      name: 'Registro',
      component: Registro
    }
  ]
})

export default router
