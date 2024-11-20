<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="mt-5" style="padding: 10px">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="headers"
              :items="actividades"
              :search="search"
              :footer-props="{
                'items-per-page-options': [5, 10, 20, 30, 40, 50],
              }"
              :items-per-page="10"
              :sort-by="['fechainicio']"
              :sort-desc="true"
            >
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="actualizar(item.idasigactivi)"
                      small
                      class="mr-2"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Visualizar</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>

        <!-- Formulario de actualización de kilometros-->
        <template>
          <div class="pa-4 text-center">
            <v-dialog v-model="formkg" persistent max-width="500px">
              <v-card style="padding: 15px">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="(formkg = false), limpiarFormulario()">
                    <v-icon style="font-size: 30px"
                      >mdi-close theme--dark red--text</v-icon
                    ></v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-form class="mt-5" @submit.prevent="actAsignacionkg">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="datoNuevo.kg"
                        type="number"
                        min="1"
                        clear-icon="mdi-close-circle"
                        label="KILOGRAMOS"
                        style="border: white"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <center>
                        <v-btn
                          block
                          style="margin-top: 10px; margin-bottom: 10px"
                          outlined
                          color="green"
                          elevation="16"
                          type="submit"
                          >Actualizar</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
            </v-dialog>
          </div>
        </template>

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

      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
import io from "socket.io-client";

export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      actividades: [],
      formkg: false,
      headers: [
        { text: "Id de asignación", value: "idasigactivi" },
        { text: "Fecha de inicio", value: "fechainicio" },
        { text: "Empresa", value: "empresa" },
        { text: "Actividad", value: "actividad" },
        { text: "Tiempo de los responsables", value: "timeControl" },
        { text: "Tiempo record", value: "timestandar" },
        { text: "Kilogramos record", value: "kg" },
        {
          text: "Estatus",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],

      datoNuevo: {
        idasigactivi: "",
        kg: "",
      },
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

  computed: {},
  methods: {
    /* Mostrar Actividad */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/EficienciaKg",{
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.actividades = datos.respuesta;
          console.log(this.actividades);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar el formulario de kg*/
    async actualizar(idasigactivi) {
      //console.log("idasigactivi: ", idasigactivi);
      this.datoNuevo.idasigactivi= idasigactivi;
      this.formkg = true;
    },

    async actAsignacionkg() {
      //console.log(this.datoNuevo.motivo);
      const res = await fetch("http://localhost:3005/actualizarAsignacionkg", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevo),
      });
      const datos = await res.json();
      //console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
        this.mostrar();
        this.formkg = false;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.limpiarFormulario();
        this.mostrar();
        this.formkg = false;
      } 
    },

    limpiarFormulario() {
      this.datoNuevo.kg = "";
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
  padding: 0px 50px 0px 50px;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
</style>
