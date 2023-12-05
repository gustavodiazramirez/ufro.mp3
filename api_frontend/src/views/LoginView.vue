<template>
  <Navbar></Navbar>
    <div class="login-container">
      <div class="card">
        <h1 class="letra">INICIAR SESIÓN</h1>
  
        <form @submit.prevent="login">
          <div class="form-row">
            <div class="col form-group">
              <label for="email" style="font-weight: bold; font-size: 15px;">CORREO INSTITUCIONAL</label>
              <input type="email" id="email" v-model="email" class="form-control" required />
            </div>
  
            <div class="col form-group">
              <label for="password" style="font-weight: bold; font-size: 15px;">CONTRASEÑA</label>
              <input type="password" id="password" v-model="password" class="form-control" required />
            </div>
          </div>
  
          <button type="submit" class="btn btn-primary" style="font-weight: bold; font-size: 15px;">Iniciar Sesión</button>
        </form>
  
        <p class="create-account-msg">¿No tienes una cuenta? <router-link to="/registro">¡Crea una!</router-link></p>
      </div>
    </div>
  </template>
  

  
  <script>

import Navbar from '@/components/Navbar.vue';
  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    components: {
    Navbar,
  },
    methods: {
      login() {
        console.log('Iniciando sesión con correo:', this.email, 'y contraseña:', this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #1c4c96;
  }
  
  .card {
    text-align: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .letra{ 
    font-size: 70px;
    font-weight: bold;
  }
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
  }
  
  .create-account-msg {
    margin-top: 1rem;
    font-weight: bold;
    color: rgb(0, 0, 0);
  }
  
  .create-account-msg a {
    color: #007bff;
    text-decoration: underline;
  }
  
  .create-account-msg a:hover {
    color: #0056b3;
  }
  </style>
  