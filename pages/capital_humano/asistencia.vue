<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
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
            :items="asistencia"
            :search="search"
            :footer-props="{
              'items-per-page-options': [10, 20, 30, 40, 50],
            }"
            :items-per-page="10"
          >
            <template v-slot:item.concatenado="{ item }">
              <v-btn
                :color="categorias(item)"
                style="margin-top: 10px; margin-bottom: 10px; border-radius: 20px"
                >{{ item.estatus }}</v-btn
              >
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip
                bottom
                v-if="
                  item.estatus === 'RETARDO' ||
                  item.estatus === 'ENTRADA'
                "
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="white"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="actualizar(item.idasistencia, item.horafin)"
                    small
                    class="mr-2"
                  >
                    mdi-badge-account-outline
                  </v-icon>
                </template>
                <span>Visualizar</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mt-5">
          <v-card-title>
            <v-text-field
              v-model="search2"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers2"
            :items="faltas"
            :search="search2"
            :footer-props="{
              'items-per-page-options': [10, 20, 30, 40, 50],
            }"
            :items-per-page="10"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="white"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="actualizar2(item.idcheck)"
                    small
                    class="mr-2"
                  >
                    mdi-badge-account-outline
                  </v-icon>
                </template>
                <span>Visualizar</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Formulario actualizar asistencia-->
    <template>
      <div class="pa-4 text-center">
        <v-dialog v-model="asisActualizar" persistent max-width="400px">
          <v-card style="padding: 15px">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="(asisActualizar = false), limpiarFormulario()">
                <v-icon style="font-size: 30px"
                  >mdi-close theme--dark red--text</v-icon
                ></v-btn
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-form class="mt-5" @submit.prevent="actualizarAsistencia">
              <!-- row 1: tipo, proveedor, folio OC -->
              <v-row>
                <v-col cols="12" md="12">
                  <v-select
                    :items="motivos"
                    v-model="formDataact.estatus"
                    label="Tipo de activo"
                    filled
                    @change="mostrararea"
                  >
                  </v-select>
                </v-col>
                <v-col v-show="explicacion" cols="12" md="12">
                  <v-textarea
                    v-model="formDataact.motivo"
                    type="text"
                    label="* Describe el motivo..."
                  ></v-textarea>
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
    </template>

    <!-- Formulario actualizar falta-->
    <template>
      <div class="pa-4 text-center">
        <v-dialog v-model="faltaActualizar" persistent max-width="400px">
          <v-card style="padding: 15px">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="(faltaActualizar = false), limpiarFormulario2()">
                <v-icon style="font-size: 30px"
                  >mdi-close theme--dark red--text</v-icon
                ></v-btn
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-form class="mt-5" @submit.prevent="actualizarFalta">
              <!-- row 1: tipo, proveedor, folio OC -->
              <v-row>
                <v-col cols="12" md="12">
                  <v-select
                    :items="motivos2"
                    v-model="formDataact2.estatus"
                    label="Tipo de activo"
                    filled
                    @change="mostrararea2"
                  >
                  </v-select>
                </v-col>
                <v-col v-show="explicacion2" cols="12" md="12">
                  <v-textarea
                    v-model="formDataact2.motivo"
                    type="text"
                    label="* Describe el motivo..."
                  ></v-textarea>
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
    </template>

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
      search: "",
      search2: "",
      registrar: false,
      asistencia: [],
      faltas: [],
      asisActualizar: false,
      faltaActualizar: false,
      explicacion: false,
      explicacion2: false,
      motivos: ["ASISTENCIA", "SALIR TEMPRANO"],
      motivos2: ["FALTA", "JUSTIFICAR"],
      headers: [
        { text: "id de asistencia ", value: "idasistencia" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Fecha de asistencia", value: "fecha" },
        { text: "Hora de entrada", value: "horainicio" },
        { text: "Hora de salida", value: "horafin" },
        { text: "Estatus", value: "concatenado" },
        {
          text: "Editar asistencia",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],

      headers2: [
        { text: "Nombre completo", value: "nombre" },
        {
          text: "Verificar falta",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],
      formDataact: {
        idasistencia: "",
        estatus: "",
        motivo: "",
        hora: "",
      },
      formDataact2: {
        userid: "",
        estatus: "",
        motivo: "",
      },
    };
  },

  mounted() {
    this.socket = io("http://localhost:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
      this.mostrarFaltas();
    });
    this.mostrar();
    this.mostrarFaltas();
  },
  methods: {
    /* Solo falta renombrar y colocar los metodos correspondientes para registrar la falta o el justificante */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/asistencias");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.respuesta.respuesta);
          this.asistencia = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async mostrarFaltas() {
      try {
        const res = await fetch("http://localhost:3001/faltas");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.respuesta);
          this.faltas = datos.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    mostrararea() {
      if (this.formDataact.estatus === "SALIR TEMPRANO") {
        this.explicacion = true;
      } else {
        this.explicacion = false;
        this.formDataact.motivo = "";
      }
    },
    async actualizar(item, hora) {
      /* const objeto = this.actividad.find((filtro) => filtro.idactividades === item);
      this.formDataact = objeto; */
      //console.log(this.formDataact);
      this.formDataact.idasistencia = item;
      this.formDataact.hora = hora;
      this.asisActualizar = true;
    },
    /* Api que actualiza los datos  de la tabla */
    async actualizarAsistencia() {
      const res = await fetch("http://localhost:3001/actualizarAsistencia", {
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
        this.asisActualizar = false;
        this.limpiarFormulario();
        this.mostrar();
      }
    },
    /* ------------------------------------------ */
    limpiarFormulario() {
      this.explicacion = false;
      this.formDataact.estatus = "";
      this.formDataact.motivo = "";
    },

    mostrararea2() {
      if (this.formDataact2.estatus === "JUSTIFICAR") {
        this.explicacion2 = true;
      } else {
        this.explicacion2 = false;
        this.formDataact2.motivo = "";
      }
    },
    limpiarFormulario2() {
      this.formDataact2.userid = "";
      this.formDataact2.estatus = "";
      this.formDataact2.motivo = "";
      this.explicacion2 = false;
    },
    async actualizar2(item) {
      /* const objeto = this.actividad.find((filtro) => filtro.idactividades === item);
      this.formDataact = objeto; */
      //console.log(this.formDataact);
      this.formDataact2.userid = item;
      this.faltaActualizar = true;
    },
    /* Api que actualiza los datos  de la tabla */
    async actualizarFalta() {
      const res = await fetch("http://localhost:3001/insertarAsistencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formDataact2),
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
        this.faltaActualizar = false;
        this.limpiarFormulario2();
        this.mostrar();
        this.mostrarFaltas();
      }
    },
    /* ------------------------------------------ */
    categorias(item) {
      console.log(item.estatus);
      if (item.estatus === "FALTA") {
        return "rgb(170, 35, 11)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "RETARDO") {
        return "rgb(83, 36, 83)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "JUSTIFICADO") {
        return "rgb(177, 189, 16)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "ASISTENCIA") {
        return "rgb(14, 124, 14)"; // Clase CSS para destacar la fila
      }
      if (item.estatus === "SALIR TEMPRANO") {
        return "rgb(20, 22, 117)"; // Clase CSS para destacar la fila
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
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
  font-size: 20px !important;
}
</style>
