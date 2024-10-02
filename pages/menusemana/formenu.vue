<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-date-picker
              v-model="date1"
              full-width
              class="mt-4"
              :landscape="landscape"
            ></v-date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-picker
              v-model="date2"
              full-width
              class="mt-4"
              :landscape="landscape"
            ></v-date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              style="margin-left: 15px; margin-top: 10px; left: 100px"
              icon
              @click="mostrarMenulista"
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
        :sort-desc="false"
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
                  <v-col cols="12" md="12">
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
                  <v-col cols="12" md="12">
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
      menu: false,
      fecha: null,
      menu2: false,
      fecha2: null,
      formcomidas: false,
      actComida: false,
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
      platosentrada: [],
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
      enviarDatos: {
        fechainicio: "",
        platoentrada: "",
        platofuerteA: "",
        platofuerteB: "",
        bebida: "",
      },
      actualizarDatos: {
        idmenusemana: "",
        fechainicio: "",
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
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
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
          this.menulista = datos.respuesta.respuesta;
          this.platosentrada = datos.base64Images;
          console.log(this.platosentrada);
          //console.log(datos);

          if (this.menulista && this.menulista.length > 0) {
            this.descarga = true;
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async generatePDF() {
      const docDefinition = {
        pageOrientation: "landscape",
        content: [
          {
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfkAAACUCAYAAACQq1DUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTAxVDEyOjU2OjA1LTA2OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAyLTAxVDEyOjU2OjA1LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0wMVQxMjo1NjowNS0wNjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplMjczNjE3Ny1iZDBiLTQ5ZjItODVhOS04YTExYWI1ZDRjZjMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZjc2MzMxNi0xMWQwLTE4NDctOGJkMi04NjIxNmVkZTNiYTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzdkODUwYS1jYWFmLTRjYTItYTVmOC00NTc0YTY4NzY4OTgiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjN2Q4NTBhLWNhYWYtNGNhMi1hNWY4LTQ1NzRhNjg3Njg5OCIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0wMVQxMjo1NjowNS0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMjczNjE3Ny1iZDBiLTQ5ZjItODVhOS04YTExYWI1ZDRjZjMiIHN0RXZ0OndoZW49IjIwMjItMDItMDFUMTI6NTY6MDUtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5/EKfpAABPlklEQVR4nO2dd3gjxdnAf77zVU7H0TsccHRCL0J0HAI2WgIECEn4jA2SQkkCSUiooZNAAqElBCQlNk6AJHRW2DTTEQpJCL2Xo5ej3N1eP/v8/fHuWqvVrIqt4jPzex49lnZnZkeytO/MW0Gj0WhGAPFEsjOeSLbVex4azWhiTL0noNFoNBqNpjpoIa/RaDQazShFC3mNRqPRaEYpWshrNBqNRjNK0UJeo9FoNJpRihbyGo1Go9GMUrSQ12g0Go1mlKKFvEaj0Wg0oxQt5DUajUaj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",
            width: 200,
            alignment: "right",
            margin: [0, 0, 0, 20],
          },
          {
            text: "MENÚ SEMANAL",
            color: "#000FFF",
            fontSize: 25,
            alignment: "center",
            margin: [0, 0, 0, 10],
            bold: true,
          },
          {
            table: {
              body: [
                // Fila de encabezado
                [
                  {
                    text: "PROCESO",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "CÓDIGO",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "REVISIÓN",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "EFICIÓN",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                  {
                    text: "PÁGINA",
                    fillColor: "#B6CAF1",
                    alignment: "center",
                  },
                ],
              ],
            },
            // Estilos para la tabla
            fontSize: 12,
            bold: true,
            margin: [500, 20, 0, 20],
            alignment: "right",
          },
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
                // Invertir los datos
                [
                  { text: "SOPA", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.platoentrada),
                ],
                [
                  {
                    image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfkAAACUCAYAAACQq1DUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTAxVDEyOjU2OjA1LTA2OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAyLTAxVDEyOjU2OjA1LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0wMVQxMjo1NjowNS0wNjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplMjczNjE3Ny1iZDBiLTQ5ZjItODVhOS04YTExYWI1ZDRjZjMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZjc2MzMxNi0xMWQwLTE4NDctOGJkMi04NjIxNmVkZTNiYTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzdkODUwYS1jYWFmLTRjYTItYTVmOC00NTc0YTY4NzY4OTgiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjN2Q4NTBhLWNhYWYtNGNhMi1hNWY4LTQ1NzRhNjg3Njg5OCIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0wMVQxMjo1NjowNS0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMjczNjE3Ny1iZDBiLTQ5ZjItODVhOS04YTExYWI1ZDRjZjMiIHN0RXZ0OndoZW49IjIwMjItMDItMDFUMTI6NTY6MDUtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5/EKfpAABPlklEQVR4nO2dd3gjxdnAf77zVU7H0TsccHRCL0J0HAI2WgIECEn4jA2SQkkCSUiooZNAAqElBCQlNk6AJHRW2DTTEQpJCL2Xo5ej3N1eP/v8/fHuWqvVrIqt4jPzex49lnZnZkeytO/MW0Gj0WhGAPFEsjOeSLbVex4azWhiTL0noNFoNBqNpjpoIa/RaDQazShFC3mNRqPRaEYpWshrNBqNRjNK0UJeo9FoNJpRihbyGo1Go9GMUrSQ12g0Go1mlKKFvEaj0Wg0oxQt5DUajUajGaVoIa/RaDQazShFC3mNRqPRaEYpWshrNBqNRjNK0UJeo9FoNJpRihbyGo1Go9GMUrSQ12g0Go1mlKKFvEaj0Wg0oxQt5DUajUajGaVoIa/RaDQazShFC3mNRqPRaEYpWshrNBqNRjNK0UJeo9FoNJpRSmO9JzBUgmlre2DvOlx6EfBUJhR4rg7X1mg0Go2mZEackA+mrUZgA2ATYKJ9+BPg9Uwo8KXTLhMK/C+YttYErgWm12Ge/wVOzIQCT9f62hqNRqPRlMKIEPK2YD8C+D9gH2CSotlAMG09A3QByUwosCATCvQE09a2QCdwaI2m67Aj8EQwbR2WCQVSNb72sAmmrSnA4QWa9AGzgdeBNzOhwLJazMuPeCK5BzDDc/iTWDRy7zDG3A9Y33P4vVg08tAwxtwO2M5zeF4sGrm1SL/1gf28x2PRSOdQ56LRaDR1F/LBtLU3kCT/Bu6lARGsOwJnB9NWLBMK3JkJBeYG09bhwB+B46s72zzGAX8Lpq1tMqHAezW+9nBZFegose3HwbQVBy7JhAKLqjinQkSAYzzHHgWGLOSBnwDf9hy7CxiykAcOAc71HHsXKCjkgR1Q/z86hzEXjUbzNaeujnfBtHUyckMtJuC9rAbcEUxbVwbTVoO9yzyR4jfSarAicHkdrltL1kIE14O21kWj0Wg0ywF1E/LBtHUScOUw53AycDVAJhQYANoQ9XKtOTyYtvapw3Vrze7k76Y1Go1GM0Kpi5APpq3dgasqNNyPgmnreIBMKDAfaK/QuOVy9SjZ5S4BEsCnPucL2fE1Go1GM4KouZAPpq2JiO1xbAWHvSqYtrYGyIQCaeCGCo5dKt8AonW4bqVZmAkFYvjv2Deu5WRcXI04V7ofZ9dpLhqNRrNcUI+d50+R8LhKMh7oCKatYCYU6AfORHacK1T4OsW4KJi2/uEO9VuO8dvJj3e/iCeSKwPHIZ7h05HIiIXAa0A3cFMsGpnnHSSeSAYQrcu3gI2AyUgOgreA+4CuWDQyu5wJxxPJKfaYB3jGfBt4EOiMRSNl/W/iieRUoNWe5yb2+1sEvAc8BiRi0YjfZ+Uda2fEd2RDJHLhL7Fo5O4y5jIGMIDvAFsDKwP9wEfAE8ANsWjkVZ++3wK+C2yLOF32Ax8DGaAjFo28VOo8NBrN8kNNd/LBtLU2IoCrwU7ASQCZUOAj4OIqXacQKwPn1+G6dSGeSAaBN4DfAgcCmyM5DjZHvNavB16OJ5K7ePptjfhOXAUcBGxh99sMaLGPvxZPJPd1dfsJcIfncZFrzM2Bl5Edv3fMZsQ50jtmsfe3DfAicA0iXJ33txmwP3Ah8EY8kdynhLEOB55C/Eb2Rj6fu+KJ5A9KnMtE4AHgTiTUdHt7LhsBewCnAy/GE8mzPf0mxxPJFLJwOhaJTnH67Q78HHg+nkh6IwI0Gs0ooNbq+l8DU6o4/oXBtLWG/fwKYGYVr+XHCY7pYDQTTyQnAP9EFjaFWA/oiSeSq9n9GoC/A2sW6bc6kIonktNLnNLN9rUKsWqpY8YTyRWAnhLGDAD/tNv7MRWIozZRnVZsLjbno4ij9zAWuDCeSB7rOhZHFj2FGAOcF08kIyXORaPRLCfUTF0fTFu7IGrPajIVuBRoy4QCi4Jp65eIIKolY5GdaFOxhnYin7czoYBV9VlVnoNQC8DFwATPsZWBE4ALgF2BrUrsNxkx75xcaCK2pmC7So4JfA9Yu0gbh9WAw4C/+pxfqUDfreKJZMHfYTyRHIfkCfDSh3zfGjzHfwX8xU6wo9IU9CGC3bvIPwvJWaEZJmHDWJPiC1k37yGhquPs16+lTHOhZ8wJiIYKgJRpPhs2jBmUtnF6OWWaS3zmOha5X4WQxbVjyvkv8HDKNJeEDWNt+1ypvJMyzTn2+Bsh92aAj1OmmWfeChvGhkg4MsCHiAPwhq4mH6RM83NPn6mIRgpgYco0XwsbxjfILqZfTZmmMq9H2DDWp/gGBeD1lGkusPtsjpjtNkTMdl8hmr7elGl+4hl/BqLd3NhuOxt4Ffk83y3huhWjJkI+mLYakHA5782oGrQG09bVmVDgmUwocEswbT0O7FmD67rZL5i2Ds2EAneoTgbT1kqIwFs3EwrUOlPfcPnC/qv6TB8D9gUeBvbynNvD/htS9HsBUT//A7E3q/oVYnfFsVeBbYA/I+rtcsdUzfMz4GhETb+r59ye+At5EFPCOmRvZA5jKH6T3hL1DWkzJEPknz3Hp8cTybWBoM942yDC4jZFv/Vi0cj7ReajKc55wA/LaN8MpMgKqHURYedmN+S3BfJdXAO4B9i0yNj9yOI2j7Bh7ATcWGCML8KGcY597aOLXMc714y9OHiO7He8E3UE1M1kf1PfQTYQV7rO34pkRXVzJBIJBNATNowjgedd51dC/GdUdCL3qmJsEDaMz+3rfN+nTX/YMG4GfoT4I/0BWZSr5N1A2DBM4ISUaX5UwvWHTa3U9d9D/um1wFlQOJwCDNTo2m5+b0cSDBJMW2OCaes4xCntBKrnn1AJ/NTPj9l/VTeFd2LRyDJyf2gOq9l/N1KcezsWjfQDKuevVQrOUlAlU3otFo0sRW4wQxlTJVSfikUjjl28lDk4zEYc3kpVzXtROqrGopG3Ub8/kF2X8sYei0ZeAZ716VfKZ6MpTrkmu6VkBfyclGl6BTzkasBeCBvGJEpLJPaGahcfNow1EF+NQouEVRBB+Y0SruPG+S1fQu4iNm9zEDaMMeR+Xi+R//kdGjaM6Z5j7jm94OnzQco0ZxeYXynvZ07KNN9DosH8BDzI/201YD7weyTKym9D24As9gvNraJUfScfTFuTEcesWrJnMG0dkQkFbsmEAs8E01YntY+fn444NV0MEExbOyMrPMcJ7fpMKPBKjedUCo3BtGUgq1IvsxFfBxBbtB/9imPOl77QrnWoi7FC9nDVXIaLanfg3aG7mROLRvriiWRJXvgKphY4V/b7s73061qL4GvAHUhEh8NhZAXLk55zfeSahvwiHbZ0PX/Bfu1s1OaQu7lx84bP8ZPILmY/Ak5FNGATEG3PUcBjKdP8S9gwVid3cXskWdNBD+Au1DU/ZZpW2DCC5GvRNg4bxpoe9faGZH/Di4E3yRfyY5F70qmuY14h714E+UaL2O9lVfvlMkQzp+KTsGFshrxXh18DdyOLsumISn4LRMswjVztzR8RDcV8pEbGNxEtYotjAqgFtVDX/xJZudSaNuAW+/mZyD+hmk5/Ks4Mpq0eZNd+HFlBNx9R541EVkC+xF5eA4525egvJHhqzbQaX08l0CuZ98FLpT/rHYDPi7bSDJmUaeakug4bhttp8q8p07zec969EXrZZ1i3EHueXCH3bMo0zytzmm7t6jUp07zZ9TqDOG0CkDLNS9wdw4bhrvnwp5Rpmp7zY7Czkdr0k/2N7En23gy57+OVlGn2hw1D5bcTDRvGeSnTnKfo9wK5G7kXFP0d3AuItwt9bmHDcI/5Uso0z3K9fga43dV2D7IydVbKNN0bpWdR31erTlWFfDBtrc/QVZTD5VrnSSYU+CSYtn6NrMJqyWTEecXLpZlQ4BPF8ZHIB4g97LeZUODjek+m3tie+SfWex4l4lc06XJGR+Km5YltXM9fVJx3C6x3woYxTdEmR11PrlPlTJ8+/SnT9HPsdd//I2HDeAG4P2WaS33aA4OOelu4DqkE6jHAzvbzd5GcGSfYr71C3v3ZvGCr5R1NYR+Ss2MdZLF7LHC17di4qqvNK+R+PqrP2MH9Wb/l87kN2I6D7s9o87BhnA78JWWanyn6uFX0q4UN43xkAVTXe321bfKXkq0JX0vuzYQC93iO1SukzsvHLF8FbdZF/BreDaatc4q0HR9PJKeR79FeKtchDnjuR8sQx3K4cYhj/lTR7zHg35TnZVw17M+6kNnkSbKOkm72QkxoQfLf42uVnaUmbBheh8tiQv5ixHPb+3CrmF/y9DnGp49bmHq50/V8Y8Tx78uwYZhhw2gLG8Z4dTdmkP2Nz0OE+CC217t7538mUjHSwev46n4fL5IrrF9B1N4OJyts+K/ZPgfenb0f7r4HoP7cHrfP30fWPDcW+A2ixn82bBgX2176Dk+Sa2s/B/g4bBgvhg3jEtvjvuZUbScfTFt7IDadWtMP/Mx7sI4hdV5+lQkFamaPGQIDiL3J+wMfB5wfTFvPZkIBP7XT9+zHkIhFI58AFV31xqKRWcCsIfR7x3luJ/25iBLCImvMV4VOxqKRxfFE8mLEGcjLt5HFypGxaOSDakxOM4hb+LzvhJY5hA1jJcozab6ZMs2FdrhYMfxU/yA+QjPI9b+ZAoTtxxlhwzgoZZpvevrl2L5Tpun1pTmb7EL4acQu7RaG24YNY2rKNOfar93vw7t4eRFJqvUrJBRtI+BgcsPrng8bxipItAHIIqjQ+y7FKfJlgJRpvhc2jCOALrKhsA2II+22wKlhwzgpZZrJlGnOCRvGIUiU0BqusbayH6eGDeP0lGleVsL1K0ZVdvLBtDUGfyeQavMHP4e2TChwC9kVWj14gdJruNeLuYgzzgM+572ONKOWeCI5Pp5IJpBMdSNNwJfK1WTDrrzsBjwdTyS3reF8vo4UUyO71dVzgbsUD3e64hds5zFHkA749LkLuN9vUinT7E+Z5o8RYXUlsmt2sykSalZovjnvJ2wYmyKaP4drkAyLDYCTUnoMdohq2DAmkhs94nWgezFlml8iQtbhFM8cXsCjgveLj7dxj/8A6s9t0McgZZopRNPxU+S3tNjVfzxwvbNLT5nmo8jC6UTEIXG+q+1Y4He2Q2LNqNZO/hgkfWat+ZLiaWVPAf5DbWL2vfwyEwqMeK/mTCgwP5i2LkNSt3oZ9dn8XHQyDM3ESCAWjfTHE8lDkZvZzoomawGPxRPJg2PRyKOK85rh492pFjr/RMo0D/E2CBvG9UhaZcgXajNVfUolZZrPIwIMO679N2QTl4XChjE2ZZruKI5Ci5YrySb0Af/cEXsC95IbIWDZO2fvTh4kwZjjub43+f4JWyv65KGw9xsp01zs194hZZpfIe/tSnthcjiSOGqCPf8gEhWA7Rj4J+BPYcNoRLRmfyZrstkXcWysCRXfyQfTVgD5ktSDszOhQEEVZiYUeAb16rTaPJAJBe6tw3WHisqxBERl5sdbSAVA1aMunqVDJZ5I7oVawL9Hfb4/Kvw+6xvI7pqIRSNzkAVbt884UwEznkiqPJo1w8ctgFS24lJsye6dq9ezvpCTmZKwYTSEDSNvwW4naOl0HVrkEfDgM9+wYTQjSX1KwbHLe53uGskuZsDOuZEyzVcQ+7jDqu5+5H7GqjwdDu7v+MvFBHzYMLYIG4Z70YKtJbiR3HvkgrBhzLBzF7jb9qVM8zbsBYDN7ELXrDTV2MmfRa49ola8SDb7UTFqHVI3APyiRteqJ0/EopG2ek+iQhyiODYfyR9v1HYqasr5rGPRyJx4Inkwor5XRQcEEIfQAyszOw0MhpK549uLOd3l2ZLDhtFAvmB1fwc3DRtGp88UrkyZ5rOK4xcAZ4cN43FEPf0yYsvejFyfJnc8v5Na1+1A9pJ9fDy5Jtr7yVf/r0Y2qcyudh+vlqOQU9+ViKOcm7kp03zXs2DZX5E4B0T4u32NVirwud2A5B54HPg8bBj/QPwLvkDSFf+AbFrvxYhT91PAMrvtU4iT9WrI/8qt2X7E55pVoaJCPpi2NsJW+9SBUzKhQF8pDesQUndDJhTwy0w26rDVw3t7Dn8Yi0Z+V6TfgeQLmS9j0cgFw5jL3kjt+XLH3FBx7JFYNPJWPDFy0rvHE8l1UC8gf4c4c3kzdS0FzkVt1vpmPJGcFItGFirOaYbGRmS1X3kOYQoBrloEbEQ2WcwCpHSyu89m9kNF3m/OTv/qVCvcE/+034sQhzc3W5CNd//cFR72E7KZ8z4HjnA51jnXXQEpdzwWEeQ7kf/eczLfeZz67kN8E9w7fUeT4O4XQp2W+hpy60ish5iWVaSQ3fpkxGmw0CbtCuAmstqFH9sPFX+2tRI1o9I7+cvI98quBXdlQoHeMvtcAcSQrEXVRPVDGe3sTX4BmOdQ3HA8BBX93kV2HUNl+yGOqfLZKGkRWWNWQ11spxPZQeadi0UjDXa5X28u8LHIwsDrTa0ZOm7ho3IIm05WozhAroOdg1ul7dj0SzGt9CElnb3cj9iMj8En9TGSvOXElGl6Nyfe9LNOelx3eO35XgEPkDLN+WHDeB75TYKEcno1FHt7Xrv7D4QN4yp77oNtwoaxHoUzTjq8SOk5Lp5C7ttnoV7wg+z0L0I0YP9BMudt4dN2PqKJOK/E61eMign5YNraj/wdUy1YgqSPLYsahtRdngkFdIiSZqRxOflCHmqfFXK000tWSKg8vj92nV/mk+7UPYZzfktFOy/9qsQ2dk73E8OG8UskzfamiJBcguzCn0mZpl9a2Ltdc3Eyz80ndyFS6H53INmFhYWUnXb4EFGpd9qvZyv6/xlx2MPVZgH+gtjNZ4jHe9HslHbtgD+HDaMDWdhsh+TxH48I91eAjMumf1vYMG5H/i/bIpEPE5FoiTeAJ2uZytZNJXfy3y7epCpcmQkF3hpKxxpUqZuFJAQajYykXW3BDF2jgGp81kPNo68pAzvbnG8paXtnP7PIGHMRYeGmYJ8S5zYPeMh+lNonby72OPPUPfL6ex16vcmavlAcc/dfivq9q46pKEvQpkzTKbhVyJnPaTuAaDd88+bXg4p512dCgZORnUEta+V+il0AZhicQvWq1J23nNaKL4Whvq9qhBCWdIOpILU2SeWpPjUajaYUKmqTz4QCtwbT1j1IvvrTqH5K2zMzocCwboBVrFL3Gq4CD6MQ1U7QEX6qMq1OUghV9jnHm1ZViKUUJzDVmI6jkmouhRJlFGI7O3HMt8rst3o8kVwdf3tdMZThjPFEcjy5jkRu5iPqV1W/SQX6DfWz0fhgp3ndBUkRPQb5fz6bMs1RacazHex2QRzbGpGd+fMp03ynQJ/VEEe81RB/mE+Bp+1EOJphUPEQukwosBA4zxaclyMlFqvB/6hAvHIwbU2lOure00r19h+h+Km1HEH+AuIp68aIJ5K/Qx1+5jgAqdJN7hdPJC9DnU2vFCcwlXpsr3gieQW5ZSIdZpYwpooN8K/DXohJiO11qJozv9jpv5KbLtRhMfA+/oL8RtSLnz4K21M1ZRA2jMlIzpAYig1P2DCeQRy3ZlBeOe7jgTOQ72MhFiE+Fu+QDffyY6Hd9gMkQRJAU8o0S1bl24VrzkecPfN8O8KG8TIiEzocr/mwYTQh0R57kO/suixsGCYSsbUG4gynYgFyX+kArlfE9TvXTwAR++UnKdNcS9HmDPyjrmYjDnZXpEzTL+fEiKNqBWoyocDMTCjwHSQJR6E8wkPllOFkjwumrcZg2vohIkRilZsWAI9nQoG7KjxmrfFLhuN4sare3xSk3rOqaMpt9t/7yK+BPh5xnlyVfAoV2HDwG/MUcut0e+dSiHJ3EIW8e5fh/1tbShF1fCwa+RB1NcMjkYgEL6lYNLIIuSGpdk+qEEeA+2PRSK1NH6OZfyKhZX4azR2QEtSl5KB38w7FBTxIRMsUigt4EK/+aWQFPBQu8qLiesQb3c95c0vEu30SQNgwLkLi8PdEHc0yBvH1+j2FM21ORrQAf8RVfdRN2DB2RD5rhzXDhrGxommh60xDasLfEzaM5aaKY7Wr0JEJBR5EvA1/SuVsi7dmQoHHhto5mLYOQDQB1yHqoUpTtrf/SCMTCsxG/f+aHExba8WikReRwhOlcHssGknBYBGaUgPNHwH+VqxRmWP+C0l0UYwen+P9yE7YyxrxRNIvVfK/UAtbgHQsGillsXpW8SaAeEefBmCPeyKl+UFY1K8s9KgjbBj7Awe5DiWRtKw/RBISvY0I4e8hWh533nR32NuH5OdVd2MpzjuPG8kVWn558Z227sXGJynTLLmwU9gwtidXiN6IaBxiyO79FUSDdlDKNBeEDePn5H6nP7HbxZAY8yRSgOl1ZPftfh9vuub9CLle+DFPZTgnF8EfyF9I7K54K+7QRCdR0F3Ib9it8b1Q0XdEUtV68g622vrKYNq6CVFftTP03PGLgV8OpWMwbW1J9bN63ZwJBf5dxfFryaOos7vtBtyO/PiWItmfVGEpS5GFlPf/9RNEWEbJzXPt0IeEyvyiRAFYypj9iHD/eSwaUdqqPdyKhPe4KynOQW5CS8it5Q2yO1HtDLDbH4GklXWXqV1IiYI1Fo3cF08k25FcFKv4NPs30BaLRt5y9bs3nki2ILscv/k9A8TshZumMrjTu96cMs2cnV/YMH4KTLG970/znOskm1jmxpRpes//0PVSmevep+2TRdqe5HpZ7i7efU99KGWaR3vOnxo2jBXtSm0bImYKh3uA73nr3ocN41Rgaso0v/Dks78mZZpXu9qthaSbduTZlvZrh6NRa7x2x1X4xk6p6w5NPDplmu+5zjeTTQ29RtgwVitnIVQvaiLkHTKhwGfAccG0dR2SfWjXIQxzRSYU8HXg8COYts5AdtiNyM16LJWPCV5I6TuuupIJBWZSZKGVCQUOLnQ+Fo0sAI6JJ5JnAfsgQmQa8vm+DvTGopE8Bz1byJ4UTyQvQNLEbmL3s1z9PvH0aQPaCsyl0JhvAA/FopGPPH0OKTDeAPA921dgS0R9/6hLne332Z2HT8KLeCK5JeLHMAPZvd0Si0Zm2te7s8CYzpw644nkP5HPelvE5t6P7IKeiEUjKpW+s0DYFLmp7Ypor5x+T/r10wwLtxPpTmHD+EbKNAcFpx2a5afZVCW/ceMWeM8WmYd7Z6pKtOOm1PzvKtz+H5uGDWOXlGk+7W7gKrH7Y7ImjDeAI1Ux5HZ7p4/7fXjnNgvZGDjybNDUFjaMALn+Dn8BjrWfe0OnNyG7QZjjFvA2Xv+gkVwyfJCaCnmHTCjw72Da2g3JuHQpububQnzKEFPRZkKB31CkcE4wba1A7i6wkfyFwBRyP7dxZD253x/iAmQFZGeYyIQC1Qrnqxp2PfKianVFv08pXeVflzFtAVgRIRiLRr7Ax2ZYxhgLkN1EWY4/tkbkcepbavnrRJqs+noTpOb5u0g1wFuABxR12J1c93kFWjy4hfzxYcPwpi4GuD9lmjFyFwxtYcNQOUL3pEzzBPIru5XDE2RTv64L/CtsGB8iNvc7gHtSpuk4IrudYS8tliTG9rx310PxapxOJrtomIWYYh3ORnLNAzyJbPQcTfIWYcNY2eXBX6yQUNj1/NWUac5XtBlx1EXIA9jCrDOYtm5HvCt/UsJ8znTizjs7ujZsa299p7Oja2fgzbb21oLV50qck+qf9vlwx/UjmLYaEI/y3yAOYospzV6s0WhGNjcgoZbuCJQNEBNXBPhv2DC+mzJNbyKvjcnNdV8sze1KqKMonPvWViW0dVTO7nHLqrWRMs277XK4bvPAOshG7hjg9bBhHIHY2ddxtXFXlvPD/R6WAcmwYYBssGaQNW0AnOlk+bNr2zu1VAaAU1KmOTtsGK+SDWcNIXnqIVfITwwbxin283FIKl734kTllzMiqZuQd7Dj3H8eTFsJpGawXwzy/4DOzo6uqYia5IzOjq7/Il7gt3R2dB3W1t76TE0mXQGCaSuIvN9dXId/E0xbt2VCgap7OAfT1voUV8l9iajPHwE6M6HAoAo9nkiuiDrx0Q9i0cg9lZpnJYgnkr8BTvAcfiIWjYRV7TWa4WKHcR0VNowbke/evuR62e+IeGlvaavuHdwC7Q1vrvuwYayLmKEc5qDmubBhrEluxIpf2+fDhrEO2QiRfoYQEZUyzePDhnErcBISVbWC6/SmiDOr25dlUYm5AtyLD8fj3sti4IyUabodcK8kq5ntSpnmf+znGbJCfg+yQt6tIdnJfqh4HvH4Xy6ou5B3yIQCrwIHBNPWIUjxmOmeJqdkQoFlx3d0TQJMREVjIqqvDYBHOju6Dmlrby05rrMeBNPWuoiJQqViWwuJf62FXX8MxYs6rIjkhD4AODOYtmKZUMDJNd3g01/l9FZvJpE/V52jXVN1UqZpAmbYMCYi/hA/Ag63T2+GCD/3br0ce/wrKdP0zWEfNoz9XC/fSZnmRgXauh3nXk2ZZinOqXmkTPNB4EG7BvtOiMnCMVusTa4pYmLYMCalTLNYwiv3wuclxDa+AhLO5rCru5hO2DDC5Do/HhE2jEOc67qO7+F6Xih8DiTvwN+AX9QrD/1QqHoIXblkQoE7kVXWOWSznd16/Gt3zOns6Fq1rb31U2RneQfwEVl1TABIdXZ0DcWZr+oE09akYNo6B8mEpxLwDj8Lpq3ptZlVWQSArmDa8itpqdFobMKGMcn9OmWai1Km+Sj5mTW90SPF7OLe+uuFcC8Yni3Sdjj2eNX7XZoyzaeQaBS3EPfu3EtJluYWvhfYEQIHkKtJHHSis2veX+EZYzKy0F+RbIZNEKfICfYizB19cgLyv2oHvoMsBlZNmWbULvCz3FCVnbxta87ZOdlx1yWRCQUWARfaWfN+g5T8mwFkOju6/oGki92P3FUYyI7trs6Oru3a2ls/YQRgfxZHImVWS0lKMRHxBlVlaqsVA6g9vcchCWa8qm+NRmMTNowgcJ+tur4VEbCLkd//Ka6ms8j32HYLNFVIo1twr+yyG3u5nVzBPbVA21vIXTys4tP2i5Rp/tV70LZ9Px42jIeRuur/Q6Ja1kWEvLMAWIQUw3kMKTML8KewYayEVLebi2gzg8hG6Fcp08ygKG+bMs1ldoW48+zj7UgsPMjGb4b9fA7qBU4QEfYTENPJIrKb3s9Spnmdos9ySWMwbR0DNJEb8hEgG/c8gew/aYynndvTfAL+mZ2WBdNWsNz48Uwo8D5wdGdH1y6ISuv7SOrCY1TXQL6shyKJFEq2t3aKCeCUtvbWgt735RJMWzshdiFV0oVCHBFMW3sNJ+HPMJiD2PHORFJUetnN/rsUdda7j6s0L41mxBM2jOnI72IqEqp1bIHmF7vt8WHDGE+uE5lKyLuF8X72Q4XpadtkP1TcSa4g3d9+eOlGUikPEjaMVRFb++qIk6E31bWbq+1EOD9DUtSOQ2TNNfbDy5SwYRxFVuYsRTShDp2I03YDsEPYMLZB8uS7zZ2/SJlmwjtw2DAeI7v735Pc+9aIqiI3XBozocANwbS1ANlplpIqcSiMQZJ4qFJplsIvEDvWTMQhZDfXuS+Q5CAzkdXcEuD/Oju6Dm5rb727xPG3QdQ/FRHywbS1JhLq18bQk/5cGUxbOw0nde9QyYQCfXahIZWQnwYQi0bmo85RXxTbaW835Mf7X3fyFk+7NRDv1/WQheZc5AeY8UtoE08kd0LUbh8DT8WikZLrEsQTyYn2vDa357YQUS+mvXH7Go0Pc5Awue/j/9tfClyCZL5zsznZTdNiPLt8285dSpGjhcj9sJSa8/OROgeltFU54y0E7kciBvw0wwNIUqyzAVKm+V87sUwX6rTTDisiOSEcXnGF4ZEyzXfDhtFL1jZ/LLJBcfxtnkOSaqn4D1khvzu5i4dycwSMaBphsK56CvgZ4vi1QsFeQ2OvYNo6OBMKlCp43SQQIT+dXIe89rb21k7bDv8w4q1+LRKWdj6iAiqFQ4AvOzu6dmlrb326WGM/gmlrAvIZnsnwHbu2RxYJfxnmOENFWeTBIZ5ITkX9Y4jFopH744nkTMW5o5CbyRVkV+cD8UTywlg0cq5r7CmI6u1o1Jn0ZsUTyV8DV9lJa4gnko2IitKdoe+9eCL5vULvw+47Fsk6dirqEKNldhKaH8eikaqFVGqWf1Km+RVwdNgwzkY2Dtsg36mxSFjbi8DdKdP8UNH9U0QTCbDALdBsGinNjDcf2Vi1ltB2nj23Qn5CDnm2ejtW/ISwYVyIOLpti2y6xiHROS8BKW8FupRp9tq54w9AhO3ayKJoDqK1fQxR+29A9jNRLbRPIrtAmYtoBm61X7/oiVxw8wf7GiCfwWwkjh7UGpTllryVZjBtrY2sMlUVwYbLa8DWQ6nO1tnRdR/54XWvIzt5987+e0ga1e2BvdraWwsm/+js6AoAbyEqq83a2luHpG0Ipq3DEG3FhkPp78NnwCbDLaerwnbuUyXumZMJBaYF09Z25CaVcHg3EwpMjyeS05CYVy+HxqKRO+OJpCqpz8X4Rw7sEItG/mfnf3+Y0rQ+V8eikZMB4olkDCmQ4eULJBbXexN7NBaN7GP3vYzS6g38B9gtFo0sz9UFRyzxRLITeCQWjXTWeSoazaghz7s+Ewp8lAkFWpFwD7/SfkNlM7Kl/solRm4hAhD71W6IOugQJAdygqyjhTe/uIrzkTSfx+FflMSXYNraJpi2HkYqm1VSwIPYuZaLNLklckaBcwfYf5so3azzk3giuaP9vNmnzSrIwk+Jne71lBKvtxNl+HpoNBpNvfENocuEAk8jzhuV5vxg2ipbld3W3vouou5VqZGfbGtvvQuJnZ9ANkzlm4q2g3R2dB1NNgRvJvk2Ml+CaWv1YNq6Htnt7lNqvyFwSjBt+ca3LmcUCtl0Uk+qEl28DZyOOlf0IfbfQra9Qn4RB6I2CXSj1lQcojim0WiGQdgwVg0bxjfChrF12DDWKN5DUyq+IXTBtLUGYluuNKsj9s9flduxrb31vs6Orh7yd1P9nR1da7W1t77V2dF1HVIAAWBjO7Y+x47a2dE13r7+2fahucC329pbiyY4CKat8UhCi3MonkymEoxHzAClxJOOdHoQe/xdZCM2vGyjOHZLLBq5NJ5I7k5+VTxHezKBfJ5HfCTigN9CaYbi2JuxaOQgu/DORZ5zqvlpNHmEDeNuYP0izfqQCoW3kV0EX5Ayzds9Y+2BeKA7C9bbkeqB3u+nwxfIBiSZMs1X7TEakZKpqkWtm5n2nP6FemE+Hyksc2vKNFP22CchFSBL5ZeIg+LxiCbNHVVA2DA+RkyolytS/2rKoNDO6gKqlxXs57btvyw6O7oOQF0mdm/g2c6OrrWRebtt2IMZljo7uiZ3dnT9AvFadQT8UkTAl+ps8RBSrrYWAt7h0GDa8guVWZ64PRaNPEBuvWwvKyuOOak9VU40hb6j6Vg00osUyfBjquKY4xT1keKcan4aTQ52QpYWxBGt0GO87ZT2kuvYb+1wOmesLRGt6nb2+XlINNRuBcbdD/EzeS5sGM7CeDNghxLmtBTx4t/e53wICWM2w4bxR3vsphLGdT8+Q5yKr8Uj4G3WQvJx/FFxTlMGSiEfTFvfIJuKsBpMAi4st1Nbe+t9+BdwWR2pPvYVuaUF1wHo7OhqQGI8f0tuUpoT2tpbHyljGl3Fm1SFK4Npq9gKvBYMp0peKQ5rgWGM72Wx/bdY2kw/VJ93LRd3muWXLch+f5YhXuOqh+PRfTbZ7+vG2LtiO1f9fWTz1b8CHGyngnXHti9wjenOdz8eiNu7eHfcfF+BOWXITaTjbuutq3Fi2DB2RRLfuMdwh7gu8Zz7Erlft7naPIWE2SWRinZ9iJmuFL8qTQH81PWXUVylM1zagmnrykwoUG4KxVUKnNsLUaNfgsTWrwg02gL+WvJV3n9sa2/1i6P0IwmciKxGa8k3EKdFlQd5NVCpsUHUgF8XDlAcG2reA83XC7dZ57GUae5bqLEd8/0HslEevwobxp2IiWtd+9hHwIGu0qhuoX1gyjQHI4nChnEk8A/75ZrIwsHdPmmXl1USNoyLXS/jKdM8yXVuBqLKd7Rae6RMcxdP/1uRdLAgSX8u8Jx3Z5T7R8o0j/KcXweYkDLNr9P9pirk7eSDaetA/CvBVfravy3aKp9idcvPRuxVjhr3DMR2dbyn3TOUFjaVg52c5uRy+1WIC4Npq9o7yRWCaesB/DUmz1b5+rXmCeS9uh8PxBPJS8gWEtFoymUoZVt/TbZS3BpIvLazW58LNKdM8z2AsGFMITdniHezdJvn9QC5Qr5Ywhff9Lop03yT3KI6OZXyivW3WdP1fLJt3nBf48OUab5dZI6aEsjZyQfTViOyi68VBwbT1jczoUAhm6mXNKL+8vMnGEOu3X4rRZsFwJFt7a2LFeeKkgkFHg2mrVupvRBYDUnj+LMqXqORwlEJ3ptHLTgknkhOR+yJFSUWjSQR7QwA8URyXyQVsXaw05SE7V803n1s4PJjd2lYIrJvYOy45oMOPzIvo9zAhMnPf3nSNU6+dT4HVrr25GvHzpnlhJpOkz8NfUs3/MYP5xx1+tzgGSLYl9x+xTbjX/u3aJXGjP3k89P+Oi14RrYE7dK/XbD3uPcdOdyw6MuTru5f+U+n7MAyCU4aaBwfPejwI50kM4Msm7rq/V9FLr2VS/9ve6ftko22+SKYvmm602aF3r9twNM9OzqWu8Vb7f5O8Izs+caP355A59mDmsBFO37rS/d5gGXXnPjJmHmznZcGDWM+OuiI7z62bMrKTy3cpeWBRdvuo4pscejLhAKllKjVkK+uj6AWitXksmDa2qGM9K1zERuVX1x0KZzb1t46XI/NXyKe3iqv7mryo2Daui4TChRyXqsW9wH31uG6jrNO1bDj5X8PHFTN62hGJd14vp8D4yfiCPmG/qWb0r80z7ls0bb77o9Hmzj7uEtY+erjaejLZmOev39r48KdDrjZ3W7Jxtsz/jUpBdK32nprjnvvZUlsNTDA2C8+YuxX2eRwi7cMThyYMPlNR2gDNPQt2V7lIbNwx/33b1iy6Hcsy96O+1dd9x+TH5e1/RjrCya8/h8cAb9kkx2xDj7pnpxBxmQtvQON45i3f+vD3uvMPu4SVuw6l7FffWo3XLZyw6IFh4xdtOCQKff++dKxn73Lgn2OYmCc8vb6LvmlyDU+DAp5Ww18QYG21WJbJH1pqQ5ty+y222A71Q2BqZ0dXd9HUi8OAA+0tbeWVVglEwq8E0xbVyDx27VkHPJ/OqpYwwqyCCkMdGomFBiO492IJJ5I7gOkqE46Z83XjIaF83DtUn3pX3Vdz5EBVnjwhhwBD9D43iuwU657yNjPsxvZxk9nsuKN6ki6gQmTWbDXkTTOer+kufevtj5jv/gQt3/tpKe7lW2XbrAllpFv1h87673seKusAw35Stdlk6cyu+1iJqfvYOLzj9Kw0OXPt6yfSf+5jzHzZmMdWi/L6OjBvZM/B1EH14OLg2nrlkwoUIoX9C5I0YHJQ7zW+8D1be2tH8JgBbrDOzu6xg/BCe/XSOKdWidvODKYts7NhAKvFW9aNkuAPyEe6bOR0J7HM6HAnEKdllfiieQk4EbUAv5dqle0STNKaXQLuRVXY/ax6rpXA+Nzd6mTH7uVic/nF56c8NrTLPzoTfrWzvrCNn72Xl47L32rrcc840T6V1qDcTOzZvElG22D9e2fqOc0YRITn380e2DM2MHddMPibBqReQccy6IdmlD5oTbOyi5A+lf3r649MHEy8/f7AfP3/R6NH7/NuHdfZuJzDw/u7ie8+i/mLVrAwMSh3uo1YAv5YNraHFD/12vDukhChKJV4NraWx/t7OiagSQ4KTfF6FzgWEfA2+MtBP7a2dG1UWdHV7StvTWvLKEfmVDACqatM/GvdFQtGhDtR9kJhUpgYSYUOKUK4w6HS5GICRUlV5nzwUCdLe8ypOpWvQoEaZZT3AK4f/X1ShJSE//3IJOfvGPw9YI9vsO4919h3LtS+G2Fh25iztHnDJ537+QXb70nyybZa9TG8SxbYUWWrrMJfWtvjCOE3Tv5/tXWLzgn99gLdzqA+U1HAzCt81c0fixWzjELLfwCTca6rtW3qr+QH6RhDH1rz6Bv7Rks2WI3VvpTdvfe0L90WDG7mqzz2uUUyH5XI04Ppq2SNAm2av1gpJBJOVh4nLc6O7o26OzoOhGJ/xzT2dGlSqtaiE7gv2X2qQQH1+Ga9WJRLBqZzfAFugqVM997iBlG3180ZTP2s6yQGxg7jnHvvax8OCrq8a//hyn3dQz2WbTN3izY8zDm75MtuTDu/VcZ/6bUi8o1BzQw78Bjmf/NVnnscxQLd262d/1ZITzWvfMfWOY/p76luYuU1bJCetE2ew0+n/DCY/j9PBpdi4T+1bwmCRj7xUdM6zo3T03f0L+UCc8/Mvh62eSp8tnc++echYemPBqDaWt7JDNTvZmKmAx+XKwhQFt760BnR1e5tdbXwZUBzx7n3c6OrmeRpAuvA9PsFLkl2egzocCyYNo6BShY7a4KbBFMW41Dqei3HHMj+bnt72J4+eRXVRx7JxaN9McTScUpjaYw7l3zhFf/xYRX/6VsN/u4S2j44iMCd/0BBkRgLt1wG+Y1R4AG+tbemCWb7TzoYLfCwzezZOPtcnfl01b1c07zzCkruCc93a22szc08MWpnTkCtc8lpBdvsRtTHvwr9Pcx9qtPGffB6yxdd7PcIRYvZMycz5X9AcYsmMvUf17K2NmzmPLhG0wBlgVWZmDsWMZYs2noz67jl663GVPuFSVpw8J52j4/RMZQn5jvfqSq3Mue48cH09YmpQxgp7AtNdXrMmTx8Htgx86OrnGucTYFdkQS6SwD/ok6CYovmVDgCbtfLRlH4aIsmtKotwZLM6oYyFFX+zJmLAMNDUy99TIa+iQ5XN8aGzD3sFNyvNPn7/3dQce1sZ9/wMTnH80Zv3+1YqnxYYz1JQ2LipbloH/a6rB0cY6WwO0cODBpCotnZBVfE9y2exv3AmFgwmSWTc1dQ8vYuWr+MdaXjJ09K0fAL958V/rWzBb1VGkENKXRSH3UvtdmQoFEMG11IElqLgBWsudzCdlMSYN0dnStDMxpa2914kD2pfTsY7cgHvmPIV75V3d2dN1kP38Osbv+2b72Z6gr3RXjNOSznDiEvkOlUO0BjUZTYxoWL2LRdgWT2wEwMCnA+JkvsWjrPZyeLAyGGRife/voX2Vt5n2rjbFffmSPv4D+ldZg4c6SCmTp+nnh9/lz6ls62L4Q/ausTcPSRYNtB8ZPytMSLAyGWTZ15cHzeYxtHOy/LJBf5qFv9fX5KnYZE177N+PeeY7GWR/QsGg+DAwwsMKK9K2+Pos335Wl07emYdECGvqWMjB5Kgu3byo6f42aRkS41pKvgPMAbFXzH4Jp6yakrvsJwGHBtLV7JhR40tNvL+CIzo6uVlvQ/xcRxqWk390byRHtZGH6FnBDW3trTvGDzo6uMxFBfw5lkgkFZgbT1u+pTuU+P74s3mS5YySZH3QKW01ZDEyYxPxvtlZ0zEU75OemWrLJjiX3719pjbLmVKit4yDne37NDXN24ErGNrJ4y91YvOVuBZsNTJzMgr2OKDyWpihjGNqudTicmwkFcoRTJhT4MhMK/BiJmX8ASZDjvcH2Ad8H/tnZ0TWhrb31VeC7SHrat5DCDX6sSW6axcva2lsz3kZt7a3z2tpbf9TW3jpU4fkboKx4+2HwfiYUmFu82XKH6j0VWsipUmo6TLP/lhsa6uRfKME1WKPRaEYuY4D7a3i9l5EYbCWZUOClTCjwLURYbuY57cSEHwY81NnRNb2tvfW2tvbWHdvaW2dQPJzsM9fzqoRFZUKBedRuJ6/25ln+UeWr3jWeSG6EOtXsZ4pjDkY8kfwdkJe+swgz4olkmtonOtJoNJqK0ojYooeTIrYcflaKN3gmFLjbe6ytvfWNzo6u1xDhHwLe6OzoegopfvA5sE+BIecB9yCJa0Bio2/t7OhqRMwAjtbg8bb21iWK/uVwA1KlbudhjlOMG6s8fr14knyfjP0RbY1fe8gvgQlSJevUItfzq3JVWJeo0Wg0ywGNSAjSq3hCy6pAdyYUuG+YY5yH1IwHmfue9qMYUxC1/oGI6v47nR1dDyF5ym9FkvFsjSx27hrOBDOhwIAdUuf1Kagk7yL5skcjNwEXAwqvnjzeApwMIq8Bu/u0+xx1qBwUrsb1MuD1bFohnkiOjUUjtTZzaUYuLXgK1Giqykjy2xnxNGZCgb5g2vopUre4WvQxzMppdk34e4GnKG2X9RWSLCeM/AB/h8RYr4XYzXcH7gbaEGGxBXCVd5Bg2toqEwq8VM5cM6FAOpi2/k718sufkQkFhqtxGJHEopFP44nkcUg0RKHwtncBIxaNOJ/DDcCxinZp4H/ASYpzIIu888lPX/sscJF93k0jsD7wToG5ab5GZEKBj+o9B43Gj0aATChwbzBtdVO9pDh/rFCe9YsoTcAvBZra2lv/19nRtSWyO58BHNXW3npsZ0fXJsBPkTz4DyOq9dvb2lvnuwcJpq3V7WuWa9MFCak7hMqH1KWAv1dgnM/Jmi/clLp4WODT/xn7r+rcE/bfcxBVupvBnAmxaOTmeCL5DCKY90KE6mTEKe8VwATisWhkrqvPY/FE8vuIT8QMJPLgn4ivxpbAfzzX+8TuNz+eSO5h99sRWRzeh6RNbvR5H6NygaXRaEYfgx7swbS1GfACkmSlknwObJoJBQrVBy6Zzo6u/6N4xbpft7W3nuXqsxrZWPjxiCrYSUX7GeLMl25rb81R3QbTVhKYkQkF9hnKXINp6wIqm1/+XWAHb3SCRjMaiCeSncAjsWiks85T0WhGDYPJVOyd9h+qcI1zKiXgbZ4ErgbuRJ3L/DM8xUza2ltntbW3GsAs4A3g30i43kJgO6BBIeB3Ra3+LYdLgUqp8j4EvqkFvEaj0WhKxWvzPB+pblapkrMvAiVXdSuFtvbWt7FT8XZ2dK0LHIE4Vf0IyX//87b2Vsun75OdHV3bI+rfAWCttvbW++0UuYME09YYZCExrGQomVBgfjBtnU5xzUMxngS+mwkFPizaskSCaWsaUvmvEE+pnCWDaesXFK69fmcmFHh2yJPTaDQaTUXIEfKZUGBOMG39CriuQuOXFDI3VNraWz8ArgDo7Oh6GAi0tbfeUaTP/zo7ujYH5rW1tz5hH/Puto9D7PWV4G+IbXnXIfR9G8kZ0JEJBSrtzT0NOLdImxsR+/QgwbQ1CdFQFFoAzUQc1zQajUZTR1Tey0kkvey2wxzbzIQCDwxzjJJpa299sIy2r/qdC6atlZAQropgh9T9BPgHasE4j2xIyFzgU8Q34iEgnQkFyq20V0mmK45twghN92o73l2rOLVBLBqZU+v5aDQaTb3JE/KZUKDfjvMut1a7m6UUT0IyUrmQypkrAMiEAk8DRRI6+xNMWzOAozKhwEWVm1VJTFcc27TGcyiH8cCKiuMjclGi0Wg01UZZxSwTCjxCfnxwOVyVCQVeH0b/uhBMW9siVfHqTjBtjQmmrb2CaetvSNhYLdMPO6wdTFveJB9b1GEeGo1GoxkChZKN/BJJ/zqhQBsVs5DYcsd+ey61Lb96TSYU8EuB6otdEOcP5BdDWTOYttoqMbESWAlYA9geid13KgT+1dYG1JoGxEnxTdexYe3k44lkA7BCLBpRpaEt1m9KLBpROlUOc05TASsWjQxUeuyRSDyRXAFYHItGdOYwjWaU4yvkM6HAO8G0dTnlF1z5VSYUcOyfpyJJYWrJnfjnOS/E94E9FMc3AzqGM6FhsgA4o47X9wr5stMfxxPJ7YCfk01sQzyR7EMS4KSAK2LRyOeKfrsikRR7YVeGiyeSy5A0zCZwVSwa+dg+fhSSfEjF6fFEMhOLRu60226AZGA8EJePQTyRfBd4ELgyFo286JrH6ZS2UL0SyaA4zXP8kVg08og9R+/nNzMWjXT6nMvY8/mZ/d5WR3Il/CYWjTxoz+37QATJ2PcVkijpcveCJZ5ITkHqKRyOhIyOs49/aV/julg0Ypbw/jQazXJGoZ08iGd3G7B2kXYOLyCOewTT1hqINmDEE0xbASTt7Ujk0kqGzg2B6Z7XZe3k44lkBLiefNNQI1JVbhvg2Hgi+c1YNPKSq99xSPil154+BslgtyUQjSeSB8eikSeRFMLf9pnGaUja2zvjieTuSMSAKgRwAySy4ph4IvmjWDRyvX38dNS2fi+dSFiiN0UuwCM+c3zU7qc6dxWSce9I17GNgb3iieRuSO2F8zx9dgQWA9cAxBPJ9REnzo0Vc1oZyXLZEk8kr4hFI8NKPa3RaEYeSpu8g106tZxd5CmuUK/zkcIwywPnIDntRxrvU9vFxyeKY9OdJ8G0tRaSi6BQ+0HiieSGSGnhgt8zpGjQYC6BeCK5JmI6KeYwtzIiuKcVaeeM24BoZQrF+IMsQK6LJ5KVCqMcKt8mV8A7NCILoHN8+rXD4Pu9FbWA9/LTeCK591AmqdFoRi7Fbr4Af6W02uV3ZkKBhwCCaWtzRIU44rHnekq95+HDaZlQYGENr6fSGEx3Pd/Mc65YWFor+dqiZcB7irY7xBPJ7e3nR6FWj7+rOLYqksCpFPZA1PNe3rPn5eVHJY5bLaYXOLcd/r9fp3LerpRX8jhWRluNRrMcUFTIZ0KBAYoLwaWIzdXhN+Q7sI1UrqG42aIePEVlCtGUwzzyi69Mdz0vV8irigldb4/5suKc0161g+6MRSPTkc/Fy87IZ+VXJvhSxFdDNe7L9nxUKZ13sv/ehKj7nceniraLKKLZGALLkHn7pTK+H/XCzHGWVb3fZYhj568V50Jlzk+j0YxwStnJkwkFMkjmNj/+kgkF3gYIpq0Q/g5QI4pg2joM+Ga95+HDKfYCq9Z84Xm9vuu5V8jnOct5UKmJ37adwlSlWp32qpwCzi7+TcW5FWPRyN8RgajiEtvpTmUrn1VgPpMBYtHIibFopC0WjbQh9QxURZwejUUji3yuP1QejkUjh6JODf1eLBo5AE+dBg/eSn8AH8eikWcRO72X6fFEsqR7gkajWT4o5wd9OuLp7WUpubuC3wxrRjUimLYmY6fEHYHUK2QO4GPP63WDacvRdHid7orlQlD5ZPR5/qraF7KZDycD4NTiTYqyI2rhWY08Bh/Yf1WLB6foU1mhiGQ/d780yZX4jDQazQihZCFve3irVHx3ZEKB9wCCaWsvJNxpeeB0cnepI4V6h8x57eVjgXXt595EOG8XGWtSmdd21MwjWdB8y+d4PZIVDYdp9Z6ARqOpPuWq5n5PvvPTTa7n9XZUKolg2tqIkRveV++QuZmKY9PtzHfTPcd9awCMYlRC/iN3XP1IJ55Irs5yonHTaDTDoywhb3t6/8J1qB94ACCYtqYgGfKWB66k/Ex+teAD6h+vrxJW0xGvdPf3ZTHFd/LV4EQkE6D78YNhjDfFTtazTrGGdlIZlTPhSN3FX0L+Z3UO8F+GkNRIo9Esf5TtVZ4JBW4Jpq3HELX8i5lQwLHT70lt09cOiWDaamHkLkZOr3HInIqXFMfWId/D+xX87bpVIxaNLEDtGzJUdgT+V2LbvVE73d2nOFZ3bEfARQB28pxLWH7MaZoCNDW3PA4E7Jff7e3pfq3EfvuS9UX6qLenu6WMa14B7Gu/vLG3p1u5IWlqbjkYuGAo19BUnqGGjp0MPEOup3M58bh1IZi2JiBZxEYi/yLX9FEvVKFtawPzPcdeqMFcRhoqVf0Aknp2RBJPJMcCVyMaEM3o4RtkszCW4/uyItky4tPKvOaGrr6PFGi38jCuoakwQwqXyYQCzyLpa+e6Do9EJzYv3wdm1HsSPtQrZC6HTCgwl3y/i9XID2tTLQZGO/srjv1XlXd/BHEZWsCPRi5BsoqeT+XzM2hGEcNJAnM2ucVnlocUtmkk5E+lcq0nN9m5CEYKL5EbU74W+d+V0SLk30KdCAdci9h4Irke6jK7I9UeTzyRXBf4seLU54iQuKy2MxrdNDW3GEjtA5ACSmORvAof9fZ0H9bU3LIC4px8EBJB8hlwL3B9b0/3fNc4k5CFWQuwCmIqM4Hrenu6HXPeN8iGmk5y9d0QSV4WRPyOXgM6enu67y0y9xl2v+2Qe/kyxAn39t6eblWOlMlNzS2XIep7C7gZiPf2dBfcqDQ1t3wHyYS5ARL++TTwh96e7rddbXZHSn5vgpiAPwMeA67u7eme29TcsivZCKQXgY8Qv5zxiFbtgt6e7oX2532j6/KnIVVRt0RShp+L+BadCWyFJPe6tren+x8F5j8O+d8chvwPXwAu6u3pft3V5jtIxte1EL+lq3p7uh+1z22O5JG5D/gVsnl6zp7DOohc3QDRkp9VqhmmEEMW8plQ4LNg2rrUdajSiUAqTiYUeC2Ytq4k13mw3ixCwvlGEi8gNxiH1clfGC033uRF+CAWjVxZQjvVLh5GqD3epgl15smDGZmOp8s7G5MtMrQ52eRR7zY1twSAx8mqsR32B1qbmlv26O3pntfU3DINUYV72+0LfLepuWXv3p7uxchCwVHXnwfQ1NyyJ9BN7oZrW+DIpuaWM3p7upWJk5qaW9ZGhO1KnlPbA4c2Nbes2NvT/UfPuePI1QTvjZj1zlVdw77ONeRHYO0OHNfU3LJ/b0/307Y9X5W5cn/g8Kbmlp0Q4el8zgeS+13eCXnPLcg9y130aXckDTZ2m93tNu7Pa6+m5pZPe3u6H/F5Gzcjn/tpSOKwduCJpuaWrXt7uj9ram45GfiJ/T5ftq/xj6bmlhN7e7pvR+p0RIADkPv+V0hGzluRhdXPkMXG8fbnMGwH2WGlc82EAp+5Xr4/zLnUiguRVV+plfWqze8yocBI++y8u/S1yDr5gNjn30GdQa6q2FXtvCWBn4lFI1cPc9xvIeYcN5/HopFT7ecqe/w81Gl2Rwqq/88HsWjkqXgiuU+tJ/M1wxHwi5Cb9wVkBfcdSBbDVqROw7bIxuNc4Leudu8hN/rvIgvtXZE6DX/2XqypuWU8smt1BNajyG/0GKTQ04VNzS2dPnM1EIE9B3gY0f78DPipff6bgFfI9yPFnrZDnFcBftnU3OLnjHcgWQH/FhLCvCkSyjkVSXe9Pbl1KC5F7tc3kf0ue7NoTgB6EZOFE2XT3NTc0oREkbhpAJ5HKl+CLGoWIb9hd9TMASh8Duz3sD2wVW9Pt7OpPbOpuWVnZAF2sz3fnVw7+3ebmls+RAS9U855I+CbvT3dM+1xzwOeBfbu7el+2j52BnBKU3PLOr093cMKqa5kCstnKjhW1ciEAhYjZyf/EfJFHml4neoC5Fbpe6WO/gN7IDcu92O/Coy7pWLcwwHsVK9Nij4PxaKRpRW4drVQ/b5rHhHxNeYwRKW+JfA91/HnkEWAO8/Eofbfo1zHftjb0/0TZDFwlf3wqxcRAtazn88HDuzt6W5H7nVXIUJ6mqpjb0/39b093dMQE0CnPQf3b8q7wwe4oben29mROt+pifYYKv7P9fxZxIdrETDLPradbWr4ytXuNODfiLr+MmA3hfr6c+S9Ho2YPhyaFXM4HBHSs1zHLunt6Q4h5hAHP0fGg5D37dVaG8iibV/gX27VPYCtqp9LthbG+46At3ESkP3X1WcR8r8etmm5koVZ7kX+aSM+jA5RufyQ+ocTnZEJBbxe6yOBV5Ddh98iUBVmN5rZjqyaz82Itcdr6s4LvT3ddwA0Nbf0AWu4zp2naL+Jrap3a8xeA+jt6b6P4mah9VzPP3YEUW9P9+XuRrZNGM+x9RAtwJ5FruHmVXv8L5qaW2YhamgQjUOx+X3HfnjZBHEk3ApRc4P4wWyBqLjPampu8WrxZvb2dDupml9D1Pd+85jZ29O9rKm55SPEmRiyTsZ+RaDcrEu+dsARyDQ1t6yDusImiFZlDWA2uQsZkAgd3H4ZlaRiQj4TCiwMpq3bGF5ikpqQCQUGgmnrJ8g/rF7V8v6NlPEdcWRCgUXBtPUW6rKsULqQL3fX6GgHFpfZr9r4pbIdyfZ4TX0ZNMH19nT3NTW3zCWbrrkdudl7mYPkgJhsv54OvNPU3NKMqOwB/tPb061yFP3I9Xz1puaWRvu6p5O163pV7g6/JyvgX0K0i+sBF/u0B1tt3tTcsiK5C+AvUO/83YWvrkP923kB0UKEEUG/CxKafSiyedwcWRy4zcTrNTW3NNgOf25VvleQVoJZKBYPTc0tmyH/sy/IpgD3shbFq3ZWhUpXnLqI5UQdmAkFngP+VMcp/GwkhMwVoJBjXalOd5biWIPnrxvnR1Bu0ZViOI45Q000pBLy78SiEVVFvELXHwmM9/zVVAevGSflet6ELAK2RDzaTwF2sAXV7a52Vzc1t5yF2L4dE5KqsBNI5JAj/KYCf29qbrkcqTdyDGLr/sinr7u65JOIVjbo09ahvam55XzEYczZLM4B/uPT/m7X830RgTgGsf+fgmhWv0R8Ar4CnkC0Guch5g0Hr8xaA7jR9vR3OwuXmuCqHB4Evt/U3OKdw6+R/+nDQKipucWttaGpuWUbxKfgX5WaSFNzy69sH4GiVFTIZ0KBVxmZNmY/ziHXPlMr/pkJBZ6ow3XLoZAgL3Unr4rfXdvz140Tb67q5+wOVP2KZcD7fjyRXJ/cHYCDE4a0iuKcY3vbXXHuvXgieYjnMVnRDqA5nki2oE6JW2vWiieSP0RuqpracRrZqoJHI8LwYsQrfTvACdv6Jdn6EVsjGydHaKSR/CR52KF1UbKLi+8gznPOYvoXBRy43PeiGPI7cWcFVdmFJyD3T3ep7vMV9mqHvwI99vPNkJC42xDb/97APXbUgNtx73xEBb+r/fpzxGnRTR/i7/BzsvJsJtnPc8g0NbdMb2puGWhqbjnEPnQ7snFJNjW3rNzU3DKuqbnleGRB9Jfenu4PgGuBO5qaWxxNx/bIQuiM3p7uYWXqbGpuaW5qbnHMDDtia2iamlt+qTBjDFKN2tHnMoIzgLnJhAJfUfuKb4vIzS8wUvET8pZTdbAEVFnxfhhPJHvIOqG4cVbszyvORe1+Kgc4xxnHTx32e8S7WeUculM8kexGdhNe3rD/qna9eyM3HPdjdWCJou22wD342yurhV9Z3usQpzAVup780HkL8Ya/C8+uzRYAOwCXI4vkLxHfl+uAbXp7ul+y232M3MAvs89/hexKzwKaXPbne1zXmmP3vRsROLciC4rPkNoiRm9Pt5PK9mNXP8en5JeI49hMZNNzH7L7d9q929TcMtZ+T86xk5Dd+WfI7+9kpCYIZKMCBq9hz9tAPOzT9nVmIhqOJscE0dvT/Xdk4XA3Eiv+uf15xYFdenu6P/V85h8iC9Y3gE8RQdxkL3qWuuZxF9nNwMOuY8697BnXMee+tcB+/bHrPRyEmFoyiJ29Gdi3t6fbsemfjiwwbm9qbnkfiRo4v7en+1r7/Of29d048/RyD7kbmAOAh5qaW1a1P5M3m5pbzkTuXR/kdxcq6XgHQCYU6AumrcORf57v6mIE0YGsXnep0fUuy4QCM2t0reHgt1svJwnObYjDjJsAWecYN3PJLg5vJz93wCSffgPAP+3nbxWZzwPISjzgOa7yxAX4e5HxVHyAvy9DH1X4zRWg0GKsH7U/ylRKc0LSeOjt6TbJ9dL2np8FnGo/Co3zJeIV7xsF1NvTrfR96u3pfgY4okC/fyHJWNzH5iH3QC9dntfeyoVKc2dvT/dDwEOK4/2IX4Cfb4DTrhcJiyuJ3p7uOLII8B6fj+e92sd/qjh2NZL+2X3sM2//3p7uuYiG5Gc+cxkgGwmhOv8i2dDEYvP0/o9/jiz+Nuvt6T4LBkMnB8PxVFRl1Z4JBeYgyQuuq8b4lSQTCixD7EK1sI87KrrlgddR2//K8ay/j/xVqx/nx6KRhQCxaOTfyG6kFC6MRSOv2M9foICZwS5uc3aJ496NRGGUy90+x9+n9o6W9+Lvh3Cez/EVfY5rNJo6YWcB3BOJw1+5qbnlk6bmlouA//b2dBfceFVNNZcJBRZlQoETELXmI9W6TiXIhAJPo0gwUWEeA1oyocBIyQy4BFGPux+DjmSZUGApsivxtnm0yBjPYe8EY9HIAJJd7Q/4Z0T8APhhLBr5vef4DxD/Dj8nvJlAaywaGcywZV/vAGRF/i/PnN6z2zjFWvyckL5CbIGHx6IRR92teo+qxxJkl+ItNPQSoi14RdHH+czfUZxzduKfKM45JoovfeZCLBr5BGgj14zxMRJ3fbVPPz/vYI1mpPACshv+Kdlqd6OWpuaWKYgZ/DzEP+gpxEfpLCT6orupucWwTSp5qDycq0IwbW2FhEaEkHACP/vkRIYXa3/gUPLAB9PWasjudZrn1DLUXuLFGEA8SJ9HdoS32VqDryXxRHIFxA6/DmLjno8Iqpdi0YhvREY8kZyI2DI3QJx9FiImg5dcQngo8xmLJO7YFAl/WYII2v/ZJVqHRTyRXB1J+PFlLBp5u1j7amJ/hlsh9r03YtGIn4d2XYknkp3AI7FopLPOU9FoRiR2qeDHEJniNct8gGxW47093YObmJoJ+eWBYNo6ifxiJc9lQoHt6jAdjeZrhRbyGo0/ds6DnyP5AHbG38G9H/GJuw64T3vS5nI9as9ujUaj0WjqQlNzSyNSbGc/2/nvIUTzqGKs3fZuYEst5F1kQoE+JDREo9FoNJoRQW9Pd19vT/duvT3dL9ivB/DJmWDzIHZophbyHuwkNV7HKY1Go9FoRhJ/wT8DYmdvT/eroBNf+HEqlU+tqtFoNBpNRejt6f4ESZijoqupueVQ0EJeSSYU+JivQWiGRqPRaJZr3EmA7kWSioHI9n80NbccrIW8P1eSjUXWaDQajWakcS+SaGsOkv/iW2S10OOATi3kfbCTwfy43vPQaDQajUZFb0/3MuBXwAm9Pd2z7LTF30byiSwFDq9lHu3ljkwo8EAwbd1S73loNBqNRqOit6f7Bs/rh5qaW/YDxvf2dD+mhXwRMqHA8pJrXqPRaDQaenu6B7O+anW9RqPRaDSjFC3kNRqNRqMZpWghr9FoNBrNKEULeY1Go9FoRilayGs0Go1GM0rRQl6j0Wg0mlGKFvIajUaj0YxStJDXaDQajWaUooW8RqPRaDSjFC3kNRqNRqMZpWghr9FoNBrNKEULeY1Go9FoRilayGs0Go1GM0rRQl6j0Wg0mlGKFvIajUaj0YxS/h+AxXqoSYhmSAAAAABJRU5ErkJggg==",
                    width: 200,
                    alignment: "right",
                    margin: [0, 0, 0, 20],
                  },
                ],
                [
                  { text: "PLATO FUERTE A", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.platofuerteA),
                ],
                [
                  { text: "PLATO FUERTE B", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.platofuerteB),
                ],
                [
                  { text: "BEBIDA", fillColor: "#B6CAF1", alignment: "center" },
                  ...this.menulista.map((lista) => lista.bebida),
                ],
              ],
            },
            // Estilos para la tabla
            fontSize: 12,
            bold: true,
            margin: [60, 0, 60, 50],
          },
        ],
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.download("Menusemana.pdf");
    },

    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Menusemana");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.comidas = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
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
