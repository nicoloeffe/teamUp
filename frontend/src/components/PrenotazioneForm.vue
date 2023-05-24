<template>
  <div class="custom">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="w-full max-w-md p-6 bg-green-500 rounded-lg shadow-md">
        <h2 class="text-4xl font-bold text-center text-white">Prenotazione</h2>
        <div v-if="error.status" class="mt-2 bg-white rounded-lg p-4 text-red-500 font-bold">
          <h1>
            {{ error.message }}
          </h1>
        </div>
        <form class="mt-6 bg-white rounded-lg p-4 ">
          <div>
            <label class="text-4xl block text-gray-700 font-bold mb-2" for="nome" style="text-transform: capitalize;">
              {{this.datiPrenotazione.user}}
            </label>
          </div>          
          <div class="container flex">
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2" for="date">
                Data
              </label>
              <input v-model="this.datiPrenotazione.data"
                class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
                id="date" type="date" placeholder="Inserisci il tuo cognome" />
            </div>
            <div class="flex-grow"></div>
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2" for="time">
                Orario
              </label>
              <input v-model="this.datiPrenotazione.orario"
                class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
                id="time" type="time" placeholder="Inserisci il tuo cognome" />
            </div>
          </div>
          <button v-on:click="inviaPrenotazione()" type="submit"
            class="mt-6 text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-base px-5 py-2 text-center dark:bg-green-600 fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block">
            Prenota</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import { config } from "@/config";
import router from '@/router';
import store from "@/store";

export default {
  data(){
    return{
      datiPrenotazione:{
        nome:"",
        data:"",
        orario:"",
        user: store.getters.getUser

      },
      error: {
          status: false,
          message: "default message"
        },
    };
  },
  methods: {
    async inviaPrenotazione() {
      const datiPrenotazione = {
        // Raccogli i dati necessari per la prenotazione dagli input del form
        nome: store.getters.getUser,
        data: this.datiPrenotazione.data,
        orario: this.datiPrenotazione.orario,
      };

      try {
        const opzioniRichiesta={
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datiPrenotazione),
        }
        console.log(opzioniRichiesta)
        const response = await fetch(`${config.BASE_URL}/prenotazioni`, opzioniRichiesta);
        

        if (!response.ok) {
          throw new Error('Impossibile inviare la prenotazione.');
        }

        // Prenotazione inviata con successo, esegui le azioni necessarie
        router.push({name: "Conferma"})
      } catch (error) {
        this.error.status = true;
        this.error.message = error || "Errore inaspettato"
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
  .custom{
    background-image: url("../images/sfondo.jpeg");
    background-size: cover;
    background-position:center;
    resize: both;
  }
</style>
  