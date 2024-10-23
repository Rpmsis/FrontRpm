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
              <v-divider></v-divider>
              <v-form class="mt-7" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.idcheck"
                      type="text"
                      prepend-icon="mdi-qrcode-scan"
                      label="Id del usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.descanso"
                      :items="items"
                      label="Días de descanso"
                      chips
                      multiple
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-time-picker v-model="formData.horainicio" class="tamaño" color="green" :landscape="landscape"></v-time-picker
                    >
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-time-picker v-model="formData.horafin" color="pink" :landscape="landscape"></v-time-picker>
                  </v-col>
                </v-row>
                <center>
                  <v-btn class="btnEnviar" type="submit" block outlined color="success"
                    >Registrar usuario</v-btn
                  >
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
export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
      landscape: true,
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      registrar: false,
      userasistencias: [],
      items: ["Sábado", "Domingo"],
      headers: [
        { text: "id de registro ", value: "iduser_asistencia" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Privilegios", value: "privilegios" },
        { text: "Usuario biometrico", value: "userid" },
      ],
      formData: {
        idcheck: "",
        descanso: "",
        horainicio: "",
        horafin: "",
      },
    };
  },

  mounted() {
    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
    this.mostrar();
  },
  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/userasistencia");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.respuesta.respuesta);
          this.userasistencias = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async submitForm() {
      const res = await fetch("http://localhost:3001/insertarBiometrico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.respuesta.mensaje;
        this.limpiarFormulario();
        this.registrar = false;
      }
      console.log(datos);
    },
    limpiarFormulario() {
      this.formData.idcheck = "";
      this.formData.descanso= "";
      this.formData.horainicio= "";
      this.formData.horafin= "";
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
</style>
