import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Cliente from '../views/Cliente.vue'
import Veterinario from '../views/Veterinario.vue'
import TipoAnimal from '../views/TipoAnimal.vue'
import Animal from '../views/Animal.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    //name: 'Home',
    redirect: '/index'
    //component: Home
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: Cliente
  },
  {
    path: '/veterinario',
    name: 'veterinario',
    component: Veterinario
  },     
  {
    path: '/tipoanimal',
    name: 'tipoanimal',
    component: TipoAnimal
  },  
  {
    path: '/animal',
    name: 'animal',
    component: Animal
  },    
]

const router = new VueRouter({
  routes
})

export default router
