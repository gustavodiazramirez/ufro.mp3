<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link to="/" class="navbar-brand1">UFRO.MP3</router-link>

    <button class="navbar-toggler" @click="toggleNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="{ 'show': isNavOpen }" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto d-flex">
        <li class="nav-item">
          <router-link to="/descubrir" class="nav-link">Descubrir</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/subir-musica" class="nav-link">Subir Música</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/iniciar-sesion" class="nav-link">Iniciar Sesión</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isNavOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #0b1e3c;
  padding: 1rem;
}

.navbar-brand1 {
  color: white;
  font-weight: bold;
  margin-top: 10px;
  font-size: 25px;
  margin-left: 10%;
  margin-right: 3%;
  text-decoration: none; /* Quita la subrayado del enlace */
}

.navbar-toggler {
  background-color: #01579b;
}

.navbar-toggler-icon {
  background-color: #fff;
}

.navbar-nav {
  margin-top: 1rem;
  display: flex;
  align-items: center; /* Alinea verticalmente los elementos del menú */
}

.nav-item {
  text-align: center;
  margin: 0 0.5rem; /* Espaciado entre elementos del menú */
}

.nav-link {
  color: white;
  font-size: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition: color 0.3s;
  text-decoration: none; /* Quita la subrayado del enlace */
}

.navbar-brand1:hover,
.nav-link:hover {
  color: #90cbff;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-nav {
    display: none;
  }

  .navbar-collapse.show .navbar-nav {
    display: flex;
    flex-direction: column; /* Cambia la dirección de la columna para dispositivos pequeños */
  }

  .nav-item {
    margin: 0.5rem 0;
  }
}
</style>