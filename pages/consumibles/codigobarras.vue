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
        :items="consumibles"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-desc="true"
      >
        <template v-slot:item.actions="{ item }">
          <barcode :value="item.codigobarras"/>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

/* Fijoo */
<script>
import ImageZoom from "~/components/ImageZoom.vue";
import Barcode from 'vue-barcode';
export default {
  components: {
    ImageZoom,
    Barcode
  },
  layout: "barra",
  data() {
    return {
      code: '123456789',
      alerta: false,
      Mensaje: "",
      Titulo: "",
      consumibles: [],
      search: "",
      codigo: false,
      headers: [
        { text: "Id del activo", value: "folioActivo" },
        {
          text: "Fecha\ncreación",
          value: "fecha",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Descripción", value: "descripcion" },
        { text: "Tipo", value: "tipo" },
        {
          text: "Unidad\nde\nmedida",
          value: "unidadmedida",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Cantidad", value: "cantidad" },
        {
          text: "Costo\nunitario\nactual",
          value: "costo",
          align: "star",
          class: "multi-line-header",
        },
        {
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla consumibles*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/cbconsumibles");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.consumibles = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    limpiarFormulario() {
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
