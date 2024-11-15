<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <v-card>
          <v-card-text>
            <center>
              <h2>LUNES</h2>
              <h2>A = {{ lunesA }}</h2>
              <h2>B = {{ lunesB }}</h2>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card>
          <v-card-text>
            <center>
              <h2>MARTES</h2>
              <h2>A = {{ martesA }}</h2>
              <h2>B ={{ martesB }}</h2>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card>
          <v-card-text>
            <center>
              <h2>MIERCOLES</h2>
              <h2>A = {{ miercolesA }}</h2>
              <h2>B = {{ miercolesB }}</h2>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card>
          <v-card-text>
            <center>
              <h2>JUEVES</h2>
              <h2>A = {{ juevesA }}</h2>
              <h2>B = {{ juevesB }}</h2>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card>
          <v-card-text>
            <center>
              <h2>VIERNES</h2>
              <h2>A = {{ viernesA }}</h2>
              <h2>B = {{ viernesB }}</h2>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <center>
          <h3>Semana activa: {{ numerosemana }}</h3>
          <v-switch
            v-model="switch1"
            :label="`Estatus: ${switch1.toString()}`"
            color="green"
            @change="formhabilitar()"
            hide-details
            inset
          ></v-switch>
        </center>
      </v-col>
    </v-row>
    <v-card class="mt-5">
      <v-card-title>
        <v-row>
          <v-col cols="12" md="6" style="color: white">
            <h4>Fecha inicio:</h4>
            <v-date-picker
              v-model="date1"
              full-width
              class="mt-4"
              :landscape="landscape"
              @input="mostrarbuscador"
              color="green"
            ></v-date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <h4>Fecha fin:</h4>
            <v-date-picker
              v-model="date2"
              full-width
              class="mt-4"
              :landscape="landscape"
              @input="mostrarbuscador"
              color="purple"
            ></v-date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              style="margin-left: 15px; margin-top: 10px; left: 100px"
              icon
              @click="mostrarMenulista"
              v-show="buscarfechas"
            >
              <v-icon style="font-size: 80px"
                >mdi-card-search-outline theme--dark yellow--text</v-icon
              >
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              style="margin-left: 15px; margin-top: 10px; left: 100px"
              icon
              @click="generatePDF"
              v-show="descarga"
            >
              <v-icon style="font-size: 70px"
                >mdi-file-download theme--dark yellow--text</v-icon
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="comidas"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-by="['fechainicio']"
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
                @click="actualizar(item.idmenusemana)"
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
      <v-btn icon @click="formcomidas = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark yellow--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="formcomidas" persistent max-width="800px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(formcomidas = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fecha"
                          label="Fecha de inicio"
                          outlined
                          readonly
                          v-on="on"
                          filled
                          prepend-icon="mdi-calendar-range"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="fecha" @input="menu = false" filled>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="number"
                      prepend-icon="mdi-calendar-range"
                      label="Número de semana"
                      v-model="enviarDatos.numsemana"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Sopa: "
                      prepend-icon="mdi-noodles"
                      v-model="enviarDatos.platoentrada"
                      @input="
                        enviarDatos.platoentrada = enviarDatos.platoentrada.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Bebida: "
                      prepend-icon="mdi-beer-outline"
                      v-model="enviarDatos.bebida"
                      @input="enviarDatos.bebida = enviarDatos.bebida.toUpperCase()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview1"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview1"
                        alt="Imagen de la sopa"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      prepend-icon="mdi-camera-plus"
                      label="Imagen de la sopa"
                      v-model="Solicitud.archivo"
                      @change="updateImagePreview"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview2"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview2"
                        alt="Imagen de la bebida"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen de la bebida"
                      prepend-icon="mdi-camera-plus"
                      v-model="Solicitud.archivo2"
                      @change="updateImagePreview2"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte A: "
                      prepend-icon="mdi-food-turkey"
                      v-model="enviarDatos.platofuerteA"
                      @input="
                        enviarDatos.platofuerteA = enviarDatos.platofuerteA.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte B: "
                      prepend-icon="mdi-food-turkey"
                      v-model="enviarDatos.platofuerteB"
                      @input="
                        enviarDatos.platofuerteB = enviarDatos.platofuerteB.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview3"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview3"
                        alt="Imagen del plato fuerte A"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte A"
                      prepend-icon="mdi-camera-plus"
                      v-model="Solicitud.archivo3"
                      @change="updateImagePreview3"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview4"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview4"
                        alt="Imagen del plato fuerte B"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte B"
                      v-model="Solicitud.archivo4"
                      prepend-icon="mdi-camera-plus"
                      @change="updateImagePreview4"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <center>
                  <v-btn block outlined class="btnEnviar" type="submit" color="yellow"
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
          <v-dialog v-model="actComida" persistent max-width="800px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="actComida = false">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="actualizaracti">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fecha2"
                          label="Fecha de inicio"
                          outlined
                          readonly
                          v-on="on"
                          filled
                          prepend-icon="mdi-calendar-range"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="fecha2" @input="menu2 = false" filled>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="number"
                      prepend-icon="mdi-calendar-range"
                      label="Número de semana"
                      v-model="actualizarDatos.numsemana"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Sopa: "
                      prepend-icon="mdi-noodles"
                      v-model="actualizarDatos.platoentrada"
                      @input="
                        actualizarDatos.platoentrada = actualizarDatos.platoentrada.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Bebida: "
                      prepend-icon="mdi-beer-outline"
                      v-model="actualizarDatos.bebida"
                      @input="
                        actualizarDatos.bebida = actualizarDatos.bebida.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct1"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct1"
                        alt="Imagen de la sopa"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      prepend-icon="mdi-camera-plus"
                      label="Imagen de la sopa"
                      v-model="actualizarDatos.archivo"
                      @change="updateImage"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct2"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct2"
                        alt="Imagen de la bebida"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen de la bebida"
                      prepend-icon="mdi-camera-plus"
                      v-model="actualizarDatos.archivo2"
                      @change="updateImage2"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte A: "
                      prepend-icon="mdi-food-turkey"
                      v-model="actualizarDatos.platofuerteA"
                      @input="
                        actualizarDatos.platofuerteA = actualizarDatos.platofuerteA.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte B: "
                      prepend-icon="mdi-food-turkey"
                      v-model="actualizarDatos.platofuerteB"
                      @input="
                        actualizarDatos.platofuerteB = actualizarDatos.platofuerteB.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct3"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct3"
                        alt="Imagen del plato fuerte A"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte A"
                      prepend-icon="mdi-camera-plus"
                      v-model="actualizarDatos.archivo3"
                      @change="updateImage3"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct4"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct4"
                        alt="Imagen del plato fuerte B"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte B"
                      v-model="actualizarDatos.archivo4"
                      prepend-icon="mdi-camera-plus"
                      @change="updateImage4"
                    ></v-file-input>
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

      <!-- Formulario  para habilitar la semana de comidas-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="habilitarsem" persistent max-width="400px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  @click="(habilitarsem = false), limpiarFormulario2(), (switch1 = false)"
                >
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="actualizarestatusmenutrue">
                <v-col cols="12" md="12">
                  <v-select
                    v-model="hnumsemana.numsemana"
                    :items="listanumsemana"
                    label="Número de semana"
                    filled
                  ></v-select>
                </v-col>

                <center>
                  <v-btn block outlined color="yellow" class="btnEnviar" type="submit"
                    >Habilitar</v-btn
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
import io from "socket.io-client";

import ImageZoom from "~/components/ImageZoom.vue";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"],
      comidas: [],
      personas: [],
      menu: false,
      fecha: null,
      menu2: false,
      fecha2: null,
      formcomidas: false,
      actComida: false,
      habilitarsem: false,
      imagePreview1: null,
      imagePreview2: null,
      imagePreview3: null,
      imagePreview4: null,
      imageAct1: null,
      imageAct2: null,
      imageAct3: null,
      imageAct4: null,
      date1: "",
      date2: "",
      landscape: true,

      menulista: [],
      descarga: false,
      buscarfechas: false,
      platosentrada: [],
      platoA: [],
      platoB: [],
      bebidas: [],
      listanumsemana: [],

      switch1: false,
      numerosemana: "",

      headers: [
        { text: "Id comida", value: "idmenusemana" },
        { text: "Día de la semana", value: "diasemana" },
        { text: "Sopa", value: "platoentrada" },
        { text: "Plato fuerte A", value: "platofuerteA" },
        { text: "Plato fuerte B", value: "platofuerteB" },
        { text: "Bebida", value: "bebida" },
        { text: "Fecha del día", value: "fechainicio" },
        {
          text: "Editar comida",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],

      headers2: [{ text: "Lunes A ", value: "concatenado" }],
      enviarDatos: {
        fechainicio: "",
        numsemana: "",
        platoentrada: "",
        platofuerteA: "",
        platofuerteB: "",
        bebida: "",
      },
      actualizarDatos: {
        idmenusemana: "",
        fechainicio: "",
        numsemana: "",
        platoentrada: "",
        platofuerteA: "",
        platofuerteB: "",
        bebida: "",
        archivo: null,
        archivo2: null,
        archivo3: null,
        archivo4: null,
      },
      Solicitud: {
        archivo: null,
        archivo2: null,
        archivo3: null,
        archivo4: null,
      },
      Datos: [],
      /* Conteo de comidas */
      lunesA: 0,
      lunesB: 0,
      martesA: 0,
      martesB: 0,
      miercolesA: 0,
      miercolesB: 0,
      juevesA: 0,
      juevesB: 0,
      viernesA: 0,
      viernesB: 0,

      hnumsemana: {
        numsemana: "",
      },
    };
  },
  mounted() {
    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
      this.mostrarSolicitadas(this.numsemana);
    });
    this.mostrar();
    this.mostrarNumsemanas();
  },

  computed: {},
  methods: {
    mostrarbuscador() {
      if (this.date1 && this.date2) {
        this.buscarfechas = true;
      }
    },
    updateImagePreview() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview1 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview1 = null;
      }
    },
    updateImagePreview2() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo2;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview2 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview2 = null;
      }
    },
    updateImagePreview3() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo3;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview3 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview3 = null;
      }
    },
    updateImagePreview4() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo4;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview4 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview4 = null;
      }
    },

    updateImage() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct1 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct1 = null;
      }
    },
    updateImage2() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo2;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct2 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct2 = null;
      }
    },
    updateImage3() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo3;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct3 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct3 = null;
      }
    },
    updateImage4() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo4;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct4 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct4 = null;
      }
    },

    /* Mostrar los datos que se quieran descargar */
    async mostrarMenulista() {
      try {
        const res = await fetch(
          "http://localhost:3001/MenuLista?fechainicio=" +
            this.date1 +
            "&fechafin=" +
            this.date2,
          {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
          }
        );
        const datos = await res.json();
        //console.log(datos);
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          if (res.status === 400) {
            this.descarga = false;
            this.buscarfechas = false;
            this.alerta = true;
            //this.Titulo = "Error";
            this.Titulo = "¡Upss!";
            this.Mensaje = datos.mensaje;
          } else {
            if (datos.respuesta.respuesta && datos.respuesta.respuesta.length > 0) {
              this.menulista = datos.respuesta.respuesta;
              this.platosentrada = datos.sopas;
              this.platoA = datos.platofuertea;
              this.platoB = datos.platofuerteb;
              this.bebidas = datos.bebidas;
              //console.log(this.menulista);
              //console.log(this.platosentrada);

              this.comidas = datos.respuesta.respuesta;
              //console.log(this.comidas);
              this.numsemana = this.comidas[0].numsemana;
              //console.log(this.numsemana);
              this.mostrarSolicitadas(this.numsemana);
              this.descarga = true;
              this.buscarfechas = false;
            } else {
              this.descarga = false;
              this.buscarfechas = false;
              this.mostrar();
              this.alerta = true;
              //this.Titulo = "Error";
              this.Titulo = "¡Upss!";
              this.Mensaje = "El menú de las fechas selecionadas no existe, agregalo!";
            }
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async generatePDF() {
      const Imgplatosentrada = this.platosentrada.map((imagenBase64) => [
        {
          image: imagenBase64 || "",
          width: 70,
          height: 70,
          alignment: "center",
          margin: [0, 0, 0, 0],
        },
      ]);

      const Imgplatosa = this.platoA.map((imagenBase64) => [
        {
          image: imagenBase64 || "",
          width: 70,
          height: 70,
          alignment: "center",
          margin: [0, 0, 0, 0],
        },
      ]);

      const Imgplatosb = this.platoB.map((imagenBase64) => [
        {
          image: imagenBase64 || "",
          width: 70,
          height: 70,
          alignment: "center",
          margin: [0, 0, 0, 0],
        },
      ]);

      const Imgbebidas = this.bebidas.map((imagenBase64) => [
        {
          image: imagenBase64 || "",
          width: 70,
          height: 70,
          alignment: "center",
          margin: [0, 0, 0, 0],
        },
      ]);

      const docDefinition = {
        pageOrientation: "landscape",
        content: [
          {
            table: {
              body: [
                // Fila de encabezado
                [
                  {
                    text: "MENÚ",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "LUNES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MARTES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MIERCOLES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "JUEVES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "VIERNES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                ],

                // Agrega las filas de imágenes
                [
                  { text: "", fillColor: "#B6CAF1", alignment: "center" },
                  ...Imgplatosentrada,
                ],
                [
                  { text: "SOPA", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.platoentrada),
                ],
                // Agrega las filas de imágenes
                [{ text: "", fillColor: "#B6CAF1", alignment: "center" }, ...Imgplatosa],
                [
                  { text: "PLATO FUERTE A", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.platofuerteA),
                ],
                // Agrega las filas de imágenes
                [{ text: "", fillColor: "#B6CAF1", alignment: "center" }, ...Imgplatosb],
                [
                  { text: "PLATO FUERTE B", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.platofuerteB),
                ],
                [{ text: "", fillColor: "#B6CAF1", alignment: "center" }, ...Imgbebidas],
                [
                  { text: "BEBIDA", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.bebida),
                ],
              ],
            },
            // Estilos para la tabla
            fontSize: 10,
            bold: true,
            margin: [50, 100, 0, 100],
            alignment: "center",
          },
          {
            table: {
              body: [
                // Fila de encabezado
                [
                  {
                    text: "NOMBRE COMPLETO",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "LUNES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                    width: 100,
                    height: 100,
                  },
                  {
                    text: "MARCAR LUNES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MARTES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MARCAR MARTES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MIERCOLES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MARCAR MIERCOLES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "JUEVES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MARCAR JUEVES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "VIERNES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "MARCAR VIERNES",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                ],

                // Agrega las filas de imágenes
                ...this.personas.map((persona) => [
                  persona.nombre,
                  persona.lunes,
                  "",
                  persona.martes,
                  "",
                  persona.miercoles,
                  "",
                  persona.jueves,
                  "",
                  persona.viernes,
                  "",
                ]),
              ],
            },
            // Estilos para la tabla
            fontSize: 10,
            bold: true,
            margin: [0, 100, 0, 0],
            alignment: "center",
          },
        ],
        // Encabezado y pie de página
        header: function (currentPage, pageCount, pageSize) {
          return {
            image:
              "data:image/png;base64,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",
            width: 600,
            alignment: "center",
            margin: [0, 5, 0, 0],
          };
        },
        footer: function (currentPage, pageCount, pageSize) {
          return {
            margin: [50, 0, 50, 100],
             color: '#5acdf6',
            text: "Información documentada de uso exclusivo para la empresa RPM.\nQueda prohibida su reproducción total o parcial.",
            alignment: "center",
            fontSize: 12,
            bold: true,
          };
        },
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.download("Menusemana.pdf");

      this.findescarga();
    },

    findescarga() {
      this.descarga = false;
      this.date1 = "";
      this.date2 = "";
      this.mostrar();
    },
    async mostrarSolicitadas(numsemana) {
      try {
        const res = await fetch(
          `http://localhost:3001/comidasolicitadas?numsemana=${numsemana}`
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.personas = datos.respuesta.respuesta;
          console.log(datos);
          this.lunesA = datos.lunesA;
          this.lunesB = datos.lunesB;

          this.martesA = datos.martesA;
          this.martesB = datos.martesB;

          this.miercolesA = datos.miercolesA;
          this.miercolesB = datos.miercolesB;

          this.juevesA = datos.juevesA;
          this.juevesB = datos.juevesB;

          this.viernesA = datos.viernesA;
          this.viernesB = datos.viernesB;

          //console.log(this.lunesA);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Menusemana", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.comidas = datos.respuesta.respuesta;
          //this.switch1 = datos.permisomenu;
          console.log(datos.permisomenu);
          if (datos.permisomenu === "true") {
            this.switch1 = true;
          } else {
            this.switch1 = false;
          }
          this.numerosemana = datos.nsemana;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async mostrarNumsemanas() {
      try {
        const res = await fetch("http://localhost:3001/Numsemanamenu");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.respuesta.respuesta);
          this.listanumsemana = datos.respuesta.respuesta.map(
            (filtro) => filtro.numsemana
          );
          //console.log(this.listanumsemana);

          /* const listanumsemana = datos.respuesta.respuesta.map((filtro) => ({numsem: filtro.numsemana}));
          console.log(listanumsemana); */
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    /* Abre el formulario de actualizar */
    async actualizar(item) {
      const objeto = this.comidas.find((filtro) => filtro.idmenusemana === item);
      this.actualizarDatos = objeto;
      this.fecha2 = objeto.fechainicio;
      console.log(this.actualizarDatos);
      this.actComida = true;
    },
    /* -------------------------------- */

    async submitForm() {
      console.log(this.enviarDatos);
      const formulario = new FormData();
      formulario.append("fechainicio", this.fecha);
      formulario.append("numsemana", this.enviarDatos.numsemana);
      formulario.append("platoentrada", this.enviarDatos.platoentrada);
      formulario.append("platofuerteA", this.enviarDatos.platofuerteA);
      formulario.append("platofuerteB", this.enviarDatos.platofuerteB);
      formulario.append("bebida", this.enviarDatos.bebida);
      formulario.append("archivo", this.Solicitud.archivo);
      formulario.append("archivo2", this.Solicitud.archivo2);
      formulario.append("archivo3", this.Solicitud.archivo3);
      formulario.append("archivo4", this.Solicitud.archivo4);
      const res = await fetch("http://localhost:3001/insertarMenu", {
        method: "POST",
        headers: {
          token: localStorage.token,
        },
        body: formulario,
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        //this.Titulo = "Error";
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = datos.mensaje;
        this.Mensaje = " ";
        this.limpiarFormulario();
        this.formcomidas = false;
        this.mostrar();
      }
    },

    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const formulario = new FormData();
      formulario.append("idmenusemana", this.actualizarDatos.idmenusemana);
      formulario.append("fechainicio", this.fecha2);
      formulario.append("numsemana", this.actualizarDatos.numsemana);
      formulario.append("platoentrada", this.actualizarDatos.platoentrada);
      formulario.append("platofuerteA", this.actualizarDatos.platofuerteA);
      formulario.append("platofuerteB", this.actualizarDatos.platofuerteB);
      formulario.append("bebida", this.actualizarDatos.bebida);
      formulario.append("archivo", this.actualizarDatos.archivo);
      formulario.append("archivo2", this.actualizarDatos.archivo2);
      formulario.append("archivo3", this.actualizarDatos.archivo3);
      formulario.append("archivo4", this.actualizarDatos.archivo4);
      const res = await fetch("http://localhost:3001/actualizarMenusemana", {
        method: "PUT",
        headers: {
          token: localStorage.token,
        },
        body: formulario,
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
        this.actComida = false;
        (this.imagePreview1 = null),
          (this.imagePreview2 = null),
          (this.imagePreview3 = null),
          (this.imagePreview4 = null),
          this.mostrar();
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.enviarDatos.diasemana = "";
      this.enviarDatos.platoentrada = "";
      this.enviarDatos.platofuerteA = "";
      this.enviarDatos.platofuerteB = "";
      this.enviarDatos.bebida = "";
      this.enviarDatos.numsemana = "";
      this.fecha = "";
      this.Solicitud.archivo = null;
      this.imagePreview1 = null;
      this.Solicitud.archivo2 = null;
      this.imagePreview2 = null;
      this.Solicitud.archivo3 = null;
      this.imagePreview3 = null;
      this.Solicitud.archivo4 = null;
      this.imagePreview4 = null;
    },
    limpiarFormulario2() {
      this.hnumsemana.numsemana = "";
    },

    /* Desactiva la actividad asignada */
    async actualizarestatusmenutrue() {
      const res = await fetch("http://localhost:3001/actualizarestatusmenutrue", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(this.hnumsemana),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.respuesta.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.respuesta.mensaje;
        this.Mensaje = " ";
        this.habilitarsem = false;
        this.limpiarFormulario2();
        this.mostrar();
      }
    },
    async actualizarestatusmenufalse() {
      this.hnumsemana.numsemana = this.numerosemana;
      const res = await fetch("http://localhost:3001/actualizarestatusmenufalse", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(this.hnumsemana),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.respuesta.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.respuesta.mensaje;
        this.Mensaje = " ";
        this.limpiarFormulario2();
        this.mostrar();
      }
    },

    formhabilitar() {
      if (this.switch1 === true) {
        this.habilitarsem = true;
      } else {
        this.actualizarestatusmenufalse();
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
