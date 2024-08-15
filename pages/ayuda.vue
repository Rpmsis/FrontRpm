<template>
  <v-app>
    <v-container>
      <v-layout row wrap style="padding: 20px">
        <v-flex>
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                style="
                  margin-bottom: 50px;
                  background-color: rgb(255, 255, 255, 0.1);
                  padding: 10px;
                "
              >
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card>
                      <v-card-title>
                        <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                          mdi-ticket-account
                        </v-icon>
                        TICKETS:
                      </v-card-title>
                      <v-progress-linear rounded color="blue"></v-progress-linear>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-invoice-text-plus
                          </v-icon>
                          NUEVOS
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-invoice-text-arrow-right
                          </v-icon>
                          EN PROCESO
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-invoice-text-check
                          </v-icon>
                          TODOS
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                style="
                  margin-bottom: 50px;
                  background-color: rgba(255, 255, 255, 0.1);
                  padding: 10px;
                "
              >
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card>
                      <v-card-title>
                        <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                          mdi-server
                        </v-icon>
                        ACTIVOS FIJOS:
                      </v-card-title>
                      <!-- <v-progress-linear
                            indeterminate
                            reverse
                            color="white"
                          ></v-progress-linear> -->
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-folder
                          </v-icon>
                          INVENTARIO
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-package-variant-closed
                          </v-icon>
                          ENTREGA
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-card
                style="
                  margin-bottom: 50px;
                  background-color: rgba(255, 255, 255, 0.1);
                  padding: 10px;
                "
              >
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card>
                      <v-card-title>
                        <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                          mdi-package
                        </v-icon>
                        CONSUMIBLES:
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="4">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-plus-circle
                          </v-icon>
                          ALTA / COMPRA
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-format-list-bulleted
                          </v-icon>
                          LISTA
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-send
                          </v-icon>
                          ENTREGA
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-handshake
                          </v-icon>
                          PRESTAMOS
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card class="v-sheet theme--dark">
                      <a href="/actividades/actForaneas">
                        <h5 class="modulo">
                          <v-icon color="white" dark v-bind="attrs" x-large class="mr-2">
                            mdi-arrow-collapse-left
                          </v-icon>
                          DEVOLUCIÓN
                        </h5>
                      </a>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
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
      enviar: null,
      headers: [
        { text: "Nombre", align: "start", value: "name" },
        { text: "Edad", value: "age" },
        { text: "Email", value: "email" },
      ],
      items: [
        { id: 1, name: "Juan", age: 30, email: "juan@example.com" },
        { id: 2, name: "María", age: 25, email: "maria@example.com" },
        { id: 3, name: "Pedro", age: 40, email: "pedro@example.com" },
        { id: 4, name: "Ana", age: 35, email: "ana@example.com" },
      ],
    };
  },
};
</script>
<style>
.v-application a {
  text-decoration: none !important;
}
.modulo {
  padding: 20px;
  color: white;
  font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
}
.v-sheet.v-card {
  border-radius: 10px;
  text-align: center;
}

.zigzag {
  width: 100%;
  height: 10px;
  margin-bottom: 15px;
  background: linear-gradient(
    135deg,
    #f5f5f5 25%,
    transparent 25%,
    transparent 50%,
    #a5a3a3 50%,
    #f3eeee 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
  border-radius: 20px; /* Opcional: redondea los bordes del tubo */
}
</style>
