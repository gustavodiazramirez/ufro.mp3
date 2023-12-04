<template>
    <div class="login-container">
      <div class="card">
        <h1 class="display-4 letra">Iniciar Sesión</h1>
  
        <form @submit.prevent="login">
          <div class="form-row">
            <div class="col form-group">
              <label for="email">Correo Electrónico:</label>
              <input type="email" id="email" v-model="email" class="form-control" required />
            </div>
  
            <div class="col form-group">
              <label for="password">Contraseña:</label>
              <input type="password" id="password" v-model="password" class="form-control" required />
            </div>
          </div>
  
          <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        </form>
  
        <p class="create-account-msg">¿No tienes una cuenta? <router-link to="/registro">¡Crea una!</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Lógica para iniciar sesión (puedes implementarla según tu backend)
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
    height: 100vh;
    background-color: #1c4c96;
  }
  
  .card {
    text-align: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
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
  