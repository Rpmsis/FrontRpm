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
                color="yellow"
                dark
                v-bind="attrs"
                v-on="on"
                @click="compra(item.idconsumibles)"
                medium
                class="mr-4"
              >
                mdi-currency-usd
              </v-icon>
            </template>
            <span>Compra</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-btn icon @click="consu = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="consu" max-width="600px">
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
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.tipo"
                      :items="tipoc"
                      label="TIPO DE CONSUMIBLE"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.unidadmedida"
                      :items="unidadesmedida"
                      label="UNIDAD DE MEDIDA"
                      filled
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      type="text"
                      label="DESCRIPCIÓN GENERAL DEL CONSUMIBLE..."
                      clearable
                      v-model="formData.descripcion"
                      filled
                      @input="formData.descripcion = formData.descripcion.toUpperCase()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-col cols="12" md="2" v-show="kilomg">
                    <v-text-field
                      v-model="formData.enteros"
                      type="number"
                      label="KILOS O LITROS"
                      min="1"
                      max="1000"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" v-show="kilomg">
                    <v-text-field
                      v-model="formData.fracciones"
                      type="number"
                      label="MILILITROS O GRAMOS"
                      min="1"
                      max="1000"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" v-show="numpiezas">
                    <v-text-field
                      v-model="formData.canestandar"
                      type="number"
                      label="NUM. PIEZAS"
                      min="1"
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
                      v-model="formData.costo"
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
                </v-row> -->
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

      <!-- Formulario compra-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="consucompra" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(consucompra = false), limpiarFormularioCompra()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="insertCompra">
                <v-row>
                  <v-col cols="12" md="8">
                    <h2>ID del activo:</h2>
                    <center>
                      <h4 style="font-size: 35px; color: chocolate">
                        {{ formDataact.folioActivo }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      type="text"
                      label="CÓDIGO DE BARRAS"
                      clearable
                      v-model="formData.codigobarras"
                       @input="formData.codigobarras = formData.codigobarras.toUpperCase()"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="prov"
                      v-model="formData.proveedor"
                      label="PROVEEDOR"
                      filled
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.oc"
                      type="text"
                      label="ORDEN DE COMPRA"
                      @input="formData.oc = formData.oc.toUpperCase()"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="formData.cantidad"
                      type="text"
                      label="CANTIDAD"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="formData.costo"
                      type="text"
                      prefix="$"
                      label="PRECIO COMPRA"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="formData.descrip"
                      type="text"
                      label="DESCRIPCIÓN DE LA COMPRA.."
                      @input="formData.descrip = formData.descrip.toUpperCase()"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <center>
                  <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                    >Registrar compra</v-btn
                  >
                </center>
              </v-form>
              <hr class="mt-7" />
              <v-data-table
                :headers="headers2"
                :items="compras"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 30, 40, 50],
                }"
                :items-per-page="5"
                :sort-by="['idcompras']"
                :sort-desc="true"
              >
              </v-data-table>
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
      numpiezas: false,
      kilomg: false,
      Mensaje: "",
      Titulo: "",
      consumibles: [],
      todaslascompras: [],
      compras: [],
      tipoc: [
        "PRODUCTOS DE LIMPIEZA",
        "PAPELERIA",
        "COSUMIBLE DE PRODUCCION",
        "GASOLINA",
        "GAS",
        "DISEL",
        "CONSUMIBLE DE MANTENIMIENTO",
        "UNIFORME",
        "EQUIPO DE PROTECCIÓN PERSONAL",
        "PINTURAS Y SOLVENTES",
        "FERRETERIA",
        "SOLDADURA Y CORTE",
        "ACEITES",
      ],
      unidadesmedida: ["PIEZAS", "LITROS", "KILOS"],
      prov: ["Ejemplo1", "Ejemplo2", "Ejemplo3"],
      search: "",
      consu: false,
      consucompra: false,
      headers: [
        { text: "Id del activo", value: "folioActivo" },
        {
          text: "Fecha\ncreación",
          value: "fecha",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Descripción", value: "descripcion" },
        { text: "Tipo", value: "tipo" },
        {
          text: "Unidad\nde\nmedida",
          value: "unidadmedida",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Cantidad", value: "cantidad" },
        {
          text: "Costo\nunitario\nactual",
          value: "costo",
          align: "star",
          class: "multi-line-header",
        },
        {
          text: "Registrar\ncompra",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],
      headers2: [
        { text: "Id del activo", value: "folioActivo" },
        {
          text: "Fecha\nde\ncompra",
          value: "fecha",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Proveedor", value: "proveedor" },
        { text: "Orden de compra", value: "oc" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Costo unitario", value: "costo" },
        { text: "Descripción", value: "descrip" },
      ],

      formData: {
        idconsumibles: "",
        folioActivo: "",
        unidadmedida: "",
        tipo: "",
        descripcion: "",
        cantidad: "",
        oc: "",
        proveedor: "",
        costo: "",
        codigobarras: "",
        descrip: "",
      },

      formDataact: {
        idconsumibles: "",
        folioActivo: "",
        unidadmedida: "",
        tipo: "",
        descripcion: "",
        cantidad: "",
        oc: "",
        proveedor: "",
        costo: "",
        codigobarras: "",
        descrip: "",
      },
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla consumibles*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/consumibles");
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

    /* Mostrar los datos de la tabla compras*/
    async mostrarCompras(folio) {
      try {
        const res = await fetch(`http://localhost:3001/compras?compra=${folio}`);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.compras = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de comprad */
    async compra(item) {
      console.log(item);
      const objeto = this.consumibles.find((filtro) => filtro.idconsumibles === item);
      this.formDataact = objeto;
      console.log(this.formDataact);
      this.consucompra = true;
      this.formData.folioActivo = this.formDataact.folioActivo;
      this.formData.idconsumibles = this.formDataact.idconsumibles;
      this.formData.codigobarras = this.formDataact.codigobarras;
      this.mostrarCompras(this.formDataact.folioActivo);
    },
    /* -------------------------------- */

    /* Enviar formulario de actividades */
    async submitForm() {
      const res = await fetch("http://localhost:3001/insertarConsumibles", {
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
    async insertCompra() {
      const res = await fetch("http://localhost:3001/insertarCompra", {
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
        this.Titulo = "Compra registrada";
        this.Mensaje = " ";
        this.limpiarFormularioCompra();
        this.mostrarCompras(datos.mensaje);
        this.mostrar();
        this.consucompra = false;
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.formData.unidadmedida = "";
      this.formData.tipo = "";
      this.formData.descripcion = "";
    },
    limpiarFormularioCompra() {
      this.formData.codigobarras = "";
      this.formData.proveedor = "";
      this.formData.oc = "";
      this.formData.cantidad = "";
      this.formData.costo = "";
      this.formData.descrip = "";
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
