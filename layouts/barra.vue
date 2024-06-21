<template>
  <v-app>
    <v-app-bar app fixed color="#022031">

      <v-btn icon :to="'/inicio'" ><v-icon color="white">mdi-home</v-icon></v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click="log">
        <v-icon color="red darken-4">mdi-power</v-icon></v-btn>
    </v-app-bar>
    <v-card>

    </v-card>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>   
  </v-app>
</template>


<script>
export default {
  middleware: 'auth',
  data() {
    return {     
      name: '',
      usuario:
      {
        nombre: this.$store.state.nombre,
        area: this.$store.state.Area
      },
     
    }
  },   
  methods:{
    log() {
      this.$store.commit("auth/saveToken", null)
      localStorage.token = null
      this.$router.push({ name: 'index' })
    },
  }
}
</script>
