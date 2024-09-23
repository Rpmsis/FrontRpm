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
        :items="datosentregasafi"
        :search="search"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 30, 40, 50],
        }"
        :items-per-page="5"
        :sort-desc="true"
      >
      </v-data-table>
      <v-btn icon @click="entregas = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="entregas" persistent max-width="600px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(entregas = false), limpiarFormulario()">
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
                    <v-text-field
                      v-model="formData.folioActivo"
                      type="text"
                      prepend-icon="mdi-barcode-scan"
                      label="Id del activo"
                      
                    ></v-text-field>
                  </v-col>
                </v-row>
                <center>
                  <v-btn class="btnEnviar" type="submit" block outlined color="success"
                    >Registrar entrega</v-btn
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
      entregas: false,
      datosentregasafi: [],
      headers: [
        { text: "id del activo ", value: "folioActivo" },
        { text: "Fecha de entrega", value: "fecha" },
        { text: "Área", value: "area" },
        { text: "Estatus", value: "estatus" },
      ],
      formData: {
        folioActivo: "",
        idcheck: "",
      },
    };
  },

  mounted() {
    this.mostrar();
  },
  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/entregaAFI");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.respuesta.respuesta);
          this.datosentregasafi = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async Buscar() {
      if (this.formData.folioActivo === "") {
        return false;
      } else {
        const res = await fetch(
          "http://localhost:3001/idinsumos/" + this.formData.folioActivo,
          {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
          }
        );
        const dato = await res.json();
        console.log(dato);
        /* if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =dato.mensaje;
        this.datos = false;
      } else {
        this.datos = true;
        //console.log("Actividades: ",dato.actividades.respuesta);
        this.actividad = dato.actividades.respuesta.map((filtro) => ({
            id: filtro.idactividades,
            text: filtro.actividad,
            idasigactivi: filtro.idasigactivi,
          }));
        //console.log("Responsables",dato.responsables.respuesta);
        this.operadores = dato.responsables.respuesta.map((filtro) => ({
            id: filtro.idPMD,
            text: filtro.Nombre,
          })); 
          this.mostrarControl();
      } */
        //console.log(dato.results3)
      }
    },
    async submitForm() {
      const res = await fetch("http://localhost:3001/insertarentregaAFI", {
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
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.limpiarFormulario();
        this.entregas = false;
        this.mostrar();
      }
      console.log(datos);
    },
    limpiarFormulario() {
      this.formData.folioActivo = "";
      this.formData.idcheck = "";
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
