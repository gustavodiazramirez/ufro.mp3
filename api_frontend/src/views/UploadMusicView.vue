<template>
  <div>
    <Navbar />
    <div class="background-container">
      <h2 style="margin-top: 3%; font-weight: 800; font-size: 50px; color: rgb(255, 255, 255);" >SUBIR CANCIÓN</h2>

      <div class="music-uploader-container">

        <div class="music-uploader">

          <form @submit.prevent="uploadMusic" class="music-form" enctype="multipart/form-data">
            <div class="form-group">
              <label for="title">Título de la canción:</label>
              <input type="text" id="title" v-model="title" required>
            </div>
            <div class="form-group">
              <label for="description">Descripción de la canción:</label>
              <textarea id="description" v-model="description" required></textarea>
            </div>
            <div class="form-group">
              <div class="form-group">
                <label for="audio" class="custom-file-upload">
                  <span>Seleccionar archivo de audio</span>
                  <input type="file" id="audio" name="audio" accept="audio/*" @change="previewAudio" required>
                </label>
                <audio v-if="audioUrl" controls :src="audioUrl" class="audio-vista"></audio>
              </div>
              <div class="form-group">
                <label for="image" class="custom-file-upload">
                  <span>Seleccionar imagen de portada</span>
                  <input type="file" id="image" name="image" accept="image/*" @change="previewImage" required>
                </label>
                <img v-if="imageUrl" :src="imageUrl" alt="Vista previa de la imagen" class="imagen-vista">
              </div>
              <button type="submit" style="margin-top: 30px;">Subir Música</button>
            </div>
          </form>

          <!-- Mostrar mensaje de éxito o error -->
          <div v-if="uploadMessage">
            <p>{{ uploadMessage }}</p>
            <router-link to="/">Ir al Home</router-link>
          </div>

          <!-- Modal de confirmación -->
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <p>¿Seguro que deseas eliminar esta canción?</p>
              <div class="modal-buttons">
                <button class="confirm-button" @click="deleteSong">Sí</button>
                <button class="cancel-button" @click="cancelDelete">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { Howl } from 'howler';
import Navbar from '@/components/Navbar.vue';

export default {
  data() {
    return {
      title: '',
      description: '',
      audioUrl: '',
      imageUrl: '',
      uploadMessage: null,
      dropzoneInitialized: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async uploadMusic() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('audio', document.getElementById('audio').files[0]);
      formData.append('image', document.getElementById('image').files[0]);

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (response.ok) {
          this.audioUrl = data.audioUrl;
          this.imageUrl = data.imageUrl;
          this.title = data.title;
          this.description = data.description;
          alert('Archivo subido con éxito');
          this.$router.push('/descubrir');
        } else {
          console.error('Error en la respuesta del servidor:', data);
          alert('Error al subir el archivo. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error interno del servidor. Por favor, inténtalo de nuevo.');
      }
    },
    previewAudio() {
      const input = document.getElementById('audio');
      const file = input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.audioUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    previewImage() {
      const input = document.getElementById('image');
      const file = input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
  updated() {
    if (document.getElementById('audio') && !this.dropzoneInitialized) {
      const myDropzone = new Dropzone('#audio', {
        url: 'http://localhost:3000/upload',
        acceptedFiles: 'audio/*',
        addRemoveLinks: true,
        init: function () {
          this.on('complete', function (file) {
            try {
              const response = JSON.parse(file.xhr.response);
              if (response.message === 'Archivo subido con éxito') {
                this.uploadMessage = response.message;
              } else {
                this.uploadMessage = 'Error al subir el archivo';
              }
              const audioUrl = response.audioUrl;
              const sound = new Howl({ src: [audioUrl] });
              sound.play();
            } catch (error) {
              console.error('Error al procesar la respuesta del servidor:', error);
            }
          });
        },
      });

      this.dropzoneInitialized = true;
    }
  },
};
</script>
<style scoped>
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
  background-color: rgb(51, 175, 88);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.custom-file-upload:hover {
  background-color: #45a049;
}

.music-uploader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
  margin-top: 50px;
}

.music-uploader {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.background-container {
  background-color: #01356E;
  /* Puedes cambiar el color a tu preferencia */
  min-height: 120vh;
  /* Asegura que el fondo se extienda al menos a la altura de la pantalla */
}

.music-form {
  display: flex;
  flex-direction: column;
}

.imagen-vista {
  width: 300px;
  height: 300px;
  padding: 30px;
  flex: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

.audio-vista {
  width: 550px;
  margin-top: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .music-uploader {
    max-width: 100%;
  }
}</style>