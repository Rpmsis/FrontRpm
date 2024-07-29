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
      <v-btn icon @click="(insertprove = true),siguientef()" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="insertprove" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(insertprove=false),siguientef(), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>

              <v-form class="mt-7" @submit.prevent="submitForm">
                <div>
                  <h4 v-show="caja1">DATOS DEL SOCIO COMERCIAL:</h4>
                  <!-- row 1: nombre, email -->
                  <v-row v-show="caja1">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.nombre"
                        type="text"
                        label="Nombre completo"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.email"
                        type="email"
                        label="Correo electrónico"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
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
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.rsocial"
                        type="text"
                        label="DENOMINACIÓN O RAZON SOCIAL"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.movil"
                        type="text"
                        label="Celular"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.tel"
                        type="text"
                        label="Teléfono"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- row 3: rsocial, rfiscal   -->
                  <v-row v-show="caja1">
                    <v-col cols="12" md="4">
                      <v-select
                        :items="rfiscal"
                        v-model="formData.rfiscal"
                        label="RÉGIMEN FISCAL"
                        filled
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="cfdi"
                        v-model="formData.cfdi"
                        label="USO DE CFDI"
                        filled
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="pago"
                        v-model="formData.fpago"
                        label="FORMA DE PAGO"
                        filled
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row v-show="caja1">
                    <v-col cols="12" md="6"></v-col>
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn
                          class="btnEnviar"
                          @click="siguiente()"
                          outlined
                          color="info"
                          >Siguiente</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </div>

                <div>
                  <h4 v-show="caja2">DIRECCIÓN DEL SOCIO COMERCIAL:</h4>
                  <!-- row 5: CPOSTAL, MUNICIPIO, CIUDAD  -->
                  <v-row v-show="caja2">
                    <v-col cols="12" md="2">
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
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.municipio"
                        type="text"
                        label="MUNICIPIO/DELEGACIÓN"
                        filled
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.ciudad"
                        type="text"
                        label="CIUDAD/ESTADO"
                        filled
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
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
                  <!-- row 6:  colonia, ninten  -->
                  <v-row v-show="caja2">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.calle"
                        type="text"
                        label="CALLE, AVENIDA O VÍA"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.next"
                        type="text"
                        label="No.EXT"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.ninten"
                        type="text"
                        label="No.INT"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-show="caja2">
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn class="btnEnviar" @click="atras()" outlined color="red"
                          >Atras</v-btn
                        >
                      </center>
                    </v-col>
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn
                          class="btnEnviar"
                          @click="siguiente2()"
                          outlined
                          color="info"
                          >Siguiente</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </div>

                <div>
                  <!-- row 8:  CNOMBRE, CEMAIL -->
                  <h4 v-show="caja3">
                    DEPARTAMENTO DE CONTABILIDAD (Para envío de comprobantes de pago,
                    facturas, estados de cuentay/o aclaraciones):
                  </h4>
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
                      <h4>APLICABILIDAD DE CREDITO</h4>
                      <v-radio-group v-model="opcionSeleccionada">
                        <v-radio
                          @click="datoSeleccionado()"
                          label="Si"
                          value="si"
                        ></v-radio>
                        <v-radio
                          @click="datoSeleccionado()"
                          label="No"
                          value="no"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
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
                  </v-row>
                  <!-- row 12: REFPAGO, CREDITO, CDIAS  -->
                  <v-row v-show="caja3">
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formData.cdias"
                        type="text"
                        label="DÍAS DE CREDITO"
                        v-show="dias"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row v-show="caja3">
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn class="btnEnviar" @click="atras2()" outlined color="red"
                          >Atras</v-btn
                        >
                      </center>
                    </v-col>
                    <v-col cols="12" md="6"
                      ><center>
                        <v-btn class="btnEnviar" type="submit" outlined color="success"
                          >Enviar</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario actualizar-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="proveactualizar" max-width="1200px">
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
                <div>
                  <h4 v-show="caja1">DATOS DEL SOCIO COMERCIAL:</h4>
                  <!-- row 1: nombre, email -->
                  <v-row v-show="caja1">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataact.nombre"
                        type="text"
                        label="Nombre completo"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.email"
                        type="email"
                        label="Correo electrónico"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.rfc"
                        type="text"
                        :counter="13"
                        label="RFC o ID FISCAL"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- row 2: rfc,celular, tel,  -->
                  <v-row v-show="caja1">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataact.rsocial"
                        type="text"
                        label="DENOMINACIÓN O RAZON SOCIAL"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.movil"
                        type="text"
                        label="Celular"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.tel"
                        type="text"
                        label="Teléfono"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- row 3: rsocial, rfiscal   -->
                  <v-row v-show="caja1">
                    <v-col cols="12" md="4">
                      <v-select
                        :items="rfiscal"
                        v-model="formDataact.rfiscal"
                        label="RÉGIMEN FISCAL"
                        filled
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="cfdi"
                        v-model="formDataact.cfdi"
                        label="USO DE CFDI"
                        filled
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="pago"
                        v-model="formDataact.fpago"
                        label="FORMA DE PAGO"
                        filled
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row v-show="caja1">
                    <v-col cols="12" md="6"></v-col>
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn
                          class="btnEnviar"
                          @click="siguiente()"
                          outlined
                          color="info"
                          >Siguiente</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </div>

                <div>
                  <h4 v-show="caja2">DIRECCIÓN DEL SOCIO COMERCIAL:</h4>
                  <!-- row 5: CPOSTAL, MUNICIPIO, CIUDAD  -->
                  <v-row v-show="caja2">
                    <v-col cols="12" md="2">
                      <v-text-field
                        v-model="formDataact.cpostal"
                        type="number"
                        label="CÓDIGO POSTAL"
                        :counter="5"
                        filled
                        color="red"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.municipio"
                        type="text"
                        label="MUNICIPIO/DELEGACIÓN"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.ciudad"
                        type="text"
                        label="CIUDAD/ESTADO"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formDataact.colonia"
                        type="text"
                        label="COLONIA"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- row 6:  colonia, ninten  -->
                  <v-row v-show="caja2">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataact.calle"
                        type="text"
                        label="CALLE, AVENIDA O VÍA"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.next"
                        type="text"
                        label="No.EXT"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.ninten"
                        type="text"
                        label="No.INT"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-show="caja2">
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn class="btnEnviar" @click="atras()" outlined color="red"
                          >Atras</v-btn
                        >
                      </center>
                    </v-col>
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn
                          class="btnEnviar"
                          @click="siguiente2()"
                          outlined
                          color="info"
                          >Siguiente</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </div>

                <div>
                  <!-- row 8:  CNOMBRE, CEMAIL -->
                  <h4 v-show="caja3">
                    DEPARTAMENTO DE CONTABILIDAD (Para envío de comprobantes de pago,
                    facturas, estados de cuentay/o aclaraciones):
                  </h4>
                  <v-row v-show="caja3" class="mt-3">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataact.cnombre"
                        type="text"
                        label="NOMBRE COMPLETO"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataact.beneficiario"
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
                        v-model="formDataact.cemail"
                        type="text"
                        label="E-MAIL"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.cmovil"
                        type="text"
                        label="MÓVIL"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.nombanco"
                        type="text"
                        label="NOMBRE DEL BANCO"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.ctel"
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
                        v-model="formDataact.credito"
                        type="text"
                        label="APLICABILIDAD DE CREDITO"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.clabe"
                        type="text"
                        label="CLABE INTERBANCARIA"
                        :counter="18"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.cuenta"
                        type="text"
                        label="CUENTA INTERBANCARIA"
                        :counter="18"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.refpago"
                        type="text"
                        label="REFERENCIA DE PAGOS"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- row 12: REFPAGO, CREDITO, CDIAS  -->
                  <v-row v-show="caja3">
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="formDataact.cdias"
                        type="text"
                        label="DÍAS DE CREDITO"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row v-show="caja3">
                    <v-col cols="12" md="6">
                      <center>
                        <v-btn class="btnEnviar" @click="atras2()" outlined color="red"
                          >Atras</v-btn
                        >
                      </center>
                    </v-col>
                    <v-col cols="12" md="6"
                      ><center>
                        <v-btn
                          outlined
                          color="orange"
                          class="btnEnviar"
                          type="submit"
                          >Guardar</v-btn
                        >
                      </center>
                    </v-col>
                  </v-row>
                </div>
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
      caja1: true,
      caja2: false,
      caja3: false,
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
        { text: "Id del activo ", value: "foliorpm" },
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
        idusuarioprov: "",
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
    async siguientef() {
      this.caja1 = true;
      this.caja3 = false;
      this.caja2 = false;
    },
    async siguiente() {
      this.caja1 = false;
      this.caja3 = false;
      this.caja2 = true;
    },
    async siguiente2() {
      this.caja1 = false;
      this.caja3 = true;
      this.caja2 = false;
    },
    async atras() {
      this.caja1 = true;
      this.caja3 = false;
      this.caja2 = false;
    },
    async atras2() {
      this.caja1 = false;
      this.caja3 = false;
      this.caja2 = true;
    },
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://192.168.1.91:3001/Usuarioprov");
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
        const res = await fetch(`http://192.168.1.91:3001/codigo_postal?cp=${cp}`);
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
      const res = await fetch("http://192.168.1.91:3001/insertarProveedor", {
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
          /*  this.alerta = true;
          //this.Titulo = "El ID del activo es: ";
          this.Titulo = "DATOS GUARDADOS:"; */
          this.limpiarFormulario();
          this.siguientef();
          this.mostrar();
        }
      }
      console.log(datos);
    },
    /* ------------------------------------------------------------ */

    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const res = await fetch("http://192.168.1.91:3001/insertarProveedor", {
        method: "POST",
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
  margin-top: 5px;
  margin-bottom: 5px;
  width: 30%;
  font-size: 20px !important;
}
</style>
