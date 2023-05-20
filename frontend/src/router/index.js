import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import BookingView from '../views/BookingView.vue'
import AdminAccountView from '../views/AdminAccountView.vue'
import ProfileView from '../views/ProfileView.vue'
import PrenotazioneView from '../views/PrenotazioneView.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/prenotazione',
    component: PrenotazioneView,     
    meta: { default: true },
  },
  {
    path: '/SignUpView',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/BookingView',
    name: 'Booking',
    component: BookingView
  },
  {
    path: '/AdminAccountView',
    name: 'AdminAccount',
    component: AdminAccountView
  },
  {
    path: '/ProfileView',
    name: 'Profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
