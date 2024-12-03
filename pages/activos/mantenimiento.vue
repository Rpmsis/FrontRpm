<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title style="padding: 50px">Alta de activos de mantenimiento</v-card-title>
            <v-form @submit.prevent="submitForm">
              <!-- row 1: TIPO, DESCRIPCION GENERAL  -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="datoNuevo.tipoAct"
                    :items="tipoActivo"
                    label="*TIPO DE ACTIVO"
                    filled
                    @change="cambiar"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field v-model="datoNuevo.descripgen" label="DESCRIPCIÓN GENERAL" filled>
                  </v-text-field>
                </v-col>
              </v-row>
              <!-- row 2: UBICACIÓN, CLASIFICACIÓN  -->
              <v-row>
                <v-col cols="12" md="8">
                  <v-select
                    v-model="datoNuevo.idubicacion"
                    :items="ubicaciones"
                    label="*UBICACIÓN"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="datoNuevo.clasificacion"
                    :items="clasificacion"
                    label="CLASIFICACIÓN"
                    filled
                  ></v-select>
                </v-col>
              </v-row>
              <!-- row 3: capacidad, fecha de fabricacion -->
              <v-row v-show="contmat" >
                <v-col cols="12" md="6">
                  <v-text-field v-model="datoNuevo.capacidad" label="CAPACIDAD" filled>
                  </v-text-field>
                </v-col>
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
                        label="Fecha de fabricación"
                        outlined
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fecha"
                      :min="fechaMinima"
                      @input="menu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <!-- row 3: tipo, especificacion -->
              <v-row v-show="contmat">
                <v-col cols="12" md="6">
                  <v-select
                    :items="tipo"
                    label="Tipo"
                    v-model="datoNuevo.tipocontmate"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :items="espec"
                    label="ESPECIFICACIÓN"
                    v-model="datoNuevo.espeficicacion"
                    filled
                  ></v-select>
                </v-col>
              </v-row>
              <!-- row 4:  DESCRIPCIÓN ADICIONAL -->
              <v-row v-show="infra">
                <v-col cols="12" md="12">
                  <v-textarea
                    clear-icon="mdi-close-circle"
                    label="DESCRIPCIÓN ADICIONAL"
                    clearable
                    style="border: white"
                    v-model="datoNuevo.descripadi"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row v-show="maqui">
                <v-col cols="12" md="6">
                  <v-text-field
                      v-model="datoNuevo.modelo"
                      label="* MODELO"
                      filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                      v-model="datoNuevo.capacidad"
                      label="* CAPACIDAD"
                      filled
                    ></v-text-field>
                </v-col>
              </v-row>
              <center>
                <v-btn class="btnEnviar" type="submit" color="success" block >Enviar</v-btn>
              </center>
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
                  <v-btn color="primary" text @click="alerta = false">
                      Cerrar
                  </v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
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
      alerta: false,
      Mensaje: "",
      Titulo: "",
      ubicaciones: [],
      activosF: [],
      otrotipo: "",
      otroesp: "",
      menu: false,
      fecha: null,
      contmat: false,
      infra: false,
      maqui: false,
      tipoActivo: [ "INFRAESTRUCTURA", "EQUIPOS DE CONTENCIÓN","EQUIPOS DE PRODUCCION"],
      clasificacion: ["A", "B", "C"],
      tipo: [
        "BASCULANTE/GÓNDOLA",
        "TINE ABIERTA/ RACK",
        "CARRO TRANSPORTADOR",
        "CAJAS METALICAS CON TAPA",
        "CONTENEDOR ROLL OFF CAMIONETA",
        "CONTENEDOR ROLL OFF ESTANDAR 33M3",
        "CONTENEDOR ROLL OFF MODIFICADO",
        "ESCURRIDOR",
        "OTROS CONTENEDORES",
        "ESPECIAL/OTRO",
      ],
      espec: [
        "CONTIENE LÍQUIDOS",
        "TAPAS/CUBIERTAS",
        "DRENAJES",
        "ESCURRIDORES",
        "DESMONTABLE",
        "PROTECCIÓNES",
        "VISTA AL INTERIOR",
        "SIN VISTA EL INTERIOR",
        "CERROJO PARA CANDADO",
        "OTRO",
      ],
      datoNuevo: {
        folioActivo: "",
        fabricacion: "",
        tipoAct: "",
        modelo: "",
        capacidad: "",
        clasificacion: "",
        nmotor: "",
        tipocontmate: "",
        espeficicacion: "",
        marca: "",
        descripadi:"",
        descripgen:"",
        idubicacion:""
      },
    };
  },
  mounted() {
    this.fecha = this.fechaMinima;
    this.mostrarubi();
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
    async mostrarubi(){
      try {
        const res = await fetch("http://localhost:3001/ubicacionMantt");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.ubicaciones = datos.respuesta.respuesta;
          this.ubicaciones =  datos.respuesta.respuesta.map((ubi) => [ubi.descrip]);
          console.log(this.ubicaciones);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async cambiar(){
      const tipo = this.datoNuevo.tipoAct;
      if(tipo === "EQUIPOS DE CONTENCIÓN"){
        this.contmat = true;
        this.infra = false;
        this.maqui = false;
        this.limpiarFormulario();
        this.datoNuevo.tipoAct= tipo;
        console.log("Tipo de dato",this.datoNuevo.tipoAct)
      }else{
          if(tipo === "INFRAESTRUCTURA"){
            this.infra = true;
            this.contmat = false;
            this.maqui = false;
            this.limpiarFormulario();
            this.datoNuevo.tipoAct= tipo;
            console.log("Tipo de dato",this.datoNuevo.tipoAct)
          }
          else{
            if(tipo === "EQUIPOS DE PRODUCCION"){
              this.maqui = true;
              this.infra = false;
              this.contmat = false;
              this.limpiarFormulario();
              this.datoNuevo.tipoAct= tipo;
              console.log("Tipo de dato",this.datoNuevo.tipoAct)

            }
          }
      }

    },

    async submitForm() {
      this.datoNuevo.fabricacion = this.fecha;
      console.log(this.datoNuevo.tipoAct);
      const res = await fetch("http://localhost:3001/insertarMante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevo),
      });
      const datos = await res.json();
      console.log(datos);
      if(res.status === 400){
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
        
      }else{
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Id del activo:";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
        this.contmat= false;
        this.infra= false;
        this.maqui= false;
      } 
      //console.log(datos.respuestaMante.mensaje);
      
    },
    limpiarFormulario() {
      this.fecha = this.fechaMinima;
      this.datoNuevo.tipoAct = "";
      this.datoNuevo.fabricacion="";
      this.datoNuevo.capacidad = "";
      this.datoNuevo.clasificacion = "";
      this.datoNuevo.tipocontmate = "";
      this.datoNuevo.espeficicacion = "";
      this.datoNuevo.descripadi = "";
      this.datoNuevo.descripgen = "";
      this.datoNuevo.modelo = "";
      this.datoNuevo.nmotor = "";
      this.datoNuevo.idubicacion="";
      this.habilitarotro1 = false;
      this.otrotipo = "";
      this.habilitarotro2 = false;
      this.otroesp = "";
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
  padding: 0px 50px 0px 50px;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
</style>
