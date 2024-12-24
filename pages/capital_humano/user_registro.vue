<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="userasistencias"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-desc="true"
      >
      </v-data-table>
      <v-btn icon @click="registrar = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="registrar" persistent max-width="1000px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(registrar = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <center>
                      <img
                        v-if="imagePreview1"
                        :width="180"
                        :height="200"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview1"
                        alt="Foto guardada"
                      />
                    </center>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-file-input
                      counter
                      show-size
                      prepend-icon="mdi-camera-plus"
                      label="Foto a guardar"
                      v-model="Solicitud.archivo"
                      @change="updateImagePreview"
                    ></v-file-input>
                    <v-text-field
                      v-model="formData.idcheck"
                      type="text"
                      prepend-icon="mdi-qrcode-scan"
                      label="Id del usuario"
                    ></v-text-field>
                    <v-select
                      v-model="formData.turno"
                      :items="turnos"
                      prepend-icon="mdi-store-clock "
                      item-text="text"
                      item-value="value"
                      label="Turno.."
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" sm="12">
                    <v-select
                      v-model="formData.descanso"
                      :items="items"
                      label="Días de descanso"
                      prepend-icon="mdi-weather-sunset"
                      chips
                      multiple
                      @change="descansos"
                    ></v-select>
                  </v-col>
                  <v-col v-show="relojMD" cols="12" md="3" sm="6">
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="Hora de entrada fin de semana"
                          prepend-icon="mdi-clock-start"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        color="green"
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col v-show="relojMD" cols="12" md="3" sm="6">
                    <v-menu
                      ref="menu3"
                      v-model="menu4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time2"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time2"
                          label="Hora de salida fin de semana"
                          prepend-icon="mdi-clock-end"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu4"
                        v-model="time2"
                        full-width
                        color="pink"
                        @click:minute="$refs.menu3.save(time2)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <h4>Hora de entrada:</h4>
                    <v-time-picker
                      v-model="formData.horainicio"
                      class="tamaño"
                      color="green"
                      :landscape="landscape"
                    ></v-time-picker>
                  </v-col>
                  <v-col cols="12" md="6">
                    <h4>Hora de entrada:</h4>
                    <v-time-picker
                      v-model="formData.horafin"
                      color="pink"
                      :landscape="landscape"
                    ></v-time-picker>
                  </v-col>
                </v-row>
                <center v-show="btnregistrar">
                  <v-btn class="btnEnviar" type="submit" block outlined color="success"
                    >Registrar usuario</v-btn
                  >
                </center>
                <center v-show="jirafita">
                  <img class="gifjirafa" :src="perrito" />
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-card>
    <!-- Ventana emergente -->
    <v-dialog v-model="alerta" max-width="500">
      <v-card>
        <v-card-title class="text-h4">
          {{ Titulo }}
        </v-card-title>
        <v-card-text class="text-h6 text-center">
          {{ Mensaje }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="alerta = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import ImageZoom from "~/components/ImageZoom.vue";
import * as faceapi from "face-api.js";

export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
      modelPath: "/models",
      perrito: "/perrito.gif",
      landscape: true,
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      registrar: false,
      userasistencias: [],
      items: ["Sábado", "Domingo"],
      relojMD: false,
      time: "",
      menu2: false,
      time2: "",
      menu4: false,
      btnregistrar: true,
      jirafita: false,
      turnos: ["PRIMERO", "SEGUNDO", "TERCERO"],
      headers: [
        { text: "id de registro ", value: "iduser_asistencia" },
        { text: "Nombre completo", value: "nombre" },
        {
          text: "Hora\nde\nentrada",
          value: "horaentrada",
          align: "start",
          class: "multi-line-header",
        },
        {
          text: "Hora\nde\nsalida",
          value: "horasalida",
          align: "start",
          class: "multi-line-header",
        },
        { text: "Descanso", value: "descanso" },
      ],
      formData: {
        idcheck: "",
        horainicio: "",
        horafin: "",
        descanso: "",
        horainicioMD: "",
        horafinMD: "",
        turno: "",
        descrip: "",
      },
      imagePreview1: null,
      Solicitud: {
        archivo: null,
      },
    };
  },

  async mounted() {
    this.mostrar();
    await faceapi.nets.ssdMobilenetv1.loadFromUri(this.modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(this.modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromUri(this.modelPath);

    console.log("Modelos cargados correctamente");

    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
  },
  methods: {
    updateImagePreview() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview1 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview1 = null;
      }
    },

    ocultarbtn() {
      this.btnregistrar = false;
      this.jirafita = true;
    },
    async descansos() {
      if (
        this.formData.descanso.includes("Sábado") &&
        this.formData.descanso.includes("Domingo")
      ) {
        //console.log(this.formData.descanso);
        this.relojMD = false;
      } else {
        //console.log(this.formData.descanso);
        this.relojMD = true;
      }
    },
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/userasistencia");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.respuesta.respuesta);
          this.userasistencias = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async submitForm() {
      if (this.imagePreview1) {
        this.ocultarbtn();
        this.formData.horainicioMD = this.time;
        this.formData.horafinMD = this.time2;
        const img = await faceapi.fetchImage(this.imagePreview1); // Ruta de la foto guardada
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          this.formData.descrip = detection.descriptor;
          console.log("Descriptor de la foto guardada cargado.");
          console.log(detection.descriptor);
          
          const formulario = new FormData();
          formulario.append("idcheck", this.formData.idcheck);
          formulario.append("horainicio", this.formData.horainicio);
          formulario.append("horafin", this.formData.horafin);
          formulario.append("descanso", this.formData.descanso);
          formulario.append("horainicioMD", this.formData.horainicioMD);
          formulario.append("horafinMD", this.formData.horafinMD);
          formulario.append("turno", this.formData.turno);
          formulario.append("descrip", this.formData.descrip);
          formulario.append("archivo", this.Solicitud.archivo);
          const res = await fetch("http://localhost:3001/registrarUserasistencia", {
            method: "POST",
            headers: {
              token: localStorage.token,
            },
            body: formulario,
          });
          const datos = await res.json();
          if (res.status === 400) {
            this.alerta = true;
            this.Titulo = "¡Upss!";
            this.Mensaje = datos.mensaje;
            this.btnregistrar = true;
            this.jirafita = false;
          } else {
            this.alerta = true;
            //this.Titulo = "El ID del activo es: ";
            this.Titulo = datos.respuesta.mensaje;
            this.Mensaje = "";
            this.limpiarFormulario();
            this.registrar = false;
            this.btnregistrar = true;
            this.jirafita = false;
            this.mostrar();
          }
          console.log(datos);
        }
      }
    },
    limpiarFormulario() {
      this.formData.idcheck = "";
      this.formData.descanso = "";
      this.formData.horainicio = "";
      this.formData.horafin = "";
      this.time = "";
      this.time2 = "";
      this.relojMD = false;
    },
  },
};
</script>

<style>
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
.btnEnviar {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
  font-size: 20px !important;
}

.tamaño .v-time-picker__clock {
  width: 100px; /* Ajusta según lo necesites */
  height: 100px; /* Ajusta según lo necesites */
}
.gifjirafa {
  margin-top: -146px;
  position: relative;
  z-index: 1;
}
.multi-line-header2 {
  white-space: pre-line;
  background-color: #eaecf0; /* Cambia este valor al color que desees */
  color: #eb0e0e !important;
}
.multi-line-header {
  white-space: pre-line;
}
</style>
