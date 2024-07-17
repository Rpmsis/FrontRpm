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
        :items="datosproveedores"
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
                @click="actualizar(item.idproveedor)"
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
      <v-btn icon @click="insertprove = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="insertprove" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(insertprove = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-7" @submit.prevent="submitForm">
                <!-- row 1: nombre, email -->
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="formData.nombre"
                      type="text"
                      label="Nombre completo"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.email"
                      type="email"
                      label="Correo electrónico"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 2: rfc,celular, tel,  -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.rfc"
                      type="text"
                      label="RFC o ID FISCAL"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.movil"
                      type="text"
                      label="Celular"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.tel"
                      type="text"
                      label="Teléfono"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 3: rsocial, rfiscal   -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.rsocial"
                      type="text"
                      label="DENOMINACIÓN O RAZON SOCIAL"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.rfiscal"
                      type="text"
                      label="RÉGIMEN FISCAL"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 4:  cdfi, fpago  -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="cfdi"
                      v-model="formData.formData.cfdi"
                      label="USO DE CFDI"
                      filled
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="pago"
                      v-model="formData.fpago"
                      label="FORMA DE PAGO"
                      filled
                    >
                    </v-select>
                  </v-col>
                </v-row>

                <!-- row 5:  calle, next  -->
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="formData.calle"
                      type="text"
                      label="CALL, AVENIDA O VÍA"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.next"
                      type="text"
                      label="No.EXT"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 6:  colonia, ninten  -->
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="formData.colonia"
                      type="text"
                      label="COLONIA"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.ninten"
                      type="text"
                      label="No.INT"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 7:    -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="municipio"
                      v-model="formData.municipio"
                      label="MUNICIPIO/DELEGACIÓN"
                      filled
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <center>
                  <v-btn class="btnEnviar" type="submit" block outlined color="success"
                    >Enviar</v-btn
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
          <v-dialog v-model="proveactualizar" max-width="800px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="proveactualizar = false">
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
                    >
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
      datosproveedores: [],
      insertprove: false,
      proveactualizar: false,
      proveedores: ["Ejemplo1", "Ejemplo2", "Ejemplo3"],
      headers: [
        { text: "Id del activo ", value: "folioInsumos" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Editar", value: "actions", sortable: false },
      ],
      formData: {
        nombre: "",
        email: "",
        movil: "",
        tel: "",
        rsocial: "",
        rfc: "",
        rfiscal: "",
        cfdi: "",
        fpago: "",
        calle: "",
        next: "",
        colonia: "",
        ninten: "",
        municipio: "",
        ciudad: "",
        cpostal: "",
        cnombre: "",
        cemail: "",
        cmovil: "",
        ctel: "",
        beneficiario: "",
        nombanco: "",
        clabe: "",
        cuenta: "",
        refpago: "",
        credito: "",
        cdias: "",
      },
      formDataact: {
        idproveedor: "",
        nombre: "",
        email: "",
        movil: "",
        tel: "",
        rsocial: "",
        rfc: "",
        rfiscal: "",
        cfdi: "",
        fpago: "",
        calle: "",
        next: "",
        colonia: "",
        ninten: "",
        municipio: "",
        ciudad: "",
        cpostal: "",
        cnombre: "",
        cemail: "",
        cmovil: "",
        ctel: "",
        beneficiario: "",
        nombanco: "",
        clabe: "",
        cuenta: "",
        refpago: "",
        credito: "",
        cdias: "",
      },
    };
  },
  mounted() {
    this.fechaAlta = this.fechaMinima;
    this.fechaAdqui = this.fechaMinima;
    this.mostrar();
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
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://192.168.1.105:3001/proveedores");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.datosproveedores = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      console.log(item);
      const objeto = this.datosproveedores.find((filtro) => filtro.idproveedor === item);
      this.formDataact = objeto;
      console.log(this.formDataact);
      this.proveactualizar = true;
    },
    /* -------------------------------- */
    async submitForm() {
      this.formData.falta = this.fechaAlta;
      this.formData.fadqui = this.fechaAdqui;
      const res = await fetch("http://192.168.1.105:3001/insertarProveedor", {
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
        this.datosproveedores = false;
        this.mostrar();
      }
      console.log(datos);
    },
    /* ------------------------------------------------------------ */

    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const res = await fetch("http://192.168.1.105:3001/actualizarInsumos", {
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
        this.proveactualizar = false;
        this.mostrar();
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      (this.formData.nombre = ""),
        (this.formData.email = ""),
        (this.formData.movil = ""),
        (this.formData.tel = ""),
        (this.formData.rsocial = ""),
        (this.formData.rfc = ""),
        (this.formData.rfiscal = ""),
        (this.formData.cfdi = ""),
        (this.formData.fpago = ""),
        (this.formData.calle = ""),
        (this.formData.next = ""),
        (this.formData.colonia = ""),
        (this.formData.ninten = ""),
        (this.formData.municipio = ""),
        (this.formData.ciudad = ""),
        (this.formData.cpostal = ""),
        (this.formData.cnombre = ""),
        (this.formData.cemail = ""),
        (this.formData.cmovil = ""),
        (this.formData.ctel = ""),
        (this.formData.beneficiario = ""),
        (this.formData.nombanco = ""),
        (this.formData.clabe = ""),
        (this.formData.cuenta = ""),
        (this.formData.refpago = ""),
        (this.formData.credito = ""),
        (this.formData.cdias = "");
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
