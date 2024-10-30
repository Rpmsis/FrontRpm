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
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-by="['fecha']"
        :sort-desc="true"
      >
        <template v-slot:item.concatenado="{ item }">
          <v-btn :color="categorias(item)" style="margin-top: 10px; margin-bottom: 10px; border-radius: 20px;">{{
            item.estatus
          }}</v-btn>
        </template>
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
      search: "",
      asistencia: [],
      headers: [
        { text: "id de asistencia ", value: "idasistencia" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Fecha de asistencia", value: "fecha" },
        { text: "Hora de entrada", value: "horainicio" },
        { text: "Hora de salida", value: "horafin" },
        { text: "Estatus", value: "concatenado" },
      ],
    };
  },

  mounted() {
    this.socket = io("http://192.168.1.97:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
    this.mostrar();
  },
  methods: {
    /* Solo falta renombrar y colocar los metodos correspondientes para registrar la falta o el justificante */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/todoasistencia");
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
    categorias(item) {
      console.log(item.estatus);
      if (item.estatus === "FALTA") {
        return "rgb(170, 35, 11)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "RETARDO") {
        return "rgb(83, 36, 83)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "JUSTIFICADO") {
        return "rgb(177, 189, 16)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "ASISTENCIA") {
        return "rgb(14, 124, 14)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "SALIR TEMPRANO") {
        return "rgb(20, 22, 117)"; // Clase CSS para destacar la fila
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
