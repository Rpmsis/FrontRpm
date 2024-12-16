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
          <v-card elevation="24" shaped></v-card>
          <v-card class="mt-7" v-if="datos === true">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="6" sm="6">
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
                <v-col cols="12" md="6" sm="6">
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
          <v-row justify="center" v-if="datos === true">
            <v-col cols="12" md="6" sm="6">
              <v-card class="mx-auto" max-width="344" outlined elevation="24" shaped>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="text-overline mb-4">EFICACIA</div>
                    <v-list-item-title class="text-h5 mb-1">
                      ASIGNADAS
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >Porcentaje de actividades TERMINADAS en el
                      día.</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-avatar
                    style="font-size: 25px"
                    tile
                    size="100"
                    color="orange"
                    >{{ terminadas }}/{{ asignadas }}</v-list-item-avatar
                  >
                </v-list-item>

                <v-card-actions>
                  <v-progress-linear
                    v-model="porcentajeterminadas"
                    height="25"
                    color="orange"
                  >
                    <strong>{{ Math.ceil(porcentajeterminadas) }}%</strong>
                  </v-progress-linear>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-card class="mx-auto" max-width="344" outlined elevation="24" shaped>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="text-overline mb-4">EFICIENCIA</div>
                    <v-list-item-title class="text-h5 mb-1">
                      TERMINADAS
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >Porcentaje de eficiencia de las actividades
                      terminadas.</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-avatar
                    style="font-size: 25px"
                    tile
                    size="80"
                    color="primary"
                    >{{ eficiencia }}%</v-list-item-avatar
                  >
                </v-list-item>

                <v-card-actions>
                  <v-btn outlined rounded text> ACTIVIDADES</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(actividad, index) in actividad"
              :key="index"
              cols="12"
              md="4"
              sm="6"
            >
              <v-card class="mx-auto" max-width="374">
                <v-img
                  height="50"
                  src="https://media.licdn.com/dms/image/v2/D4E22AQFN7GuX8omFNg/feedshare-shrink_800/feedshare-shrink_800/0/1714511284311?e=2147483647&v=beta&t=GOTGOlfhgSZvoy8Es20gJaRw0vd05Kzn3M_QvuXPW14"
                  style="text-align: center; color: #04273f"
                >
                  <h1 style="position: relative; background-color: #f5f5dcb8">
                    ACTIVIDAD
                  </h1>
                </v-img>
                <v-card-text>
                  <div class="my-4 text-subtitle-1">{{ actividad.text }}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <h3>RESPONSABLES:</h3>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <v-data-table
                    :headers="headers2"
                    :items="
                      controlactivi.filter((item) => item.idactividades === actividad.id)
                    "
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                    :items-per-page="10"
                    :sort-desc="true"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        :color="estaTusresponsables(item)"
                        x-small
                        style="color: #000000; font-family: cursive;"
                      >
                      <b>{{ tituloresponsables(item) }}</b>
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>

                <v-card-actions> </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
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
      barraeficacia: 50,
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
        { text: "Id responsable", value: "idcontrolactivi" },
        { text: "Nombre", value: "responsables" },
        { text: "Actividad", value: "actividad" },
        { text: "ID DE USUARIO", value: "idcheck" },
        { text: "Estatus", value: "estatusC" },
      ],
      headers2: [
        { text: "Nombre", value: "responsables" },
        { text: "Estatus", value: "actions" },
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

      asignadas: 0,
      porcentajeterminadas: 0,
      terminadas: 0,
      eficiencia: 0,
    };
  },
  mounted() {
    this.socket = io("http://localhost:3004");
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
        const res = await fetch("http://localhost:3005/Controlasignados/" + this.Nombre, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos);
          this.controlactivi= [];
          const nuevocontrol = datos.result;

          // Definir el orden de los estatus
          const ordenEstatus = ["INICIAR", "EN PAUSA", "EN PROCESO", "TERMINADO"];

          // Ordenar los datos antes de agregar a nuevocontrol
          nuevocontrol.forEach((datos) => {
            // Agregar los datos al arreglo, ordenados por el estatus
            const estatusIndex = ordenEstatus.indexOf(datos.estatusC);
            if (estatusIndex !== -1) {
              this.controlactivi.push({ ...datos, estatusIndex });
            }
          });
          console.log("sort",this.controlactivi);

          // Ordenar nuevocontrol por el índice del estatus
          this.controlactivi.sort((a, b) => a.estatusIndex - b.estatusIndex);
          
          // Eliminar el campo 'estatusIndex' después de ordenar
          this.controlactivi.forEach((datos) => {
            delete datos.estatusIndex;
          });

          this.terminadas = datos.terminadas;

          //console.log(this.controlactivi);
          //console.log(this.actividad);
          this.actividad.forEach((datos) => {});
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Insertar actividad a la tabla de controlactivi con el resposable correspondiente */
    async submitForm() {
      if (this.datoNuevo.idactividades === "" && this.datoNuevo.responsables === "") {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
      } else {
        this.datoNuevo.idchecksupervisor = this.Nombre.trimEnd();
        const idAsig = this.actividad.find(
          (filtro) => filtro.id === this.datoNuevo.idactividades
        );
        console.log(idAsig.idasigactivi);
        this.datoNuevo.idasigactivi = idAsig.idasigactivi;
        const res = await fetch("http://localhost:3005/insertarControl", {
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
      }

      //console.log(datos.respuestaMante.mensaje);
    },

    async Buscar() {
      if (this.Nombre === "") {
        return false;
      } else {
        const res = await fetch(
          "http://localhost:3005/buscar_Supervisor/" + this.Nombre,
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
          this.Mensaje = dato.mensaje;
          this.datos = false;
        } else {
          this.datos = true;
          //console.log("Actividades: ", dato.actividades.respuesta);
          this.actividad = dato.actividades.respuesta.map((filtro) => ({
            id: filtro.idactividades,
            text: filtro.actividad,
            idasigactivi: filtro.idasigactivi,
          }));
          //console.log("Responsables", dato.responsables.respuesta);
          this.operadores = dato.responsables.respuesta.map((filtro) => ({
            id: filtro.idPMD,
            text: filtro.Nombre,
          }));
          //console.log("Asignadas", dato.asignadas);
          this.asignadas = dato.asignadas;
          this.mostrarControl();
          //console.log("Controlactividades: ",this.controlactivi);
        }
        //console.log(dato.results3)
      }
    },

    /* Limpiar formulario de agendar */
    limpiarFormulario() {
      (this.datoNuevo.responsables = ""), (this.datoNuevo.idactividades = "");
    },

    /* Cambiar de color el estatus */
    estaTusresponsables(item) {
      //console.log("EstatusC: ", item.estatusC);
      if (item.estatusC === "INICIAR") {
        return "#09bfc5"; // Clase CSS para destacar la fila
      }
      if (item.estatusC === "EN PROCESO") {
        return "rgb(8,243,5)"; // Clase CSS para destacar la fila
      }
      if (item.estatusC === "EN PAUSA") {
        return "red"; // Clase CSS para destacar la fila
      }
      if (item.estatusC === "TERMINADO") {
        return "#ddd000"; // Clase CSS para destacar la fila
      }
    },
    tituloresponsables(item) {
      //console.log("EstatusC: ", item.estatusC);
      if (item.estatusC === "INICIAR") {
        return "SIN INICIAR"; // Clase CSS para destacar la fila
      }
      if (item.estatusC === "EN PROCESO") {
        return "EN PROCESO"; // Clase CSS para destacar la fila
      }
      if (item.estatusC === "EN PAUSA") {
        return "EN PAUSA"; // Clase CSS para destacar la fila
      }
      if (item.estatusC === "TERMINADO") {
        return "TERMINADO"; // Clase CSS para destacar la fila
      }
    },

    estatusasig(item) {
      console.log("EstatusA: ", item.estatusA);
      if (item.estatusA === "INICIAR") {
        return "green"; // Clase CSS para destacar la fila
      }
      if (item.estatusA === "EN PAUSA") {
        return "red"; // Clase CSS para destacar la fila
      }
      if (item.estatusA === "TERMINADO") {
        return "#ddd000"; // Clase CSS para destacar la fila
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

.row {
  margin: 0px !important;
}
.glosarioestatus {
  position: fixed;
  z-index: 1;
  left: 0px;
  bottom: 0px;
}

/* Inicialmente, el componente es visible */
.fade-up-effect {
  opacity: 0;
  transform: translateY(10px); /* Comienza 50px más abajo */
  animation: fadeUp 50s infinite;
  background-color: #09bfc5;
  text-align: center;
  writing-mode: vertical-rl;
  text-orientation: upright;
  padding: 2px;
  border-radius: 15px 15px 0px 0px;
  margin-left: 5px;
}

/* Animación para hacer que el texto se desplace de abajo hacia arriba y se desvanezca */
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(50px); /* Empieza fuera de la vista */
  }
  40% {
    opacity: 1;
    transform: translateY(0); /* Llega a la posición normal */
  }
  60% {
    opacity: 0;
    transform: translateY(50px); /* Se desplaza hacia abajo */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Regresa a la posición normal */
  }
}

/* Asegura que el v-app ocupe toda la altura de la pantalla */
.v-application {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hace que el v-main ocupe el espacio disponible */
.v-main {
  flex: 1;
}
</style>
