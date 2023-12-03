<template>
  <div>
    <navbar></navbar>

    <div class="discover-view">
      <h2>Descubre Nuevas Canciones</h2>
      <button @click="clearSongs">Limpiar Canciones</button>

      <div v-if="songs.length === 0">
        <p>No hay canciones disponibles.</p>
      </div>

      <div v-else>
        <div v-for="song in songs" :key="song.id" class="song-card">
          <h3>{{ song.title }}</h3>
          <p>{{ song.description }}</p>
          <audio :src="getAudioUrl(song.audioUrl)" controls></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      songs: [],
    };
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
    async fetchSongs() {
      try {
        const response = await fetch('https://6dfa-181-172-90-126.ngrok.io/songs');
        const data = await response.json();
        if (response.ok) {
          this.songs = data;
        } else {
          console.error('Error al obtener la lista de canciones:', data.error);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    },

    getAudioUrl(filename) {
      return `https://6dfa-181-172-90-126.ngrok.io/uploads/${filename}`;
    },
    async clearSongs() {
      try {
        await fetch('https://6dfa-181-172-90-126.ngrok.io/songs', {
          method: 'DELETE',
        });

        // Después de eliminar todas las canciones, actualiza la lista local
        this.songs = [];
      } catch (error) {
        console.error('Error al eliminar todas las canciones:', error);
      }
    },
  },
};
</script>

<style scoped>
.discover-view {
  max-width: 800px;
  margin: 0 auto;
}

.song-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

audio {
  margin-top: 10px;
}
</style>
