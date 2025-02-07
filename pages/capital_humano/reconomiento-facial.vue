<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row justify="center">
            <v-col cols="4" md="4" sm="12">
              <v-card class="mt-5" color="black" style="justify-items: center; padding:15px;">
                <h6>Mira a la camará.</h6>
                <div style="position: relative; width: 70%; height: auto">
                  <video
                    ref="video"
                    autoplay
                    muted
                    style="z-index: 1; width: 100%; height: auto"
                  ></video>
                  <canvas
                    ref="overlay"
                    style="
                      position: absolute;
                      top: 0;
                      right: 0;
                      z-index: 2;
                      width: 100%;
                      height: auto;
                    "
                  ></canvas>
                  <canvas ref="canvas" style="display: none"></canvas>
                  <v-text-field
                    v-model="datoescaneado"
                    label="Escanear QR"
                    hide-details
                    type="text"
                    @change="escaneando"
                    disabled
                  />
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-5" justify="center">
            <v-col cols="12" md="12" sm="4">
              <!-- <v-card
                v-show="foto"
                style="padding: 15px; border: solid white; background-color: black"
              >
                <canvas ref="canvas" style="display: none"></canvas>
                <img
                  v-if="photo"
                  :src="photo"
                  alt="Foto Capturada"
                  width="100%"
                  height="80%"
                />
                <center>
                  <h3 v-if="comparacion">
                    <strong>{{ comparacion }}</strong>
                  </h3>
                </center>
              </v-card> -->

              <!-- Campo de texto donde se escaneará el valor -->
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
      <!-- Ventana emergente -->
      <v-dialog v-model="alerta" max-width="500">
        <v-card>
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
          <v-card-title class="text-h4">
            {{ Titulo }}
          </v-card-title>
          <v-card-text class="text-h6 text-center">
            <h2>{{ Mensaje }}</h2>
            <img
              v-if="photo"
              :src="photo"
              alt="Foto Capturada"
              width="100%"
              height="80%"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="alerta = false"> Cerrar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import * as faceapi from "face-api.js";

export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      registrar: false,
      photo: "",
      modelPath: "/models",
      fotoguardada: null,
      comparacion: null,
      foto: false,
      btnregistro: false,
      formDatos: {
        nombre: "",
      },
      formCaptura: {
        captura: "",
      },

      datoescaneado: "",
    };
  },
  async mounted() {
    // Cargar modelos de face-api.js
    await faceapi.nets.ssdMobilenetv1.loadFromUri(this.modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(this.modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromUri(this.modelPath);

    //console.log("Modelos cargados correctamente");

    // Cargar la foto guardada y obtener su descriptor
    //await this.loadSavedPhoto();

    // Iniciar la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.startCamera();
    } else {
      console.error(
        "No se puede acceder a la cámara: navigator.mediaDevices.getUserMedia no está disponible."
      );
    }

    document.addEventListener("keydown", this.obtenerdatos);
  },
  watch: {},

  methods: {
    escaneando() {
      // style="position: absolute; opacity: 0; pointer-events: none"
      console.log("Dato escaneado: ", this.datoescaneado);
      //this.takePicture();
    },
    obtenerdatos(event) {
      if (event.key.length === 1) {
        this.datoescaneado += event.key;
      } else if (event.key === "Enter") {
        this.takePicture();
        console.log("Escaneo completo: ", this.datoescaneado);
      }
    },

    // Iniciar la cámara
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.video.srcObject = stream;

        // Cuando el video esté listo
        this.$refs.video.onloadedmetadata = () => {
          this.$refs.video.play();
        };
      } catch (err) {
        console.error("Error al acceder a la cámara", err);
      }
    },

    // Tomar una foto
    async takePicture() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const video = this.$refs.video;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detection = await faceapi
        .detectSingleFace(canvas)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = "No se detectó un rostro en la foto capturada.";
        this.comparacion = "";
        this.photo = null;
        this.foto = false;
        this.datoescaneado = "";

        setTimeout(() => {
          this.alerta = false;
          this.Titulo = " ";
          this.Mensaje = " ";
          this.foto = false;
          this.datoescaneado = "";
        }, 2000);

        return;
      } else {
        this.photo = canvas.toDataURL();
        await this.compareFace(detection);
        return;
      }
    },

    async compareFace(detection) {
      const captura = detection.descriptor;
      //this.formCaptura.captura = detection.descriptor;
      //console.log("Captura  ", captura);
      if (captura === "") {
        console.error("No se ha cargado un descriptor de la foto guardada.");
        return;
      } else {
        const formulario = new FormData();
        formulario.append("captura", captura);
        formulario.append("idcheck", this.datoescaneado);
        const res = await fetch("http://localhost:3001/compararcaras", {
          method: "POST",
          headers: {
            token: localStorage.token,
          },
          body: formulario,
        });
        const dato = await res.json();
        //console.log(dato);
        if (res.status === 400) {
          this.alerta = true;
          this.Titulo = "¡Upss!";
          this.Mensaje = dato.mensaje;
          this.comparacion = "";
          this.photo = null;
          this.foto = false;
          this.datoescaneado = "";

          setTimeout(() => {
            this.alerta = false;
            this.Titulo = " ";
            this.Mensaje = " ";
            this.foto = false;
            this.datoescaneado = "";
          }, 2000);
        } else {
          this.alerta = true;
          this.Titulo = dato.titulo;
          this.Mensaje = dato.mensaje;
          this.datoescaneado = "";

          setTimeout(() => {
            this.alerta = false;
            this.Titulo = " ";
            this.Mensaje = " ";
            this.foto = false;
            this.datoescaneado = "";
          }, 2000);
        }
      }
    },
  },
};
</script>

<style>
/* Centrar y configurar el layout */
.layout.wrap {
  justify-content: center;
}
.v-card__title {
  justify-content: center !important;
  font-size: 30px !important;
}
.row {
  padding: 0px 10px 0px 10px;
}
</style>
