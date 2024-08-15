<template>
  <v-app>
    <v-container>
      <v-layout row wrap style="padding: 20px">
        <v-flex>
          <v-row>
            <v-col class="12" md="6">
              <v-card>
                <v-card-title>MONITOREO DE ACTIVIDADES</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/actForaneas">
                    <h4 class="modulo">Alta de actividades</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/asignacion">
                    <h4 class="modulo">Asignacion de actividades</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/actdiarias">
                    <h4 class="modulo">Actividades del día</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/control">
                    <h4 class="modulo">Control de actividades</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/editeficienciakg">
                    <h4 class="modulo">Editar kilogramos</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>ACTIVOS CONSUMIBLES</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/consumible">
                    <h4 class="modulo">Alta de consumibles</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/codigobarras">
                    <h4 class="modulo">Lista de consumibles</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/inventario">
                    <h4 class="modulo">Consumo</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/devolucion">
                    <h4 class="modulo">Devolución</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>CONTABILIDAD</v-card-title>
                <!-- <v-card class="v-sheet theme--dark">
                  <a href="/SGI/noconformidad">
                      <h4 class="modulo">Tickets de no conformidad</h4>
                  </a>
                </v-card> -->
                <!-- <v-card class="v-sheet theme--dark">
                  <a href="/activos/ubicacion">
                      <h4 class="modulo">Alta de ubicaciones</h4>
                  </a>
                </v-card>  -->
                <v-card class="v-sheet theme--dark">
                  <a href="/socioscomerciales/provusuario">
                    <h4 class="modulo">Usuario proveedor</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/socioscomerciales/proveedores">
                    <h4 class="modulo">Aprobar proveedores</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/socioscomerciales/mostrarProv">
                    <h4 class="modulo">Mostrar proveedores</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>ACTIVOS FIJOS</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/insumos">
                    <h4 class="modulo">Activos de insumos</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/mantenimiento">
                    <h4 class="modulo">Alta de activos de mantenimiento</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/mostActmantt">
                    <h4 class="modulo">Actualizar activo mantenimiento</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/mostmantt">
                    <h4 class="modulo">Mostrar activos de mantenimiento</h4>
                  </a>
                </v-card>
                <!--  <v-card class="v-sheet theme--dark">
                  <a href="/preguntaSeg/formulario">
                      <h4 class="modulo">Generar preguntas</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/preguntaSeg/mostrarPreg">
                      <h4 class="modulo">Ver preguntas</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="ayuda">
                      <h4 class="modulo">Ayuda</h4>
                  </a>
                </v-card> -->
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
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
}
.v-sheet.v-card {
  margin-bottom: 30px;
}
</style>
