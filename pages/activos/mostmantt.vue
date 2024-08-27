<template>
  <v-container>
    <v-card>
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
        :items="mantt"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
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
                @click="actubi(item.idMantenimiento, item.idubicacion)"
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

      <!-- Formulario-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="ubi" max-width="800px">
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
              <v-row>
                <v-col cols="12" md="3">
                  <div class="caja">
                    <h4 class="titulos">Id del activo:</h4>
                    <h2 class="txtactivos">{{ unactivo.folioMant }}</h2>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="caja">
                    <h4 class="titulos">Clasificación:</h4>
                    <h2 class="txtactivos">{{ unactivo.clasificacion }}</h2>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="caja">
                    <h4 class="titulos">Especificaciones:</h4>
                    <h2 class="txtactivos">{{ unactivo.especificacion }}</h2>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="caja">
                    <h4 class="titulos">Capacidad:</h4>
                    <h2 class="txtactivos">{{ unactivo.capacidad }}</h2>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4" filled>
                  <div class="caja">
                    <h4 class="titulos">Marca:</h4>
                    <h2 class="txtactivos">{{ unactivo.marca }}</h2>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="caja">
                    <h4 class="titulos">Tipo adicional:</h4>
                    <h2 class="txtactivos">{{ unactivo.tipocontmate }}</h2>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="caja">
                    <h4 class="titulos">Número de motor:</h4>
                    <h2 class="txtactivos">{{ unactivo.nmotor }}</h2>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="caja">
                    <h4 class="titulos">Descripción adicional:</h4>
                    <h2 class="txtactivos">{{ unactivo.descripadi }}</h2>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="caja">
                    <h4 class="titulos">Modelo:</h4>
                    <h2 class="txtactivos">{{ unactivo.modelo }}</h2>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12" class="mt-5">
                  <v-form @submit.prevent="actualiarDes">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-select
                          :items="ubicaciones"
                          :item-title="datos1.idubicacion"
                          v-model="datos1.idubicacion"
                          item-value="text"
                          item-text="text"
                          label="*UBICACIÓN"
                          filled
                        ></v-select>
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
                        >Actualizar</v-btn
                      >
                    </center>
                  </v-form>
                </v-col>
              </v-row>
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
<script>
export default {
  layout: "barra",
  middleware: "auth",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      mantt: [],
      search: "",
      demo: "",
      ubi: false,
      ubicaciones: [],
      headers: [
        {
          text: "Id del activo",
          align: "start",
          filterable: true,
          value: "folioMant",
        },
        { text: "Descripción general", value: "descripgen" },
        { text: "Fabricación", value: "fabricacion" },
        { text: "Tipo de activo", value: "tipoAct" },
        { text: "Ubicación", value: "idubicacion" },
        { text: "Acciones", value: "actions" },
      ],
      datos1: {
        id: "",
        idubicacion: "",
      },
      unactivo: [],
    };
  },
  mounted() {
    this.mostrar();
    this.mostrarubi();
  },
  methods: {
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/mantenimiento");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.mantt = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar ubicación */
    async mostrarubi() {
      try {
        const res = await fetch("http://localhost:3001/ubicacion");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.ubicaciones = datos.respuesta.respuesta;
          this.ubicaciones = datos.respuesta.respuesta.map((filtro) => ({
            id: filtro.descrip,
            text: filtro.descrip,
          }));
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar formulario de actualizar */
    async actubi(id, ubicacion) {
      //console.log(id);
      this.datos1.id = id;
      const datosnuevos = this.mantt.find((filtro) => filtro.idMantenimiento === id);
      //console.log(datosnuevos);
      this.unactivo = datosnuevos;
      this.datos1.idubicacion = ubicacion;
      this.ubi = true;
    },

    /* Actualizar ubicación de mantt */
    async actualiarDes() {
      const res = await fetch("http://localhost:3001/actualizarmantt", {
        method: "PUT",
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
        this.Titulo = "Ubicación actualizada";
        this.limpiarFormulario();
        this.ubi = false;
        this.mostrar();
      }
      console.log(datos);
    },

    limpiarFormulario() {
      this.datos1.idubicacion = "";
    },
  },
};
</script>
<style>
.txtactivos {
  color: #ffffff;
  align-items: center;
  text-align: center;
}
.titulos{
  color: rgb(11, 248, 11);
}
.caja {
  background-color: rgb(141 131 129 / 24%);
  padding: 5px;
}
</style>
