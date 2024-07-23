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
        :items="consumibles"
        :search="search"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 30, 40, 50],
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
      <v-btn icon @click="consu = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="consu" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(consu = false), limpiarFormulario()">
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
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="formData.unidadmedida"
                      :items="unidadesmedida"
                      label="UNIDAD DE MEDIDA"
                      filled
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.tipo"
                      :items="tipoc"
                      label="TIPO DE CONSUMIBLE"
                      filled
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="formData.enteros"
                      type="number"
                      label="KILOS O LITROS"
                      min="1"
                      max="1000"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.fracciones"
                      type="number"
                      label="MILILITROS O GRAMOS"
                      min="1"
                      max="1000"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.oc"
                      type="text"
                      label="ORDEN DE COMPRA"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="prov"
                      v-model="formData.proveedor"
                      label="Proveedor"
                      filled
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.unitario"
                      type="text"
                      prefix="$"
                      label="COSTO UNITARIO"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="DESCRIPCIÓN GENERAL DEL CONSUMIBLE..."
                      clearable
                      style="border: white"
                      v-model="formData.descripcion"
                      filled
                    ></v-textarea>
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
          <v-dialog v-model="consuActualizar" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="consuActualizar = false">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="actualizaracti">
                <!-- row 1: tipo, proveedor, folio OC -->

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
      consumibles: [],
      tipoc: ["PRODUCTOS DE LIMPIEZA", "PAPELERIA", "DE PRODUCCION", "GASOLINA", "GAS", "DISEL", "MANTENIMIENTO", "UNIFORME EPP"],
      unidadesmedida: ["PIEZAS", "LITROS", "KILOS"],
      prov: ["Ejemplo1", "Ejemplo2", "Ejemplo3"],
      search: "",
      consu: false,
      consuActualizar: false,
      headers: [
        { text: "Id del activo", value: "folioActivo" },
        { text: "Unidad de medida", value: "unidadmedida" },
        { text: "Tipo", value: "tipo" },
        {
          text: "Kilos\no\nLitros",
          value: "enteros",
          align: "start", // Alineación del texto
          class: "multi-line-header", // Clase CSS para el estilo
        },
        {
          text: "Kilogramos o Mililitros",
          value: "enteros",
          align: "start", // Alineación del texto
          class: "multi-line-header", // Clase CSS para el estilo
        },
        { text: "Descripción", value: "descripcion" },
        //{ text: "Editar", value: "actions", sortable: false },
      ],

      formData: {
        unidadmedida: "",
        enteros: "",
        fracciones: "",
        tipo: "",
        descripcion: "",
      },

      formDataact: {
        id: "",
        enteros: "",
        fracciones: "",
        tipo: "",
        descripcion: "",
        oc: "",
        proveedor: "",
        unitario:"",
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
        const res = await fetch("http://192.168.1.31:3001/consumibles");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.consumibles = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      const objeto = this.consumibles.find((filtro) => filtro.idconsumible === item);
      this.formDataact = objeto;
      console.log(this.formDataact);
      this.consuActualizar = true;
    },
    /* -------------------------------- */

    /* Enviar formulario de actividades */
    async submitForm() {
      const res = await fetch("http://192.168.1.31:3001/insertarConsumibles", {
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
        this.consu = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------------------------ */

    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const res = await fetch("http://192.168.1.31:3001/actualizarconsu", {
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
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Datos actualizados";
        this.Mensaje = " ";
        this.consuActualizar = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.formData.unidadmedida = "";
      this.formData.enteros = "";
      this.formData.fracciones = "";
      this.formData.tipo = "";
      this.formData.descripcion = "";
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
