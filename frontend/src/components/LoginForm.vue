<style scoped>
    .custom{
        background-image: url("../images/sfondo.jpeg");
        background-size: cover;
        background-position:center;
        resize: both;
    }
</style>
<template>
    <div class="custom">
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-6 bg-green-500 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-white">Accedi</h2>
          <form class="mt-6" @submit.prevent="login">
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2 text-white" for="email">
                Email
              </label>
              <input v-model="email" class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white" id="email" type="email" placeholder="Inserisci la tua email" />
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2 text-white" for="password">
                Password
              </label>
              <input v-model="password" class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white" id="password" type="password" placeholder="Inserisci la tua password" />
            </div>
            <div class="mt-6">
              <button class="w-full px-4 py-2 text-lg font-bold text-green-500 bg-white rounded-lg shadow-md hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">
                Accedi
              </button>
            </div>
          </form>
          <hr class="my-6 border-gray-300 w-full" />
          <p class="mt-8 text-center">
            Non hai ancora un account? <router-link class="text-black" to="/register">Registrati</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
    

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name:"LoginForm"
})
</script>
