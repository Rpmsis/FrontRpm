<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
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
              :items="preguntas"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:[`item.actions`]="item">
                <v-btn icon @click="(dialog2 = true), actualizar(item.item.idForms)">
                  <v-icon style="font-size: 16px">mdi-eye purple--text</v-icon>
                </v-btn>
                <br />
              </template>
            </v-data-table>

            <template>
              <div class="pa-4 text-center">
                <v-dialog v-model="dialog2" max-width="600">
                  <v-card>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog2 = false">
                        <v-icon style="font-size: 30px"
                          >mdi-close theme--dark red--text</v-icon
                        ></v-btn
                      >
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-form @submit.prevent="submitForm">
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-text-field
                              v-model="formDatos.preguntas"
                              label="* Pregunta"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-select
                              :items="status"
                              v-model="formDatos.estatus"
                              label="Activos"
                              filled
                            ></v-select>
                            <center>
                              <v-btn
                                block
                                outlined
                                color="orange"
                                class="btnEnviar"
                                type="submit"
                                >Actualizar</v-btn
                              >
                            </center>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                    <br />
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
import "@mdi/font/css/materialdesignicons.css";
export default {
  layout: "barra",
  data() {
    return {
      status: ["Activo", "Inactivo"],
      dialog2: false,
      search: "",
      preguntas: [],
      headers: [
        { text: "Pregunta", value: "preguntas" },
        { text: "Estatus", value: "estatus" },
        { text: "", value: "actions", sortable: false },
      ],
      formDatos: {
        id: "",
        preguntas: "",
        estatus: "",
      },
    };
  },
  async mounted() {
    try {
      const res = await fetch("http://localhost:3001/preguntas");
      const datos = await res.json();
      if (res.status == 404) {
        console.error("Error al obtener los datos:", error);
      } else {
        this.preguntas = datos.respuesta.respuesta;
        console.log(datos.respuesta.respuesta);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  },

  computed: {},
  methods: {
    /* Mostrar el formulario de editar */
    async mostraredit() {
      this.dialog2 = true;
    },
    /* ------------------------------------- */
    /* Abre el formulario de actualizar */
    async actualizar(item) {
      this.formDatos.id = item;
      console.log(this.formDatos.id);
      const objeto = this.preguntas.find((pregunta) => pregunta.idForms === item);
      this.formDatos = objeto;
      console.log(this.formDatos);
    },
    /* -------------------------------- */

    /* Api que actualiza los datos  de la tabla */
    async submitForm() {
      console.log(this.formDatos);
      const res = await fetch("http://192.168.1.91:3001/actualizarPreg", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formDatos),
      });
      const datos = await res.json();
      console.log(datos);
      /* Cerra formulario de actualizar datos despues de un envio exitoso*/
      if (res.ok) {
        this.dialog2 = false;
      }
    },
    /* ------------------------------------------ */
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
  padding: 0px 50px 0px 50px;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
</style>
