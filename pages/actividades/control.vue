<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="mt-7"
            ><v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-title>
                  <v-text-field
                    v-model="Nombre"
                    type="password"
                    append-icon="mdi-magnify"
                    label="Buscar supervisor"
                    @input="Buscar"
                  ></v-text-field>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mt-7" v-if="datos === true">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="datoNuevo.responsables"
                    :items="operadores"
                    item-value="id"
                    item-text="text"
                    label="RESPONSABLE"
                    filled
                    :menu-props="{ top: true, offsetY: true, maxHeight: '150px' }"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="datoNuevo.idactividades"
                    :items="actividad"
                    item-value="id"
                    item-text="text"
                    label="ACTIVIDAD"
                    filled
                    :menu-props="{ top: true, offsetY: true, maxHeight: '150px' }"
                  ></v-select>
                </v-col>
              </v-row>
              <center>
                <v-btn class="btnEnviar" type="submit" color="success" block
                  >Agendar</v-btn
                >
              </center>
            </v-form>
          </v-card>
          <v-card class="mt-5" style="padding: 10px" v-if="datos === true">
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
            </v-data-table>
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
import io from "socket.io-client";

export default {
  layout: "barra",
  data() {
    return {
      alerta2: false,
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      operadores: [],
      actividad: [],
      controlactivi: [],
      Nombre: "",
      datos: false,
      headers: [
        { text: "Id control", value: "idcontrolactivi" },
        { text: "Responsable", value: "responsables" },
        { text: "Actividad", value: "actividad" },
        { text: "ID DE USUARIO", value: "idcheck" },
        { text: "Estatus", value: "estatusC" },
      ],
      datoNuevo: {
        responsables: "",
        idactividades: "",
        idasigactivi: "",
        idcontrolactivi: "",
        status: "",
        motivoselec: "",
        motivodes: "",
        idchecksupervisor: "",
      },
    };
  },
  mounted() {
    this.socket = io("http://192.168.1.180:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.Buscar();
      this.mostrarControl();
    }); 
  },

  computed: {},
  methods: {

    /* Mostrar Tabla de control */
    async mostrarControl() {
      try {
        const res = await fetch("http://localhost:3001/Controlasignados/"+ this.Nombre,{
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
          });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.result);
          this.controlactivi = datos.result;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Insertar actividad a la tabla de controlactivi con el resposable correspondiente */
    async submitForm() {
      this.datoNuevo.idchecksupervisor= this.Nombre;
      const idAsig = this.actividad.find(
        (filtro) => filtro.id === this.datoNuevo.idactividades
      );
      //console.log(idAsig.idasigactivi);
      this.datoNuevo.idasigactivi = idAsig.idasigactivi;
      const res = await fetch("http://localhost:3001/insertarControl", {
        method: "POST",
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
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.limpiarFormulario();
        this.mostrarControl();
      }
      //console.log(datos.respuestaMante.mensaje);
    },

    async Buscar() {
      if (this.Nombre === "") {
        return false;
      } else {
        const res = await fetch(
          "http://localhost:3001/buscar_Supervisor/" + this.Nombre,
          {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
          }
        );
        const dato = await res.json();
        //console.log(dato.mensaje);
        if (res.status === 400) {
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
      }
        //console.log(dato.results3)
      }
    },

    /* Limpiar formulario de agendar */
    limpiarFormulario() {
      (this.datoNuevo.responsables = ""), (this.datoNuevo.idactividades = "");
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
