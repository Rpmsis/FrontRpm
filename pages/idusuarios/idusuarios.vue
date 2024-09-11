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
        :items-per-page="50"
        :sort-desc="true"
      >
        <template v-slot:item.actions="{ item }">
          <barcode ref="barcode" :value="item.idCheck" class="codigobarras"/>
          <v-btn @click="printBarcode">Imprimir Código de Barras</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

/* Fijoo */
<script>
import ImageZoom from "~/components/ImageZoom.vue";
import Barcode from "vue-barcode";
export default {
  components: {
    ImageZoom,
    Barcode,
  },
  layout: "barra",
  data() {
    return {
      code: "123456789",
      alerta: false,
      Mensaje: "",
      Titulo: "",
      consumibles: [],
      search: "",
      codigo: false,
      headers: [
        { text: "Nombre completo del usuario", value: "NombreCompleto" },
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
        const res = await fetch("http://localhost:3001/Idusuario");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.consumibles = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    printBarcode() {
      this.$nextTick(() => {
        // Obtener el SVG del componente Barcode
        const svgElement = this.$refs.barcode.$el.querySelector('svg');
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);

        // Crear un nuevo canvas con el tamaño adecuado para la impresora térmica
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Aumentar el tamaño de impresión para mejorar la legibilidad
        const widthInPixels = 1000; // Aumentar el ancho para mejorar la legibilidad
        canvas.width = widthInPixels;
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);

        // Esperar a que la imagen se cargue
        img.onload = () => {
          canvas.height = img.height * (widthInPixels / img.width);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const imgData = canvas.toDataURL('image/png');
          // Crear una ventana de impresión y agregar solo la imagen
          const printWindow = window.open('', '', 'width=800,height=600');
          printWindow.document.write(`<html><head><title>Imprimir Código de Barras</title></head><body><img src="${imgData}" style="width:100%;height:auto;"></body></html>`);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
        };
      });
    },

    limpiarFormulario() {},
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
/* .codigobarras{
  width: 50px !important;
  height: 50px !important;
} */

.vue-barcode-element{
  
  max-height: 50px !important;
}
</style>
