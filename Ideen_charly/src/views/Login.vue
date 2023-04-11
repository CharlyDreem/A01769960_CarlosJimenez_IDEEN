<template>
  <v-app>
    <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <div class="ml-auto" v-if="true">
        <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/register">REGISTER</RouterLink>
      </div>
    </v-app-bar>

    <div style="padding: 1rem ">
      <h1>INICIO DE SESION</h1>

      <v-responsive class="mx-auto" max-width="344" style="padding-top: 3rem;">
        <v-form ref="form" v-model="valid" @submit.prevent="submitCuenta">
          <v-text-field v-model="cuenta.correo" :rules="emailRules" label="Correo institucional" placeholder="a0xxxxxx@tec.mx" type="email" variant="outlined"></v-text-field>
          <br>
          <v-text-field v-model="cuenta.contra" :rules="passwordRules" label="Contraseña" type="password" variant="outlined"></v-text-field>
          <br>
          <v-btn block size="large" type="submit" variant="elevated" style="background-color: var(--azul); color: white; ">
            Inicia sesión
          </v-btn>
        </v-form>
      </v-responsive>

      <v-responsive>
        <v-dialog v-model="dialogo" width="20rem" height="10rem">
          <v-card-title style="background-color: white;">Contraseña incorrecta</v-card-title>
          <v-card-text style="background-color: white;">Contraseña o correo no coincidentes</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="dialogo = false" style="background-color: blue;">cerrar</v-btn>
          </v-card-actions>
        </v-dialog>
      </v-responsive>
    </div>
  </v-app>
</template>

<script>
import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from '../router';

const firebaseConfig = {
  apiKey: "AIzaSyBZqFZLmgRgb7DZO7G3LU2vFpnn4aaGK-w",
  authDomain: "ideen-charly.firebaseapp.com",
  projectId: "ideen-charly",
  storageBucket: "ideen-charly.appspot.com",
  messagingSenderId: "707968411623",
  appId: "1:707968411623:web:c078fb2b15bdf85cbcbf42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default {
  data() {
    return {
      valid: true,
      dialogo: false,
      cuenta: {
        correo: "",
        contra: "",
      },
      emailRules: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (!value) {
            return "Campo obligatorio";
          } else if (!pattern.test(value)) {
            return "Correo inválido";
          }
          return true;
        }
      ],
      passwordRules: [
        value => {
          if (!value) {
            return "Campo obligatorio";
          } else if (value.length < 6) {
            return "Contraseña muy corta";
          }
          return true;
        }
      ]
    };
  },
  methods: {
    async submitCuenta() {
      try {
        await signInWithEmailAndPassword(auth, this.cuenta.correo, this.cuenta.contra);
        // Inicio de sesión exitoso, redireccionar a la página deseada
        router.push('/dashboard');
      } catch (error) {
        // Error al iniciar sesión, mostrar diálogo
        this.dialogo = true;
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.logo {
  height: 64px;
}
.whiteboton {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.pa-4 {
  padding: 1rem;
}
</style>

