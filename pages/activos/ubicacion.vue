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
        :items="ubicaciones"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-desc="true"
      >
      </v-data-table>
      <v-btn  icon @click="ubi = true" style="margin-left: 15px; margin-top: 5px;">
        <v-icon style="font-size: 50px; "
          >mdi-plus-circle theme--dark green--text</v-icon
        >
      </v-btn>

      <!-- Formulario-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="ubi" max-width="600px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(ubi = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="enviarForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="datos1.descrip"
                      filled
                      label="* DESCRIPCIÓN"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="datos1.area"
                      filled
                      label="* ÁREA"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <center>
                  <v-btn
                    block
                    style="margin-top: 10px; margin-bottom: 10px"
                    outlined
                    color="green"
                    elevation="16"
                    type="submit"
                    >Guardar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-card>

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

/* Fijoo */
<script>
import "@mdi/font/css/materialdesignicons.css";
export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      ubicaciones: [],
      ubi: false,
      headers: [
        { text: "Id ubicación", value: "idubicacion" },
        { text: "Fecha creación", value: "fecha" },
        { text: "Descripción", value: "descrip" },
        { text: "Área", value: "area" },
      ],
      datos1: {
        descrip: "",
        area: "",
      },
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://192.168.1.105:3001/ubicacion");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.ubicaciones = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Enviar el formulario */
    async enviarForm() {
      const res = await fetch("http://192.168.1.105:3001/insertarUbi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datos1),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Ubicación guardada";
        this.limpiarFormulario();
        this.ubi = false;
        this.mostrar();
      }
      console.log(datos);
    },

    /* Limpiar los datos de los formularios */
    limpiarFormulario() {
      this.datos1.descrip = "";
      this.datos1.area = "";
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
  /* padding: 0px 50px 0px 50px; */
  max-width: 100% !important;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
</style>
