<template>
  <v-app>
    <v-container max-width="1200px">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-form class="mt-7" @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="6">
                  <div>
                    <v-row>
                      <h3 class="mt-5" v-show="caja1" style="margin-left: 15px">
                        DATOS DEL SOCIO COMERCIAL:
                      </h3>
                    </v-row>
                    <!-- row 1: nombre, email -->
                    <v-row v-show="caja1">
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="formData.nombre"
                          type="text"
                          label="Nombre completo"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.email"
                          type="email"
                          label="Correo electrónico"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.rfc"
                          type="text"
                          :counter="13"
                          label="RFC o ID FISCAL"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- row 2: rfc,celular, tel,  -->
                    <v-row v-show="caja1">
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="formData.rsocial"
                          type="text"
                          label="DENOMINACIÓN O RAZON SOCIAL"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.movil"
                          type="text"
                          label="Celular"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.tel"
                          type="text"
                          label="Teléfono"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div>
                    <v-row>
                      <h3 class="mt-5" v-show="caja2" style="margin-left: 15px">
                        DIRECCIÓN DEL SOCIO COMERCIAL:
                      </h3>
                    </v-row>
                    <!-- row 5: CPOSTAL, MUNICIPIO, CIUDAD  -->
                    <v-row v-show="caja2">
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.cpostal"
                          type="number"
                          label="CÓDIGO POSTAL"
                          :counter="5"
                          @change="mostrarCP(formData.cpostal)"
                          filled
                          color="red"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.municipio"
                          type="text"
                          label="MUNICIPIO/DELEGACIÓN"
                          filled
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.ciudad"
                          type="text"
                          label="CIUDAD/ESTADO"
                          filled
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-show="coloni"
                          :items="colonias"
                          v-model="formData.colonia"
                          label="COLONIA"
                          filled
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="formData.calle"
                          type="text"
                          label="CALLE, AVENIDA O VÍA"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!-- row 6:  colonia, ninten  -->
                    <v-row v-show="caja2">
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.next"
                          type="text"
                          label="No.EXT"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.ninten"
                          type="text"
                          label="No.INT"
                          filled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    :items="rfiscal"
                    v-model="formData.rfiscal"
                    label="RÉGIMEN FISCAL"
                    filled
                  >
                  </v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <v-select
                    :items="cfdi"
                    v-model="formData.cfdi"
                    label="USO DE CFDI"
                    filled
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    :items="pago"
                    v-model="formData.fpago"
                    label="FORMA DE PAGO"
                    filled
                  >
                  </v-select>
                </v-col>
              </v-row>
              <div>
                <v-row>
                  <h3
                    class="mt-10"
                    v-show="caja3"
                    style="margin-left: 15px; margin-right: 15px"
                  >
                    DEPARTAMENTO DE CONTABILIDAD (Para envío de comprobantes de pago,
                    facturas, estados de cuentay/o aclaraciones):
                  </h3>
                </v-row>
                <v-row v-show="caja3" class="mt-3">
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.cnombre"
                      type="text"
                      label="NOMBRE COMPLETO"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.beneficiario"
                      type="text"
                      label="BENEFICIARIO"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- row 10:  BENEFICIARIO, NOMBANCO -->
                <v-row v-show="caja3">
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.cemail"
                      type="text"
                      label="E-MAIL"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.cmovil"
                      type="text"
                      label="MÓVIL"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.nombanco"
                      type="text"
                      label="NOMBRE DEL BANCO"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.ctel"
                      type="text"
                      label="TEL. Y/O EXTENSIÓN"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- row 11: CLABE, CUENTA -->
                <v-row v-show="caja3">
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.clabe"
                      type="text"
                      label="CLABE INTERBANCARIA"
                      :counter="18"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.cuenta"
                      type="text"
                      label="CUENTA INTERBANCARIA"
                      :counter="18"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="formData.refpago"
                      type="text"
                      label="REFERENCIA DE PAGOS"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <h4>APLICABILIDAD DE CREDITO</h4>
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
                </v-row>
                <!-- row 12: REFPAGO, CREDITO, CDIAS  -->
                <v-row v-show="caja3">
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="formData.cdias"
                      type="text"
                      label="DÍAS DE CREDITO"
                      v-show="dias"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-file-input
                      counter
                      show-size
                      truncate-length="15"
                      filled
                      label="Adjuntar identificación oficial vignte (INE o PASAPORTE)"
                      v-model="formData.ine"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-file-input
                      counter
                      show-size
                      truncate-length="15"
                      filled
                      label="Adjuntar CURP"
                      v-model="formData.curp"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <center>
                  <v-btn class="btnEnviar" type="submit" block outlined color="success"
                    >Enviar</v-btn
                  >
                </center>
              </div>
            </v-form>
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
      caja1: true,
      caja2: true,
      caja3: true,
      datosproveedores: [],
      cfdi: [
        "Adquisición de mercancías",
        "Devoluciones, descuentos o bonificaciones",
        "Gastos en general",
        "Construcciones",
        "Mobiliario y equipo de oficina por inversiones",
        "Equipo de transporte",
        "Equipo de computo y accesorios",
        "Dados, troqueles, moldes, matrices y herramental",
        "Comunicaciones telefónicas",
        "Comunicaciones satelitales",
        "Otra maquinaria y equipo",
        "Honorarios médicos, dentales y gastos hospitalarios",
        "Gastos médicos por incapacidad o discapacidad",
        "Gastos funerales",
        "Donativos",
        "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)",
        "Aportaciones voluntarias al SAR",
        "Primas por seguros de gastos médicos",
        "Gastos de transportación escolar obligatoria",
        "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones",
        "Pagos por servicios educativos (colegiaturas)",
        "Sin efectos fiscales",
        "Pagos",
        "Nómina",
      ],
      pago: ["PUE", "PPD"],
      rfiscal: [
        "General de Ley Personas Morales",
        "Personas Morales con Fines no Lucrativos",
        "Sueldos y Salarios e Ingresos Asimilados a Salarios",
        "Arrendamiento",
        "Demás ingresos",
        "Consolidación",
        "Residentes en el Extranjero sin Establecimiento Permanente en México",
        "Ingresos por Dividendos (socios y accionistas)",
        "Personas Físicas con Actividades Empresariales y Profesionales",
        "Ingresos por intereses",
        "Sin obligaciones fiscales",
        "Sociedades Cooperativas de Producción que optan por diferir sus ingresos",
        "Incorporación Fiscal",
        "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
        "Opcional para Grupos de Sociedades",
        "Coordinados",
        "Hidrocarburos",
        "Régimen de Enajenación o Adquisición de Bienes",
        "De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales",
        "Enajenación de acciones en bolsa de valores",
        "Régimen de los ingresos por obtención de premios",
        "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
        "Régimen Simplificado de Confianza",
      ],
      municipios: [],
      estados: [],
      dias: false,
      insertprove: false,
      proveactualizar: false,
      coloni: false,
      proveedores: ["Ejemplo1", "Ejemplo2", "Ejemplo3"],
      headers: [
        { text: "Número de registro", value: "idusuarioprov" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Móvil", value: "movil" },
        { text: "Télefono", value: "tel" },
        { text: "Código postal", value: "cpostal" },
        { text: "Editar", value: "actions", sortable: false },
      ],
      opcionSeleccionada: "",
      colonias: [],
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
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/proveedores");
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

    /* MOSTRAR DATOS DEL CODIGO POSTAL */
    async mostrarCP(cp) {
      console.log(cp);
      try {
        const res = await fetch(`http://localhost:3001/codigo_postal?cp=${cp}`);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
          this.alerta = true;
          this.Titulo = "¡Upss!";
          this.Mensaje = "El código postal es incorrecto";
        } else {
          if (
            datos.datosback.codigo_postal.colonias &&
            datos.datosback.codigo_postal.municipio &&
            datos.datosback.codigo_postal.estado
          ) {
            this.colonias = datos.datosback.codigo_postal.colonias;
            this.formData.municipio = datos.datosback.codigo_postal.municipio;
            this.formData.ciudad = datos.datosback.codigo_postal.estado;
            this.coloni = true;
            //console.log(datos.datosback.codigo_postal);
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async submitForm() {
      const res = await fetch("http://localhost:3001/insertarUsuariprov", {
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
        if (res.status === 200) {
          this.alerta = true;
          //this.Titulo = "El ID del activo es: ";
          this.Titulo = "DATOS GUARDADOS:";
          this.Mensaje = datos.mensaje;
          this.limpiarFormulario();
        }
      }
      console.log(datos);
    },
    /* ------------------------------------------------------------ */

    /* SI TIENE DIAS DE CREDITO */
    datoSeleccionado() {
      if (this.opcionSeleccionada === "si") {
        this.formData.credito = "SI";
        this.dias = true;
      } else {
        if (this.opcionSeleccionada === "no") {
          this.formData.credito = "NO";
          this.dias = false;
        }
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
        (this.opcionSeleccionada = ""),
        (this.dias = false);
      this.coloni = false;
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
  margin-top: 5px;
  margin-bottom: 5px;
  width: 30%;
  font-size: 20px !important;
}
</style>
