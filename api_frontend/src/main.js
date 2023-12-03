import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

// Configuración del enrutador
import router from './router'; // Importa el enrutador desde el archivo router.js
app.use(router);

// Establecer el color de fondo para todo el documento
document.body.style.backgroundColor = '#1c4c96'; // Cambia el color según tus preferencias

app.mount('#app');