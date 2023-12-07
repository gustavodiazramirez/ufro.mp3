<template>
  <div>
    <navbar></navbar>

    <div class="discover-view">
      <h2 class="lead letra">DESCUBRE NUEVAS CANCIONES</h2>
      <div v-if="songs.length === 0">
        <p class="no-songs-message" style="color: white;">No hay canciones disponibles.</p>
      </div>

      <div v-else>
        <song-card v-for="song in songs" :key="song.id" :song="song" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SongCard from '@/components/SongCard.vue';

export default {
  components: {
    Navbar,
    SongCard,
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
        const response = await fetch('http://localhost:3000/songs');
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

    async clearSongs() {
      try {
        await fetch('http://localhost:3000/songs', {
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
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.letra{
    font-weight: bold;
    color: white;
    font-family: Tahoma;
    font-size: 40px;
    margin-top: 10%;
    margin-bottom: 5%;
}
.song-info {
  display: flex;
}

.song-image img {
  max-width: 100px;
  border-radius: 4px;
  margin-right: 10px;
}

.song-details {
  flex: 1;
}

.song-description {
  color: #555;
}

.audio-player {
  width: 100%;
  margin-top: 10px;
}

.clear-button {
  background-color: #ff4b5c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5%;
}

.no-songs-message {
  color: #555;
}
</style>
