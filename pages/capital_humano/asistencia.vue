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
        :items="asistencia"
        :search="search"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 30, 40, 50],
        }"
        :items-per-page="5"
      >
      </v-data-table>
    </v-card>

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
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      registrar: false,
      asistencia: [],
      headers: [
        { text: "id de registro ", value: "idasistencia" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Fecha de asistencia", value: "fecha" },
        { text: "Hora de entrada", value: "horainicio" },
        { text: "Hora de salida", value: "horafin" },
        { text: "Estatus", value: "estatus" },
      ],
      formData: {
        idcheck: "",
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
        const res = await fetch("http://localhost:3001/asistencias");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.respuesta.respuesta);
          this.asistencia = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
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
</style>
