<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <br /><br /><br />
          <v-card>
            <v-row>
              <v-col cols="12" md="8">
                <div class="mt-6">
                  <div class="v-card v-sheet theme--dark">
                    <header
                      class="v-sheet theme--dark v-toolbar transparent"
                      style="height: 64px"
                    >
                      <div class="v-toolbar__content" style="height: 64px">
                        <div class="v-toolbar__title">
                          <div class="v-list-item__icon">
                            <i
                              aria-hidden="true"
                              class="v-icon notranslate mdi mdi-clipboard-text-clock-outline theme--dark"
                            ></i>
                          </div>
                          Historial del ticket
                        </div>
                      </div>
                    </header>
                    <div>
                      <div
                        role="list"
                        class="v-list v-sheet theme--dark"
                        style="height: 250px; overflow-y: scroll"
                      ></div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="mt-6">
                  <form novalidate="novalidate" class="v-form pa-5">
                    <div
                      class="v-input theme--dark v-text-field v-text-field--is-booted v-file-input"
                    >
                      <div class="v-input__prepend-outer">
                        <div class="v-input__icon v-input__icon--prepend">
                          <button
                            type="button"
                            aria-label="Adjuntar archivos prepended action"
                            class="v-icon notranslate v-icon--link mdi mdi-paperclip theme--dark"
                          ></button>
                        </div>
                      </div>
                      <div class="v-input__control">
                        <div class="v-input__slot">
                          <div class="v-text-field__slot">
                            <label
                              for="input-3099"
                              class="v-label theme--dark"
                              style="left: 0px; right: auto; position: absolute"
                              >Adjuntar archivos</label
                            >
                            <div class="v-file-input__text"></div>
                            <input id="input-3099" type="file" />
                          </div>
                          <div class="v-input__append-inner"><div></div></div>
                        </div>
                        <div class="v-text-field__details">
                          <div class="v-messages theme--dark">
                            <div class="v-messages__wrapper"></div>
                          </div>
                          <div class="v-counter theme--dark">0 files (0 B in total)</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"
                      >
                        <span class="v-btn__content">😊</span>
                      </button>
                      <div class="v-menu"><!----></div>
                    </div>
                    <div
                      class="v-input v-textarea theme--dark v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined"
                    >
                      <div class="v-input__control">
                        <div class="v-input__slot">
                          <fieldset aria-hidden="true">
                            <legend style="width: 0px">
                              <span class="notranslate">​</span>
                            </legend>
                          </fieldset>
                          <div class="v-text-field__slot">
                            <label
                              for="input-3105"
                              class="v-label theme--dark"
                              style="left: 0px; right: auto; position: absolute"
                              >Comentarios</label
                            ><textarea
                              name="input-7-4"
                              id="input-3105"
                              rows="5"
                            ></textarea>
                          </div>
                        </div>
                        <div class="v-text-field__details">
                          <div class="v-messages theme--dark">
                            <div class="v-messages__wrapper"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="2">
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
              <v-col cols="12" md="10" v-show="habilitarComentario">
                <v-form @submit.prevent="enviarfomulario">
                  <v-textarea
                    clear-icon="mdi-close-circle"
                    label="Escribe un comentario..."
                    rows="3"
                    clearable
                    style="border: white"
                    v-model="formDatosNo.Comentario"
                    filled
                  ></v-textarea>
                  <v-btn class="success" type="submit" block>Enviar</v-btn>
                </v-form>
              </v-col>
            </v-row>

            <div>
              <v-form @submit.prevent="enviarfomulario" v-show="habilitarComentario2">
                <hr />
                <br />

                <v-row>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-select
                          :items="pros"
                          label="Proceso"
                          v-model="formDatosSi.proceso"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          :items="tAccion"
                          label="Tipo de acción"
                          v-model="formDatosSi.tipo"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field label="Folio" v-model="formDatosSi.folio">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-menu
                          v-model="menuCom"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="fechaCom"
                              label="Fecha compromiso"
                              outlined
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fechaCom"
                            :min="fechaMinima"
                            @input="menuCom = false"
                          >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-file-input
                          counter
                          show-size
                          truncate-length="15"
                          filled
                          label="Adjuntar archivos"
                          v-model="formDatosSi.archivo"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="6">
                    <br />
                    <v-textarea
                      clear-icon="mdi-close-circle"
                      label="Escribe un comentario..."
                      clearable
                      rows="7"
                      style="border: white"
                      v-model="formDatosSi.descripcion"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-btn class="success" type="submit" block>Enviar</v-btn>
              </v-form>
            </div>
            <!-- Alerta de Vuetify -->
            <v-snackbar v-model="alerta.mostrar" :timeout="alerta.timeout" color="error">
              {{ alerta.mensaje }}
              <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="alerta.mostrar = false">Cerrar</v-btn>
              </template>
            </v-snackbar>
          </v-card>
          <br />
          <v-card>
            <div class="mt-6">
              <v-row>
                <v-col cols="12" md="8">
                  <h2>REFERENCIAS</h2>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn @click="dialog2 = true" class="info" type="submit" block
                    >Atender ticket</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-data-table :headers="headers"> </v-data-table>
                </v-col>
              </v-row>
            </div>

            <template>
              <div class="pa-4 text-center">
                <v-dialog v-model="dialog2" max-width="600">
                  <v-card v-card title="Dialog 1">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" @click="dialog2 = false">X</v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-form @submit.prevent="submitForm">
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-menu
                              v-model="menuAten"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="fechaAten"
                                  label="Establecer fecha compromiso"
                                  outlined
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="fechaAten"
                                :min="fechaMinima"
                                @input="menuAten = false"
                              >
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                      </v-container>
                      <br />
                      <center>
                        <v-btn type="submit" color="primary">ATENDER</v-btn>
                      </center>
                    </v-form>
                    <v-card-text>
                      <small class="text-caption text-medium-emphasis"
                        >*No se pueden quedar vacios</small
                      >
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-card>
          <br /><br />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
