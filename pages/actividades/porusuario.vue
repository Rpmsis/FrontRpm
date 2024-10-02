<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="mt-7">
            <v-row>
              <v-col cols="12" md="12">
                <v-card-title>
                  <v-text-field
                  v-model="formData.usuario"
                  type="password"
                  append-icon="mdi-magnify"
                  label="Buscar usuario"
                  @input="mostrarExistencias(formData.usuario)"
                  clearable
                ></v-text-field>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mt-5" style="padding: 10px">
            <!-- Tabla de control de actividades del usuario -->
            <v-card v-show="tablacontrol" class="mt-5" style="padding: 10px">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                :headers="headers"
                :items="controlactivi"
                :search="search"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 30, 40, 50],
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
                        @click="
                          activi(
                            item.idcontrolactivi,
                            item.estatusC,
                            item.idasigactivi,
                            item.idactividades,
                            item.estatusA
                          )
                        "
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

            <!-- Mensaje de no existe usuario -->
            <v-card style="padding: 15px" v-show="msjmovimiento">
              <v-card-title class="text-h2" style="color: yellow">
                SIN ACTIVIDADES
              </v-card-title>
            </v-card>

            <!-- Mostrar dialog con botones-->
            <template>
              <div class="pa-4 text-center">
                <v-dialog v-model="tiempoactivi" persistent max-width="600px">
                  <v-card style="padding: 15px; text-align: right">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="(tiempoactivi = false), limpiarFormulario()">
                        <v-icon style="font-size: 30px"
                          >mdi-close theme--dark red--text</v-icon
                        ></v-btn
                      >
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-row style="margin-top: 5px">
                      <v-col cols="12" md="10">
                        <center>
                          <v-btn
                            v-show="btniniciar"
                            block
                            style="margin-top: 10px; margin-bottom: 10px"
                            outlined
                            color="green"
                            elevation="16"
                            @click="acttiempo"
                            >INICIAR ACTIVIDAD</v-btn
                          >
                          <v-btn
                            v-show="btnterminar"
                            block
                            style="margin-top: 10px; margin-bottom: 10px"
                            outlined
                            color="yellow"
                            elevation="16"
                            @click="acttiempofinal"
                            >TERMINAR ACTIVIDAD</v-btn
                          >
                        </center>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-btn icon v-show="pausa" @click="acttiempoReanudar">
                          <v-icon style="font-size: 60px"
                            >mdi-motion-play theme--dark red--text</v-icon
                          >
                        </v-btn>
                        <v-btn icon v-show="reanudar" @click="pausareanudar">
                          <v-icon style="font-size: 60px"
                            >mdi-motion-pause-outline theme--dark red--text</v-icon
                          >
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </div>
            </template>

            <!-- Formulario de pausa-->
            <template>
              <div class="pa-4 text-center">
                <v-dialog v-model="formpausa" persistent max-width="500px">
                  <v-card style="padding: 15px">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="(formpausa = false), limpiarFormularioPausa()">
                        <v-icon style="font-size: 30px"
                          >mdi-close theme--dark red--text</v-icon
                        ></v-btn
                      >
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-form class="mt-5" @submit.prevent="acttiempoPausa">
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-select
                            v-model="datoNuevo2.motivoselec"
                            :items="motivospausa"
                            label="MOTIVO"
                            filled
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-textarea
                            v-model="datoNuevo2.motivodes"
                            clear-icon="mdi-close-circle"
                            label="DESCRIBE EL MOTIVO.."
                            clearable
                            style="border: white"
                          ></v-textarea>
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
                              >Guardar</v-btn
                            >
                          </center>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-card>
        </v-flex>
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

