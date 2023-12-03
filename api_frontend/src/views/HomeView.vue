<template>
    <Navbar />
    <div class="centered-text" style="margin-top: 17%;">
        <h1 class="display-4 letra">¡Bienvenido a UFRO.mp3!</h1>
        <p class="lead letra">La plataforma para compartir tu música en la comunidad de la UFRO.</p>
    </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue';
export default {
    name: 'HomeView',
  components: {
    Navbar,
  },
};
</script>
  
<style scoped>
.centered-text {
    text-align: center;
    margin-top: 20vh;
}
.letra{
    font-weight: bold;
    color: white;
    font-family: Tahoma;
}
</style>
  