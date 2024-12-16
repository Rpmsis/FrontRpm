<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-row>
          <v-col cols="12" md="8" sm="8">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="4">
            <v-select
              v-model="sucursal"
              :items="sucursales"
              label="Selecciona una sucursal"
              filled
              @change="mostrar()"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="consumibles"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
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
                @click="compra(item)"
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

      <!-- Formulario insertar CONSUMIBLE -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="consu" max-width="800px" persistent>
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
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.tipo"
                      :items="tipoc"
                      label="TIPO DE CONSUMIBLE"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.unidadmedida"
                      :items="unidadesmedida"
                      label="UNIDAD DE MEDIDA"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      type="number"
                      label="MINIMO DE PRODUCTOS"
                      v-model="formData.minimo"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      type="text"
                      label="DESCRIPCIÓN GENERAL DEL CONSUMIBLE..."
                      v-model="formData.descripcion"
                      filled
                      @input="formData.descripcion = formData.descripcion.toUpperCase()"
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

      <!-- Formulario compra-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="consucompra" max-width="1200px" persistent>
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
                  <v-col cols="12" md="4" sm="4">
                    <h2>ID del activo:</h2>
                    <center>
                      <h4 style="font-size: 35px; color: chocolate">
                        {{ formData.folioActivo }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4" sm="4">
                    <v-select
                      v-model="sucursal"
                      :items="sucursales"
                      label="Selecciona una sucursal"
                      filled
                      @change="mostrar(), mostrarCompras(folio)"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4" sm="4">
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
                  <v-col cols="12" md="1">
                    <v-btn icon @click="insertprove = true">
                      <v-icon style="font-size: 50px"
                        >mdi-plus-circle theme--dark green--text</v-icon
                      >
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="proveedores"
                      v-model="formData.proveedor"
                      label="Proveedor"
                      filled
                      :menu-props="{ bottom: true, offsetY: true }"
                    >
                      <template v-slot:prepend-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-text-field
                              v-model="searchProvInsert"
                              placeholder="Search"
                              @input="searchProvedorInsert"
                            ></v-text-field>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="3">
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
                <template v-slot:item.actions1="{ item }">
                  <v-tooltip bottom v-if="item.validado === 'true'">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        :href="'https://192.168.1.115:3002/Ticket/' + item.idcompras"
                        class="pa-3"
                      >
                        <v-icon color="red" dark v-bind="attrs" small class="mr-2">
                          mdi-printer
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <v-tooltip bottom v-else>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon class="pa-3">
                        <v-icon color="yellow" dark v-bind="attrs" small class="mr-2">
                          mdi-account-tie-hat
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </template>
                <template v-slot:item.actions2="{ item }">
                  <v-tooltip bottom v-if="item.validado === 'false'">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon @click="editarP(item)" class="pa-3">
                        <v-icon dark v-bind="attrs" small class="mr-2">
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </template>
                <template v-slot:item.actions3="{ item }">
                  <v-tooltip bottom v-if="item.validado === 'false'">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon @click="eliminarP(item)" class="pa-3">
                        <v-icon dark v-bind="attrs" small class="mr-2">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario del proveedor -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="insertprove" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="insertprove = false">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>

              <v-form class="mt-7" @submit.prevent="insertarproveedor">
                <div>
                  <h4>DATOS DEL SOCIO COMERCIAL:</h4>
                  <!-- row 1: nombre, email -->
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formproveedor.nombre"
                        type="text"
                        label="Nombre completo"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formproveedor.rsocial"
                        type="text"
                        label="DENOMINACIÓN O RAZON SOCIAL"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formproveedor.email"
                        type="email"
                        label="Correo electrónico"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formproveedor.movil"
                        type="text"
                        label="Celular"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formproveedor.tel"
                        type="text"
                        label="Teléfono"
                        filled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12"
                      ><center>
                        <v-btn outlined color="orange" class="btnEnviar" type="submit"
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
    <v-dialog v-model="edit" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-h4"> Editar cantidad </v-card-title>
        <v-text-field
          v-model="actcompra.cantidad"
          type="number"
          label="Cantidad"
          filled
        ></v-text-field>
        <v-btn block color="primary" text @click="actualizarP"> Actualizar </v-btn>
        <v-btn color="primary" text @click="edit = false"> Cerrar </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delet" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-h4"> Eliminar compra </v-card-title>
        <v-textarea
          v-model="deletcompra.motivo"
          type="text"
          label="Motivo"
          filled
        ></v-textarea>
        <v-btn block color="error" text @click="deletP"> Eliminar </v-btn>
        <v-btn color="primary" text @click="delet = false"> Cerrar </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

/* Fijoo */
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
      folio: "",
      insertprove: false,
      edit: false,
      delet: false,
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
        "SERVICIOS",
      ],
      unidadesmedida: ["PIEZAS", "LITROS", "KILOS", "EVENTO"],
      sucursal: "",
      sucursales: ["CANOA", "SAN LUIS POTOSI", "QUERETARO", "19 NTE", "VALSEQUILLO"],
      search: "",
      consu: false,
      consucompra: false,
      headers: [
        { text: "Id del activo", value: "folioActivo" },
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
          text: "Valor\ninventario",
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
        { text: "Precio unitario", value: "preciounitario" },
        { text: "Costo total", value: "costototal" },
        { text: "Valor inventario", value: "valorinventario" },
        { text: "Descripción", value: "descrip" },
        { text: "Editar", value: "actions2" },
        { text: "Eliminar", value: "actions3" },
        { text: "Imprimir", value: "actions1" },
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
        minimo: "",
        sucursal: "",
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

      actcompra: {
        idconsumibles: "",
        idcompras: "",
        cantidad: 0,
      },

      deletcompra: {
        idconsumibles: "",
        idcompras: "",
        motivo: "",
      },

      /* BUSCAR PROVEEDOR */
      proveedores: [],
      searchProvInsert: "",
      proveedoresFijos: [],
      /* --------------- */

      /* INSERTAR PROVEEDOR */
      formproveedor: {
        nombre: "",
        rsocial: "",
        email: "",
        movil: "",
        tel: "",
      },
      /* ------------------ */
    };
  },
  mounted() {
    this.socket = io("http://localhost:3003");
    this.socket.on("verificado", (datos) => {
      console.log(datos);
      this.alerta = true;
      this.Titulo = "¡Aviso!";
      this.Mensaje = "Se valido la entrada de proveedor";
      this.mostrar();
    });
    this.sucursal = "CANOA";
    this.mostrar();
    this.TT();
    this.mostrarProveedores();
  },

  computed: {},
  methods: {
    /* Agregar buscador */
    async searchProvedorInsert() {
      if (!this.searchProvInsert) {
        this.proveedores = this.proveedoresFijos;
      }
      this.proveedores = this.proveedoresFijos.filter((provee) => {
        return provee.toLowerCase().indexOf(this.searchProvInsert.toLowerCase()) > -1;
      });
    },
    async TT() {
      const res = await fetch("http://localhost:3001/proveedores", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });
      /* this.prov = await res.json();
      console.log(this.prov); */
    },
    /* Abre el formulario de editar*/
    async editarP(item) {
      this.actcompra.cantidad = item.cantidad;
      console.log(item);
      this.actcompra.idconsumibles = item.folioActivo;
      this.actcompra.idcompras = item.idcompras;
      this.edit = true;
    },

    /* Abre el formulario de eliminar*/
    async eliminarP(item) {
      console.log(item);
      this.deletcompra.idconsumibles = item.folioActivo;
      this.deletcompra.idcompras = item.idcompras;
      this.delet = true;
    },

    async mostrarProveedores() {
      try {
        const res = await fetch("http://localhost:3001/proveedores");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.proveedoresFijos = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
          this.proveedoresFijos = datos.respuesta.respuesta.map(
            (filtro) => filtro.nombre
          );
          //console.log(this.proveedoresFijos);
          this.proveedores = [...this.proveedoresFijos];
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    /* Mostrar los datos de la tabla consumibles*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/consumibles/" + this.sucursal);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.consumibles = datos.respuesta;
          //console.log(datos.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar los datos de la tabla compras*/
    async mostrarCompras(folio) {
      this.folio = folio;
      //console.log(this.folio);
      try {
        const res = await fetch(
          `http://localhost:3001/compras?compra=${folio}&sucursal=${this.sucursal}`
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.compras = datos.respuesta;
          //console.log(datos.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de compra*/
    async compra(item) {
      //console.log(item.folioActivo);
      this.consucompra = true;
      this.formData.folioActivo = item.folioActivo;
      this.formData.idconsumibles = item.idconsumibles;
      this.formData.descrip = item.descripcion;
      this.mostrarCompras(item.folioActivo);
    },
    /* -------------------------------- */

    /* Enviar formulario de consumibles */
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
      this.formData.sucursal = this.sucursal;
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
        console.log(datos.mensaje);
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.formData.unidadmedida = "";
      this.formData.minimo = "";
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

    /* Actualizar piezas */
    async actualizarP() {
      const res = await fetch("http://localhost:3001/actualizarcompra", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.actcompra),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Compra editada";
        this.Mensaje = "";
        this.edit = false;
        this.mostrarCompras(this.formData.folioActivo);
        this.mostrar();
      }
    },
    /* ----------------- */

    /* ELIMINAR piezas */
    async deletP() {
      const res = await fetch("http://localhost:3001/eliminarcompra", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.deletcompra),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Compra eliminada";
        this.Mensaje = "";
        this.delet = false;
        this.deletcompra.motivo = "";
        this.mostrarCompras(this.formData.folioActivo);
        this.mostrar();
      }
    },
    /* ----------------- */
    async insertarproveedor() {
      const res = await fetch("http://localhost:3001/insertarProveedorinsumos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formproveedor),
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
          this.Mensaje = datos.respuesta;
          this.insertprove = false;
          this.mostrarProveedores();
        }
      }
      console.log(datos);
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
