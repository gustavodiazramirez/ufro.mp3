<template>
    <div class="centered-text" style="margin-top: 20%;">
      <h1 class="display-4 letra">¡BIENVENIDO A UFRO.MP3!</h1>
      <p class="lead letra">La plataforma para compartir tu música con la comunidad de la UFRO.</p>
      
      <router-link to="/descubrir" class="btn btn-primary">Descubrir</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
  };
  </script>
  
  <style scoped>
  .centered-text {
    text-align: center;
    margin-top: 20vh;
  }
  
  .letra {
    font-weight: bold;
    color: white;
    font-family: Tahoma;
  }
  
  /* Estilos para el botón */
  .btn {
    display: inline-block;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  </style>
  