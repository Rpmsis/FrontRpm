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
          'items-per-page-options': [5,10, 20, 30, 40, 50],
        }"
        :items-per-page="5"
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
                @click="actualizar(item.idactividades)"
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
      <v-btn icon @click="acti = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="acti" max-width="1200px">
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
                <!-- row 1: tipo, proveedor, folio OC -->
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="formData.actividad"
                      type="text"
                      label="ACTIVIDAD"
                    ></v-text-field>
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
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.ubicacion"
                      :items="ubicaciones"
                      label="UBICACIÓN DONDE SE REALIZA.."
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.material"
                      :items="materiales"
                      label="MATERIAL"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.kg"
                      type="number"
                      min="1"
                      prefix="Kg"
                      label="KILOS"
                    ></v-text-field>
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
      </template>

      <!-- Formulario actualizar-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="actiActualizar" max-width="1200px">
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
                <!-- row 1: tipo, proveedor, folio OC -->
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="formDataact.actividad"
                      type="text"
                      label="* ACTIVIDAD"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="formDataact.hora"
                      type="number"
                      label="* HORA"
                      min="1"
                      max="24"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="formDataact.minutos"
                      type="number"
                      label="* MINUTOS"
                      min="1"
                      max="60"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formDataact.ubicacion"
                      :items="ubicaciones"
                      label="* UBICACIÓN"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formDataact.material"
                      :items="materiales"
                      label="* MATERIAL"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formDataact.kg"
                      type="text"
                      label="* KILOS"
                    ></v-text-field>
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
      materiales: [
        "ALMACÉN 1",
        "TEJOS 316",
        "ALUMINIO PERFIL PEDACERIA",
        "BRONCE",
        "NAVE 2",
        "SCRAP 400",
        "ALEACIONES",
        "REBABA 316",
        "304",
      ],
      headers: [
        { text: "Id actividad", value: "idactividades" },
        { text: "Actividad", value: "actividad" },
        { text: "Fecha creación", value: "fecha" },
        {
          text: "Tiempo estandar\nen MINUTOS",
          value: "timestandar",
          align: "start", // Alineación del texto
          class: "multi-line-header", // Clase CSS para el estilo
        },
        { text: "Kilogramos", value: "kg" },
        { text: "Material", value: "material" },
        { text: "Ubicación", value: "ubicacion" },
        { text: "Editar", value: "actions", sortable: false },
      ],

      formData: {
        ubicacion: "",
        hora: "",
        minutos: "",
        kg: "",
        material: "",
        actividad: "",
      },

      formDataact: {
        idactividades: "",
        ubicacion: "",
        hora: "",
        minutos: "",
        kg: "",
        material: "",
        actividad: "",
      },
    };
  },
  mounted() {
    this.mostrarubi();
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar ubicación */
    async mostrarubi() {
      try {
        const res = await fetch("http://192.168.1.105:3001/ubicacion");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.ubicaciones = datos.respuesta.respuesta;
          this.ubicaciones = datos.respuesta.respuesta.map((ubi) => [ubi.descrip]);
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://192.168.1.105:3001/actividades");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.actividad = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      const objeto = this.actividad.find((filtro) => filtro.idactividades === item);
      this.formDataact = objeto;
      console.log(this.formDataact);
      this.actiActualizar = true;
    },
    /* -------------------------------- */

    /* Enviar formulario de actividades */
    async submitForm() {
      const res = await fetch("http://192.168.1.105:3001/insertarActif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        this.Titulo = "El ID del activo es: ";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
        this.acti = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------------------------ */

    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const res = await fetch("http://192.168.1.105:3001/actualizaractivi", {
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