export default {
  layout: "barra",
  data() {
    return {
      opcionSeleccionada: "",
      menuCom: false,
      fechaCom: null,
      menuAten: false,
      fechaAten: null,
      habilitarComentario: false,
      habilitarComentario2: false,
      dialog2: false,
      tAccion: ["No conformidad", "Salida no conforme", "Mejora continua"],
      pros: [
        "TECNOLOGÍAS DE LA INFORMACIÓN",
        "SESTEMAS DE GESTIÓN DE LA CALIDAD",
        "AUDITORIA INTERNA Y ACTOS IRREGULARES",
        "PROCESAMIENTO DE MATERIALES",
        "CONTROL DE INVENTARIOS",
        "SEGURIDAD, SALUD Y MEDIO AMBIENTE",
        "SISTEMA DE RECOLECCIÓN",
        "LOGÍSTICA INTERNA",
        "CAPITAL HUMANO",
        "COMPRAS DE INSUMOS Y SERVICIOS",
        "LOGÍSTICA INTERNACIONACIONAL (EXPORTACIÓN)",
        "CUENTAS EMPRESAS",
        "COMPRAS NO INDUSTRIALES",
        "VENTAS INTERNACIONALES",
        "VENTAS NACIONALES",
        "VENTAS MOSTRADOR",
        "PROSPECCIÓN DE COMPRAS EMPRESARIALES",
        "ATENCIÓN A PROVEEDORES",
        "MANTENIMIENTO INDUSTRIAL",
        "CONTABILIDAD",
        "UNIDAD DE NEGOCIO QUERETARO",
        "UNIDAD DE NEGOCIO AGUASCALIENTES",
        "UNIDAD DE NEGOCIO SAN LUIS POTOSÍ",
      ],
      alerta: {
        mostrar: false,
        mensaje: "",
        timeout: 5000, // Duración de la alerta en milisegundos
      },
      formDatosNo: {
        Comentario: "",
      },
      formDatosSi: {
        folio: "",
        fechaCompromiso: "",
        tipo: "",
        proceso: "",
        archivo: null,
        descripcion: "",
      },
      headers: [
        { text: "Folio", value: "*" },
        { text: "Clasificación", value: "*" },
        { text: "Observaciones", value: "*" },
        { text: "Fecha de creación", value: "*" },
      ],
    };
  },
  mounted() {
    this.fechaCom = this.fechaMinima;
    this.fechaAten = this.fechaMinima;
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
    datoSeleccionado() {
      if (this.opcionSeleccionada === "si") {
        this.habilitarComentario2 = true;
        this.habilitarComentario = false;
      } else {
        if (this.opcionSeleccionada === "no") {
          this.habilitarComentario = true;
          this.habilitarComentario2 = false;
        }
      }
    },

    enviarfomulario() {
      if (this.opcionSeleccionada === "no") {
        if (this.formDatosNo.Comentario) {
          console.log(this.formDatosNo);
          this.limpiar(); 
          this.habilitarComentario = false;
          this.opcionSeleccionada = "";
         } else {
          this.mostrarAlerta("Por favor, llene todos los campos del formulario.");
        }
      } else {
        if (this.opcionSeleccionada === "si") {
           if (
            this.formDatosSi.folio &&
            this.formDatosSi.tipo &&
            this.formDatosSi.proceso &&
            this.formDatosSi.descripcion
          ) {
            this.formDatosSi.fechaCompromiso = this.fechaCom;
            console.log("Todo bien con el si ",this.formDatosSi.archivo.name);
            this.limpiar(); 
          this.habilitarComentario2 = false;
          this.opcionSeleccionada = "";
          } else {
            this.mostrarAlerta("Por favor, llene todos los campos del formulario.");
          } 
        }
      }
    },

    limpiar() {
      if (this.opcionSeleccionada === "no") {
        this.formDatosNo.Comentario = "";
      } else {
        if (this.opcionSeleccionada === "si") {
          this.formDatosSi.folio = "";
          this.fechaCom = this.fechaMinima;
          this.formDatosSi.tipo = "";
          this.formDatosSi.proceso = "";
          this.formDatosSi.descripcion = "";
          this.formDatosSi.archivo= null;
        }
      }
    },

    mostrarAlerta(mensaje) {
      this.alerta.mensaje = mensaje;
      this.alerta.mostrar = true;
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
  padding: 0px 20px 0px 20px;
}
</style>
