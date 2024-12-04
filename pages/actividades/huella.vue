<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn @click="startRegistration">Registrar con huella digital</v-btn>
            </v-col>
          </v-row>
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
    return {};
  },
  mounted() {},

  computed: {},
  methods: {
    async startRegistration() {
      if (window.PublicKeyCredential) {
        console.log("WebAuthn está disponible.");
      } else {
        console.log("WebAuthn no es compatible con este navegador.");
      }

      // Iniciar el registro: hacer una petición POST para obtener el challenge
      /*  const response = await fetch("http://192.168.1.97:3005/registerBegin", {
        method: "POST",
      });

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error("Error al comenzar el registro");
      }

      const challenge = await response.json();

      // Convertir el challenge a un formato compatible con WebAuthn
      const publicKeyCredentialCreationOptions = {
        challenge: new TextEncoder().encode(challenge.challenge),
        rp: { name: "Tu Aplicación" },
        user: {
          id: new TextEncoder().encode("usuario123"),
          name: "usuario123",
          displayName: "Usuario",
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        timeout: 60000,
        attestation: "direct",
        excludeCredentials: [],
      };

      // Usar la API WebAuthn para crear las credenciales
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      // Enviar el resultado al servidor para completar el registro
      const completeResponse = await fetch("http://192.168.1.97:3005/registerComplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });

      // Verificar si la respuesta de completar el registro fue exitosa
      if (!completeResponse.ok) {
        throw new Error("Error al completar el registro");
      }

      // Opcionalmente, gestionar la respuesta del registro completado
      const completeData = await completeResponse.json();
      return completeData; */
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
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
.btn-success {
  background-color: green;
  color: white;
}

.btn-warning {
  background-color: orange;
  color: white;
}

.btn-error {
  background-color: red;
  color: white;
}
</style>
