<template>
  <v-app style="background: url('https://res.cloudinary.com/rey/image/upload/v1704742153/documentos/Screenshot_20240108_132434_u0qouj.png')  no-repeat;
    background-size: cover;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  flex-flow: row;">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h4">
          {{ msj1 }}
        </v-card-title>

        <v-card-text class="text-h6 text-center">

          {{ tik }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="reset" @keyup.esc="reset">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="carga" width="500">
      <v-card>
      <v-card-text class="text-h6 text-center">
        <v-progress-circular
        :size="70"
      :width="7"
        indeterminate
      color="purple"
    ></v-progress-circular>
          <h3>Cargando por favor espere..</h3>
      </v-card-text>
 
   
      </v-card>
    </v-dialog>
    <v-row justify="center" align="center" cols="6" sm="6" md="6" height="auto" class="pa-4 rounded-xl">
      <v-col style="max-width: 70%;">
        <v-card style="background-color: rgba(7, 55, 82, 0.25);">
          <h3 class="text-center pa-4">INGRESAR</h3>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Usuario" prepend-icon="mdi-account" v-model="usuario.username" cols="6" color="white">
              </v-text-field>
              <v-text-field label="Contraseña" color="white" :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" prepend-icon="mdi-lock"
                cols="6" v-model="usuario.password" @keyup.enter="enviarL">
              </v-text-field>
              <v-input>

              </v-input>
            </v-form>
            <v-btn block style="background-color: rgba(7, 55, 82);" cols="12" sm="6" md="4"
              @click="enviarL">Ingresar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <v-footer app style="background-color: rgba(7, 55, 82, 0.90); text-align: center;">
      <h5 style="text-align: center;">Copyright © 2024 STEELPRO V2.0.0 - Todos los derechos reservados
        Aviso de privacidad.
        Términos y condiciones</h5>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      dialog: false,
      msj1: "",
      ok: false,
      carga:false,
      tik: "",
      usuario: {
        username: "",
        password: ""
      },
    }
  },
  methods: {
    async enviarL() {
      if (this.usuario.username == "" || this.usuario.username === null || this.usuario.password == "" || this.usuario.password === null) {
        this.dialog = true;
        this.msj1 = '¡Ouch!'
        this.tik = "Parece que existen campos vacíos, válida la información nuevamente"
        return false
      } else {
        this.carga = true
        const res = await fetch('https://steelpro.ddns.net:3002/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.usuario)
        })
        const datos = await res.json()
        if (res.status == 404 || res.status == 400) {
          this.carga = false
          this.msj1 = '¡Algo salió mal!';
          this.dialog = true;
          this.tik = datos.mensaje
        } else {
          this.carga = false
          this.$store.commit("auth/saveToken", datos.token)
          localStorage.token = datos.token
          this.$router.push({ name: 'inicio' })
        }
      }
    },
    reset() {
      this.dialog = false
      this.ok = false
    },
  }
} 
</script>