export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      msjbtn: "",
      btncolor: "",
      btniniciar: false,
      btnterminar: false,
      pausa: false,
      reanudar: false,
      tiempoactivi: false,
      formpausa: false,
      tablacontrol: false,
      msjmovimiento: false,
      controlactivi: [],
      motivospausa: ["Consumo de alimentos", "Averia"],
      operadores: [],
      actividad: [],
      headers: [
        { text: "Id control", value: "idcontrolactivi" },
        { text: "Responsable", value: "responsables" },
        { text: "Actividad", value: "actividad" },
        { text: "Estatus", value: "estatusC" },
        { text: "Estatus", value: "actions", sortable: false },
      ],
      /* formData.codigobarras */
      formData: {
        usuario: "",
      },
      datoNuevo: {
        responsables: "",
        idactividades: "",
        idasigactivi: "",
        idcontrolactivi: "",
        status: "",
        motivoselec: "",
        motivodes: "",
      },

      datoNuevo2: {
        responsables: "",
        idactividades: "",
        idasigactivi: "",
        idcontrolactivi: "",
        status: "",
        motivoselec: "",
        motivodes: "",
      },
    };
  },
  mounted() {},

  computed: {},
  methods: {
    async mostrarExistencias(user) {
      console.log(user);
      const responsable = user;
      try {
        const res = await fetch(
          `http://localhost:3001/Controlresponsable?responsable=${responsable}`
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.result);
          this.controlactivi = datos.result;
          if (this.formData.usuario) {
            if (this.controlactivi && this.controlactivi.length > 0) {
              this.tablacontrol = true;
              this.msjmovimiento = false;
            } else {
              this.msjmovimiento = true;
              this.tablacontrol = false;
            }
          } else {
            this.msjmovimiento = false;
            this.tablacontrol = false;
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar los botones */
    async activi(item, estatus, asignacion, actividades, statusAsignacion) {
      this.datoNuevo2.idcontrolactivi = item;
      this.datoNuevo2.idasigactivi = asignacion;
      this.datoNuevo2.idactividades = actividades;
      this.datoNuevo2.status = statusAsignacion
      this.tiempoactivi = true;
      console.log(
        "idcontrolactivi: ",
        item,
        " Estatus controlactivi: ",
        estatus,
        "Idactividades: ",
        actividades,
        "idasigactivi: ",
        asignacion
      );
      if (estatus === "INICIAR") {
        this.btniniciar = true;
        this.btnterminar = false;
        this.pausa = false;
        this.reanudar = false;
      } else {
        if (estatus === "EN PROCESO") {
          this.btniniciar = false;
          this.btnterminar = true;
          this.pausa = false;
          this.reanudar = true;
        } else {
          if (estatus === "EN PAUSA") {
            this.pausa = true;
            this.reanudar = false;
            this.btniniciar = false;
            this.btnterminar = false;
          }
        }
      }
    },

    /* Mostrar formulario de pausas */
    async pausareanudar() {
      this.formpausa = true;
      console.log(this.datoNuevo.idcontrolactivi);
    },

    /* Enviar estatus en proceso del botón iniciar actividad */
    async acttiempo() {
      this.datoNuevo2.status = "EN PROCESO";
      const res = await fetch("http://localhost:3001/insertarTiempo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevo2),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.mostrarExistencias(this.formData.usuario);
        this.tiempoactivi = false;
      }
    },

    /* Enviar estatus en TERMINADO del botón Terminar actividad */
    async acttiempofinal() {
      //console.log(this.datoNuevo.motivo);
      const res = await fetch("http://localhost:3001/actualizarTimefin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevo2),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = "¡Termino!";
        this.Mensaje = datos.mensaje;
        this.mostrarExistencias(this.formData.usuario);
        this.tiempoactivi = false;
      }
    },

    /* Enviar estatus en EN PAUSA del botón pausa */
    async acttiempoPausa() {
      //console.log(this.datoNuevo.motivo);
      const res = await fetch("http://localhost:3001/actualizarTimepausa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevo2),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.limpiarFormularioPausa();
        this.mostrarExistencias(this.formData.usuario);
        this.formpausa = false;
        this.tiempoactivi = false;
      }
    },

    /* Enviar estatus en proceso del botón pausa actividad */
    async acttiempoReanudar() {
      this.datoNuevo2.status = "EN PROCESO";
      const res = await fetch("http://localhost:3001/insertarTiempo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevo2),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.mostrarExistencias(this.formData.usuario);
        this.tiempoactivi = false;
      }
    },

    /* Limpiar formulario de agendar */
    limpiarFormulario() {
      (this.datoNuevo.responsables = ""), (this.datoNuevo.idactividades = "");
    },
    limpiarFormularioPausa() {
      (this.datoNuevo2.motivodes = ""), (this.datoNuevo2.motivoselec = "");
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
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
.btn-success {
  background-color: green;
  color: white;
}

.btn-warning {
  background-color: orange;
  color: white;
}

.btn-error {
  background-color: red;
  color: white;
}
</style>


