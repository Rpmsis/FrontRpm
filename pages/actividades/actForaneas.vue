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
        :items="actividad"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-desc="true"
      >
        <template v-slot:item.concatenado="{ item }">
          {{ `${item.hora}:${item.minutos}` }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                @click="actualizar(item.idactividades)"
                small
                class="mr-2"
              >
                mdi-file-edit
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-btn icon @click="acti = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <div class="pa-4 text-center">
        <v-dialog v-model="acti" persistent max-width="1200px">
          <v-card style="padding: 15px">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="(acti = false), limpiarFormulario()">
                <v-icon style="font-size: 30px"
                  >mdi-close theme--dark red--text</v-icon
                ></v-btn
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-form class="mt-5" @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="4">
                  <h4>¿La actividad requiere unidad de medida?</h4>
                  <v-radio-group v-model="opcionSeleccionada">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-radio
                          @click="datoSeleccionado()"
                          label="Si"
                          value="si"
                        ></v-radio>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-radio
                          @click="datoSeleccionado()"
                          label="No"
                          value="no"
                        ></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="formData.actividad"
                    type="text"
                    label="ACTIVIDAD"
                    @input="formData.actividad = formData.actividad.toUpperCase()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- row 1: ubicacion, periodo, kgglobal,hora y minutos -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.ubicacion"
                    :items="ubicaciones"
                    label="UBICACIÓN.."
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.periodo"
                    :items="periodos"
                    label="PERIODO"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="formData.hora"
                    type="number"
                    label="HORA"
                    min="1"
                    max="24"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="formData.minutos"
                    type="number"
                    label="MINUTOS"
                    min="1"
                    max="60"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-show="medibles">
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="formData.kg"
                    type="number"
                    min="1"
                    prefix="Kg"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.familias"
                    :items="familias"
                    label="FAMILIAS"
                    @change="mostrarproduc"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="5" xs="7">
                  <v-select
                    v-model="formData.productos"
                    :items="productos"
                    label="PRODUCTOS"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="1" xs="5">
                  <v-btn icon @click="addMaterial = true">
                    <v-icon style="font-size: 50px"
                      >mdi-plus-circle theme--dark green--text</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-row>
              <center>
                <v-btn block outlined class="btnEnviar" type="submit" color="success"
                  >Guardar</v-btn
                >
              </center>
            </v-form>
          </v-card>
        </v-dialog>
      </div>

      <!-- Formulario actualizar-->
      <div class="pa-4 text-center">
        <v-dialog v-model="actiActualizar" persistent max-width="400px">
          <v-card style="padding: 15px">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="actiActualizar = false">
                <v-icon style="font-size: 30px"
                  >mdi-close theme--dark red--text</v-icon
                ></v-btn
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-form class="mt-5" @submit.prevent="actualizaracti">
              <v-row>
                <v-col cols="12" md="12">
                  <v-select
                    v-model="formDataact.periodo"
                    :items="periodos"
                    label="PERIODO"
                    filled
                  ></v-select>
                </v-col>
              </v-row>
              <center>
                <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                  >Actualizar</v-btn
                >
              </center>
            </v-form>
          </v-card>
        </v-dialog>
      </div>

      <!-- Formulario material-->
      <div class="pa-4 text-center">
        <v-dialog v-model="addMaterial" persistent max-width="600px">
          <v-card style="padding: 15px">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="(addMaterial = false), limpiarFormularioAdd()">
                <v-icon style="font-size: 30px"
                  >mdi-close theme--dark red--text</v-icon
                ></v-btn
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-form class="mt-5" @submit.prevent="submitFormAdd">
              <!-- row 1: tipo, proveedor, folio OC -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formDataAdd.fam"
                    :items="familias"
                    label="FAMILIAS"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formDataAdd.produc"
                    type="producto"
                    label="* PRODUCTO"
                  ></v-text-field>
                </v-col>
              </v-row>
              <center>
                <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                  >Agregar</v-btn
                >
              </center>
            </v-form>
          </v-card>
        </v-dialog>
      </div>
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
      alerta: false,
      Mensaje: "",
      Titulo: "",
      actividad: [],
      ubicaciones: [],
      search: "",
      acti: false,
      actiActualizar: false,
      medibles: false,
      addMaterial: false,
      tipoactividad: ["", "PRODUCTO 2", "PRODUCTO 3"],
      productos: [],
      familias: [
        "ACERO",
        "ALUMINIO",
        "ALEACIONES",
        "BRONCE",
        "CARTÓN",
        "COBRE",
        "CROMO",
        "FIERRO",
        "MADERA",
        "PLÁSTICO",
        "TITANIO",
      ],
      headers: [
        { text: "Id actividad", value: "idactividades" },
        { text: "Actividad", value: "actividad" },
        { text: "Tiempo", value: "concatenado" },
        { text: "Ubicación", value: "ubicacion" },
        { text: "kilogramos", value: "kg" },
        { text: "Producto", value: "producto" },
        { text: "Tiempo estandar", value: "timestandar" },
        { text: "Periodo", value: "periodo" },
        { text: "Eficiencia", value: "eficiencia" },
        { text: "Editar periodo", value: "actions" },
      ],
      opcionSeleccionada: "",
      formData: {
        unidad: "",
        familias: "",
        ubicacion: "",
        hora: "",
        minutos: "",
        kg: "",
        productos: "",
        actividad: "",
        periodo: "",
      },
      periodos: ["EXTRAORDINARIO", "DIARIO"],
      kgdecision: ["MENSUAL", "DIARIO"],

      formDataact: {
        idactividades: "",
        periodo: "",
      },

      formDataAdd: {
        fam: "",
        produc: "",
      },
    };
  },
  mounted() {
    this.socket = io("http://localhost:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrarubi();
      this.mostrar();
    });
    this.mostrarubi();
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar ubicación ++++*/
    async mostrarubi() {
      try {
        const res = await fetch("http://localhost:3005/ubicacion", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.ubicaciones = datos.ubicacionesPDM;
          this.ubicaciones = datos.ubicacionesPDM.map((ubi) => [ubi.descrip]);
          console.log(this.ubicaciones);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar los datos de la tabla +++*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/actividades", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.actividad = datos.respuesta;
          //console.log(datos.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar material +++*/
    async mostrarproduc() {
      const famil = this.formData.familias;
      //console.log(famil);
      try {
        const res = await fetch(`http://localhost:3005/material`);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.ubicaciones = datos.respuesta.respuesta;
          const datosFam = datos.respuesta.respuesta.filter(
            (mate) => mate.familia === famil
          );
          this.productos = datosFam.map((produc) => [produc.producto]);
          //console.log(datosFam);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      const objeto = this.actividad.find((filtro) => filtro.idactividades === item);
      this.formDataact = objeto;
      //console.log(this.formDataact);
      this.actiActualizar = true;
    },
    /* -------------------------------- */

    /* Enviar formulario de actividades +++*/
    async submitForm() {
      const res = await fetch("http://localhost:3005/insertarActif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        //this.Titulo = "Error";
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = "ID de la actividad: ";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
        this.acti = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------------------------ */

    /* Enviar formulario de material +++*/
    async submitFormAdd() {
      const res = await fetch("http://localhost:3005/insertarMaterial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formDataAdd),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        //this.Titulo = "Error";
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.limpiarFormularioAdd();
        this.addMaterial = false;
        this.mostrarproduc();
      }
    },
    /* ------------------------------------------------------------ */
    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const res = await fetch("http://localhost:3005/editactividad", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formDataact),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Datos actualizados";
        this.Mensaje = " ";
        this.actiActualizar = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.formData.ubicacion = "";
      this.formData.kg = "";
      this.formData.material = "";
      this.formData.actividad = "";
      this.formData.hora = "";
      this.formData.minutos = "";
      this.formData.familias = "";
      this.formData.productos = "";
      this.formData.periodo = "";
      this.opcionSeleccionada = "";
      this.medibles = false;
    },
    limpiarFormularioAdd() {
      this.formDataAdd.fam = "";
      this.formDataAdd.produc = "";
    },
    limpiarselecion() {
      this.formData.kg = "";
      this.formData.familias = "";
      this.formData.productos = "";
    },

    /* SI TIENE DIAS DE CREDITO */
    datoSeleccionado() {
      if (this.opcionSeleccionada === "si") {
        this.formData.unidad = "SI";
        this.medibles = true;
      } else {
        if (this.opcionSeleccionada === "no") {
          this.formData.unidad = "NO";
          this.medibles = false;
          this.limpiarselecion();
          this.mostrarproduc();
        }
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
