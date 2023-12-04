import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UploadMusicView from '@/views/UploadMusicView.vue';
import DiscoverView from '@/views/DiscoverView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/subir-musica',
    name: 'UploadMusic',
    component: UploadMusicView,
  },
  {
    path: '/descubrir',
    name: 'Discover',
    component: DiscoverView,
  },
  {
  path: '/iniciar-sesion',
  name: 'LoginView',
  component: LoginView,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
