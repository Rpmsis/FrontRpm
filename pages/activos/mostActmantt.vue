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
        :items="actmantt"
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
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                @click="
                  formularios(
                    item.folioInsumos,
                    item.tipoAct,
                    item.Numserie,
                    item.descrip
                  )
                "
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

      <!-- Formulario 1: Montacargas -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="montacargas" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(montacargas = false), limpiarFormulario()">
                  <v-icon style="font-size: 35px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form @submit.prevent="enviarForm" max-width="100%">
                <v-row>
                  <v-col cols="12" md="4">
                    <h2>ID del activo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.folioActivo }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Tipo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.tipoAct }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Número de serie:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.nserie }}
                      </h4>
                    </center>
                  </v-col>
                </v-row>


                <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="datos1.modelo"
                        label="* MODELO"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="datos1.capacidad"
                        label="* CAPACIDAD DE CARGA"
                        filled
                        hint="ANCHO x LARGO"
                      ></v-text-field>
                    </v-col>
                  <v-col cols="12" md="2">
                      <v-select
                        v-model="datos1.clasificacion"
                        :items="clac"
                        label="*CLASIFICACIÓN"
                        filled
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        v-model="datos1.idubicacion"
                        :items="ubicaciones"
                        label="*UBICACIÓN"
                        filled
                      ></v-select>
                    </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="Descripción"
                      clearable
                      style="border: white"
                      v-model="datos1.descripgen"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>

                <center>
                  <v-btn
                    block
                    style="margin-top: 10px; margin-bottom: 10px"
                    outlined
                    color="orange"
                    elevation="16"
                    type="submit"
                    >Actualizar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario 2: Maquinaria -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="maquinaria" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(maquinaria = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form @submit.prevent="enviarForm">
                <v-row>
                  <v-col cols="12" md="4">
                    <h2>ID del activo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.folioActivo }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Tipo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.tipoAct }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Número de serie:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.nserie }}
                      </h4>
                    </center>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="datos1.modelo"
                      label="* MODELO"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="datos1.capacidad"
                      label="* CAPACIDAD"
                      filled
                      hint="ANCHO x LARGO"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select
                      v-model="datos1.clasificacion"
                      :items="clac"
                      label="* CLASIFICACIÓN"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                      <v-select
                        v-model="datos1.idubicacion"
                        :items="ubicaciones"
                        label="*UBICACIÓN"
                        filled
                      ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="Descripción"
                      clearable
                      style="border: white"
                      v-model="datos1.descripgen"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>

                <center>
                  <v-btn
                    block
                    style="margin-top: 10px; margin-bottom: 10px"
                    outlined
                    color="orange"
                    elevation="16"
                    type="submit"
                    >Actualizar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario 3: vehiculos -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="vehiculos" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(vehiculos = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form @submit.prevent="enviarForm">
                <v-row>
                  <v-col cols="12" md="4">
                    <h2>ID del activo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.folioActivo }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Tipo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.tipoAct }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Número de serie:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.nserie }}
                      </h4>
                    </center>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="datos1.modelo"
                      label="* MODELO DEL EQUIPO"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="datos1.nmotor"
                      label="* NÚMERO DE MOTOR"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select
                      v-model="datos1.clasificacion"
                      :items="clac"
                      label="*CLASIFICACIÓN"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                      <v-select
                        v-model="datos1.idubicacion"
                        :items="ubicaciones"
                        label="*UBICACIÓN"
                        filled
                      ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="Descripción"
                      clearable
                      style="border: white"
                      v-model="datos1.descripgen"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>

                <center>
                  <v-btn
                    block
                    style="margin-top: 10px; margin-bottom: 10px"
                    outlined
                    color="orange"
                    elevation="16"
                    type="submit"
                    >Actualizar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario 4: herramienta -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="herramienta" max-width="1200px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(herramienta = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form @submit.prevent="enviarForm">
                <v-row>
                  <v-col cols="12" md="4">
                    <h2>ID del activo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.folioActivo }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Tipo:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.tipoAct }}
                      </h4>
                    </center>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2>Número de serie:</h2>
                    <center>
                      <h4 style="font-size: 25px; color: chocolate">
                        {{ datos1.nserie }}
                      </h4>
                    </center>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="datos1.marca"
                      filled
                      label="* MARCA"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="datos1.modelo"
                      filled
                      label="* MODELO"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                      <v-select
                        v-model="datos1.idubicacion"
                        :items="ubicaciones"
                        label="*UBICACIÓN"
                        filled
                      ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="Descripción"
                      clearable
                      style="border: white"
                      v-model="datos1.descripgen"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>
                <center>
                  <v-btn
                    block
                    style="margin-top: 10px; margin-bottom: 10px"
                    outlined
                    color="orange"
                    elevation="16"
                    type="submit"
                    >Actualizar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-card>

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
import "@mdi/font/css/materialdesignicons.css";
export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      clac: ["A", "B", "C"],
      status: ["A", "B", "C"],
      ubicaciones: [],
      montacargas: false,
      maquinaria: false,
      vehiculos: false,
      herramienta: false,
      actmantt: [],
      headers: [
        { text: "Folio Activo", value: "folioInsumos" },
        { text: "Tipo", value: "tipoAct" },
        { text: "Fecha creación", value: "F_creacion" },
        { text: "Editar", value: "actions", sortable: false },
      ],
      datos1: {
        folioActivo: "",
        tipoAct: "",
        fabricacion: "",
        tipoAct: "",
        modelo: "",
        capacidad: "",
        clasificacion: "",
        nmotor: "",
        tipocontmate: "",
        espeficicacion: "",
        marca: "",
        descripadi: "",
        descripgen: "",
        idubicacion: "",
      },
    };
  },
  mounted() {
    this.mostrar();
    this.mostrarubi();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://192.168.1.105:3001/actmantt");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.actmantt = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

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

    /* Mostrar el formulario de editar */
    async formularios(folio, tipo, nserie, descrip) {
      this.datos1.folioActivo = folio;
      this.datos1.tipoAct = tipo;
      this.datos1.nserie = nserie;
      this.datos1.descripgen = descrip;
      //console.log(folio, tipo);
      if (tipo === "MONTACARGAS") {
        this.montacargas = true;
      } else {
        if (tipo === "MAQUINARIA") {
          this.maquinaria = true;
        } else {
          if (tipo === "VEHÍCULOS") {
            this.vehiculos = true;
          } else {
            if (tipo === "HERRAMIENTA") {
              this.herramienta = true;
            }
          }
        }
      }
    },
    /* ------------------------------------- */

    /* Enviar el formulario */
    async enviarForm() {
      const res = await fetch("http://192.168.1.105:3001/insertarMante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datos1),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
      } else {
        this.actualiarDes();
      }
      console.log(datos);
    },

    async actualiarDes() {
      const res = await fetch("http://192.168.1.105:3001/actualizarDesinsum", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datos1),
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
        this.Titulo = "Datos guardados";
        this.limpiarFormulario();
        this.montacargas = false;
        this.maquinaria = false;
        this.vehiculos = false;
        this.herramienta = false;
        this.mostrar();
      }
    },
    /* Limpiar los datos de los formularios */
    limpiarFormulario() {
      this.datos1.fabricacion = "";
      this.datos1.capacidad = "";
      this.datos1.clasificacion = "";
      this.datos1.tipocontmate = "";
      this.datos1.espeficicacion = "";
      this.datos1.descripadi = "";
      this.datos1.descripgen = "";
      this.datos1.modelo = "";
      this.datos1.nmotor = "";
      this.datos1.marca = "";
      this.datos1.idubicacion = "";
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
  /* padding: 0px 50px 0px 50px; */
  max-width: 100% !important;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
</style>
