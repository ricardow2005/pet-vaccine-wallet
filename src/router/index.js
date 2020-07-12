import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Cliente from '../views/Cliente.vue'
import Veterinario from '../views/Veterinario.vue'
import Animal from '../views/Animal.vue'
import TipoMedicamento from '../views/TipoMedicamento.vue'
import TipoAnimal from '../views/TipoAnimal.vue'
import TipoEnfermidade from '../views/TipoEnfermidade.vue'
import TipoCriticidade from '../views/TipoCriticidade.vue'
import Sintomas from '../views/Sintomas.vue'
import Medicamento from '../views/Medicamento.vue'

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
    path: '/animal',
    name: 'animal',
    component: Animal
  },    
  {
    path: '/tipoanimal',
    name: 'tipoanimal',
    component: TipoAnimal
  },    
  {
    path: '/tipomedicamento',
    name: 'tipomedicamento',
    component: TipoMedicamento
  },    
  {
    path: '/tipoenfermidade',
    name: 'tipoenfermidade',
    component: TipoEnfermidade
  },      
  {
    path: '/tipocriticidade',
    name: 'tipocriticidade',
    component: TipoCriticidade
  },       
  {
    path: '/sintomas',
    name: 'sintomas',
    component: Sintomas
  },        
  {
    path: '/medicamento',
    name: 'medicamento',
    component: Medicamento
  },      
]

const router = new VueRouter({
  routes
})

export default router
