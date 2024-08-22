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
        :items="comidas"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-by="['fechainicio']"
        :sort-desc="false"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

/* Fijoo */
<script>
import ImageZoom from "~/components/ImageZoom.vue";
export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
      search: "",
      comidas: [],
      headers: [
        { text: "Día de la semana", value: "diasemana" },
        { text: "Sopa", value: "platoentrada" },
        { text: "Plato fuerte A", value: "platofuerteA" },
        { text: "Plato fuerte B", value: "platofuerteB" },
        { text: "Bebida", value: "bebida" },
        { text: "Fecha del día", value: "fechainicio" },
      ],

    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Semanamenu");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.comidas = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
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
.multi-line-header {
  white-space: pre-line;
}
</style>
