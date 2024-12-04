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
        :headers="headers2"
        :items="compras"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 30, 40, 50],
        }"
        :items-per-page="5"
        :sort-by="['idcompras']"
        :sort-desc="true"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom v-if="item.validado === 'false'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="editarP(item)" class="pa-3">
                <v-icon dark v-bind="attrs" small class="mr-2">
                  mdi-check-outline
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

/* Fijoo */
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
      compras: [],
      headers2: [
        {
          text: "Fecha\nde\nalta",
          value: "fecha",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Proveedor", value: "proveedor" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Descripción", value: "descrip" },
        { text: "validar", value: "actions" },
      ],
      actcompra: {
        idconsumibles: "",
        idcompras: "",
      },
    };
  },
  mounted() {
    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("escuchando", (datos) => {
      this.mostrarCompras();
    });
    this.socket.on("verificando", (datos) => {
      this.mostrarCompras();
    });
    this.mostrarCompras();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla compras*/
    async mostrarCompras() {
      //console.log(folio);
      try {
        const res = await fetch(`http://localhost:3001/verificarcompras`);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.compras = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de editar*/
    async editarP(item) {
      console.log(item);
      this.actcompra.idcompras = item.idcompras;
      this.actcompra.idconsumibles = item.folioActivo;

      const res = await fetch("http://localhost:3001/actualizarcompraglobal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.actcompra),
      });
      const datos = await res.json();
      /* if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Compra editada";
        this.Mensaje = "";
        this.edit = false;
        this.mostrarCompras(this.formData.folioActivo);
        this.mostrar();
      } */
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
