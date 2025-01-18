<template>
  <v-app>
    <v-app-bar app fixed color="#522073">
      <v-btn icon :to="'/inicio'"><v-icon color="#AFA3BF" large>mdi-home</v-icon></v-btn>
      <v-spacer style="text-align:center;">
        <center>
          <div style="display: flex; justify-content: center;  width: 100%;">
            <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;">{{ nombres }}</h3>
            <h3 style="padding-left: 5px;">{{ apellidos }}</h3>
          </div>
        </center>
      </v-spacer>

      <v-btn icon @click="log"> <v-icon color="red darken-4" large>mdi-power</v-icon></v-btn>
    </v-app-bar>
    <v-card> </v-card>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      name: "",
      usuario: {
        nombre: this.$store.state.nombre,
        area: this.$store.state.Area,
      },
      nombre: this.$store.state.nombre,
      nombres: "",
      apellidos: "",
    };
  },
  mounted() {
    this.estilosnombre();
  },
  methods: {
    log() {
      this.$store.commit("auth/saveToken", null);
      localStorage.token = null;
      this.$router.push({ name: "index" });
    },
    estilosnombre() {
      //const nuevonombre2 = [];
      this.nuevonombre = this.nombre.split(" ");
      //console.log(this.nuevonombre.length);
      if (this.nuevonombre.length === 3) {
        this.nombres = this.nuevonombre[0];
        this.apellidos = this.nuevonombre[1] + " " + this.nuevonombre[2];
        console.log("Nombre: ", this.nombres);
        console.log("Apellidos", this.apellidos);
      }
    },
  },
};
</script>
