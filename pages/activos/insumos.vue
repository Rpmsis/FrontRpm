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
        :items="datosinsumos"
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
                @click="actualizar(item.IdInsumos)"
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
      <v-btn icon @click="insumos = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="insumos" persistent max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(insumos = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-7" @submit.prevent="submitForm">
                <!-- row 1: tipo, proveedor, folio OC -->
                <v-row>
                  <v-col cols="12" md="3">
                    <v-select
                      :items="tipo"
                      v-model="formData.tipoAct"
                      label="Tipo de activo"
                      filled
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="proveedores"
                      v-model="formData.proveedor"
                      label="Proveedor"
                      filled
                      :menu-props="{ bottom: true, offsetY: true, }"
                    >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-text-field v-model="searchProvInsert" placeholder="Search" @input="searchProvedorInsert "></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.folioOC"
                      type="text"
                      label="Folio de orden de compra"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 2: fecha adquisicion, fecha alta, monto, serie -->
                <v-row>
                  <v-col cols="12" md="3">
                    <v-menu
                      v-model="menuAdqui"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fechaAdqui"
                          label="Fecha adquisición"
                          outlined
                          readonly
                          v-on="on"
                          filled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fechaAdqui"
                        :min="fechaMinima"
                        @input="menuAdqui = false"
                        filled
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-menu
                      v-model="menuAlta"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fechaAlta"
                          label="Fecha alta"
                          outlined
                          readonly
                          v-on="on"
                          filled
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fechaAlta"
                        :min="fechaMinima"
                        @input="menuAlta = false"
                        filled
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.monto"
                      prefix="$"
                      label="Monto"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.numserie"
                      type="text"
                      label="Número de serie"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Descripcion -->
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="Descripción"
                      clearable
                      style="border: white"
                      v-model="formData.descrip"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>
                <center>
                  <v-btn class="btnEnviar" type="submit" block outlined color="success">Enviar</v-btn>
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario actualizar-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="insumoActualizar" persistent max-width="800px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(insumoActualizar = false), limpiarFormulario(), mostrar()">
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
                  <v-col cols="12" md="12">
                    <v-select
                      :items="proveedores"
                      v-model="formDataact.proveedor"
                      label="Proveedor"
                      filled
                      :menu-props="{ bottom: true, offsetY: true, }"
                    >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-text-field v-model="searchProvUpdate" placeholder="Search" @input="searchProvedorUpdate "></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                    </v-select>
                  </v-col>
                </v-row>

                <!-- row 2: fecha adquisicion, fecha alta, monto, serie -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formDataact.monto"
                      prefix="$"
                      label="Monto"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formDataact.Numserie"
                      type="text"
                      label="Número de serie"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formDataact.folioOC"
                      type="text"
                      label="Folio de orden de compra"
                      filled
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
      search: "",
      searchProvInsert:"",
      searchProvUpdate:"",
      datosinsumos: [],
      insumos: false,
      insumoActualizar: false,
      proveedores:[],
      provedorFiltrado: [],
      proveedoresFijos: [],
      /* proveedoresFijos: ["Ejemplo1", "Ejemplo2", "Ejemplo3", "Ejemplo4", "Ejemplo5", "Ejemplo6", "Ejemplo7", "Ejemplo8", "Ejemplo9", "Ejemplo10", "Ejemplo11", "Ejemplo12", "Ejemplo13", "Ejemplo14", "Ejemplo15"], */
      menuAlta: false,
      menuAdqui: false,
      fechaAlta: null,
      fechaAdqui: null,
      tipo: [
        "HERRAMIENTA",
        "VEHÍCULOS",
        "MONTACARGAS",
        "MAQUINARIA",
        "EQUIPOS ELECTRONICOS",
        "EQUIPOS DE OFICINA",
      ],
      headers: [
        { text: "Id del activo ", value: "folioInsumos" },
        { text: "Tipo de activo", value: "tipoAct" },
        { text: "Descripción", value: "descrip" },
        { text: "Proveedor", value: "proveedor" },
        { text: "Folio de orden de compra", value: "folioOC" },
        { text: "Monto", value: "monto" },
        { text: "Número de serie", value: "Numserie" },
        { text: "Editar", value: "actions", sortable: false },
      ],
      formData: {
        tipoAct: "",
        falta: "",
        descrip: "",
        proveedor: "",
        folioOC: "",
        monto: "",
        fadqui: "",
        numserie: "",
      },
      formDataact: {
        IdInsumos:"",
        tipoAct: "",
        falta: "",
        descrip: "",
        proveedor: "",
        folioOC: "",
        monto: "",
        fadqui: "",
        Numserie: "",
      },
    };
  },
  mounted() {
    this.fechaAlta = this.fechaMinima;
    this.fechaAdqui = this.fechaMinima;
    this.mostrar();
    this.mostrarProveedores();
    
  },

  computed: {
    fechaMinima() {
      // Obtener la fecha actual
      const fechaAct = new Date();
      const year = fechaAct.getFullYear();
      const month = String(fechaAct.getMonth() + 1).padStart(2, "0");
      const day = String(fechaAct.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    async mostrarProveedores() {
      try {
        const res = await fetch("http://localhost:3001/proveedores");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.proveedoresFijos = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
          this.proveedoresFijos= datos.respuesta.respuesta.map((filtro) => filtro.nombre);
          console.log(this.proveedoresFijos);
          this.proveedores = [...this.proveedoresFijos];
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async searchProvedorInsert(){
      if (!this.searchProvInsert) {
        this.proveedores = this.proveedoresFijos;
      }
      this.proveedores = this.proveedoresFijos.filter((provee) => {
        return provee.toLowerCase().indexOf(this.searchProvInsert.toLowerCase()) > -1;
      });
    },
    async searchProvedorUpdate(){
      if (!this.searchProvUpdate) {
        this.proveedores = this.proveedoresFijos;
      }
      this.proveedores = this.proveedoresFijos.filter((provee) => {
        return provee.toLowerCase().indexOf(this.searchProvUpdate.toLowerCase()) > -1;
      });
    },
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/insumos");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.datosinsumos = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      console.log(item)
      const objeto = this.datosinsumos.find((filtro) => filtro.IdInsumos === item);
      this.formDataact = objeto;
      console.log(this.formDataact);
      this.insumoActualizar = true;
    },
    /* -------------------------------- */
    async submitForm() {
      this.formData.falta = this.fechaAlta;
      this.formData.fadqui = this.fechaAdqui;
      const res = await fetch("http://localhost:3001/insertarInsumos", {
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
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Id del activo:";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
        this.insumos= false;
        this.mostrar();
      }
      console.log(datos);
    },
    /* ------------------------------------------------------------ */

    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const res = await fetch("http://localhost:3001/actualizarInsumos", {
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
        this.insumoActualizar = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.formData.proveedor = "";
      this.formData.folioOC = "";
      this.formData.numserie = "";
      this.fechaAdqui = this.fechaMinima;
      this.fechaAlta = this.fechaMinima;
      this.formData.monto = "";
      this.formData.descrip = "";
      this.formData.tipoAct = "";
      this.searchProvInsert = "";
      this.proveedores = this.proveedoresFijos;
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
</style>
