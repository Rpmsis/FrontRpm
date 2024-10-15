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
        <template v-slot:item.platoentrada="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen1}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.platoentrada }}</p>
        </template>

        <template v-slot:item.platofuerteA="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen3}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.platofuerteA }}</p>
        </template>

        <template v-slot:item.platofuerteB="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen4}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.platofuerteB }}</p>
        </template>

        <template v-slot:item.bebida="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen2}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.bebida }}</p>
        </template>
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
          this.enviarDatos.numsemana = datos.respuesta.respuesta[0].numsemana;
          //console.log(this.comidas);
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
  margin-bottom: 10px;
  width: 50%;
  height: 55px !important;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
.responsive-gif {
  width: 100px;
  height: 100px;
  border-radius: 30px;
}
</style>
