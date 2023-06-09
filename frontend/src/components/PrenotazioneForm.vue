<template>
  <div class="custom ">
    <div class="container-h  ch">

      <div class="w-full container-v max-w-sm p-4 bg-green-500 rounded-lg shadow-md">
        <div v-for="campo in campos" :key="campo._id" class="bg-white rounded-lg p-6 my-2">
          <div class="font-bold mt-2" style="text-transform: capitalize;">
            <img src="../images/field.svg" alt="field" width="300">
            <button @click.prevent="nomeCampo = campo.nome"
              :class="['mt-4 font-medium rounded-full border text-base px-5 text-center', { 'bg-white text-green-700 border border-green-700': campo.nome === nomeCampo, 'bg-green-700 text-white': campo.nome !== nomeCampo }]">
              {{ campo.nome }}
            </button>
          </div>
          <div v-if="campo.nome === nomeCampo">
            <li v-for="prenotazioni in gCampo.prenotazioni" :key="prenotazioni._id"> {{ prenotazioni.orario }} </li>
          </div>          
        </div>
      </div>

      <div class="w-12"></div>

      <div v-if="this.nomeCampo != '' " class="w-full max-w-md p-6 bg-green-500 rounded-lg shadow-md">
        <h2 class="text-4xl font-bold text-center text-white">Prenotazione</h2>
        <div v-if="error.status" class="mt-2 bg-white rounded-lg p-4 text-red-500 font-bold">
          <h1>
            {{ error.message }}
          </h1>
        </div>
        <form class="mt-6 bg-white rounded-lg p-4 ">
          <div>
            <label class="text-4xl block text-gray-700 font-bold mb-2" for="nome" style="text-transform: capitalize;">
              {{ this.nomeUser }}
            </label>
          </div>          
          <div class="container-h">
            <div class="mt-4">
              <label class="block text-gray-700 font-bold mb-2" for="date">
                Data
              </label>
              <input v-model="this.date"
                class="w-full px-4 py-2 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:border-white"
                id="date" type="date" />
              </div>
              <div class="flex-grow" v-if="this.date !== ''"></div>
              <div class="mt-4" v-if="this.date !== ''">
              <label class="block text-gray-700 font-bold mb-2" for="time">
                Orario
              </label>
              <select v-model="datiPrenotazione.orario"
                class="w-full px-4 py-2 rounded-lg shadow-md border font-bold border-gray-400 focus:outline-none focus:border-white bg-white text-green-600 "
                id="time">
                <option disabled selected hidden>Scegli un'ora</option>
                <option class="font-bold disabled:text-red-600" v-for="(time, index) in availableTimes" :value="time.value" :key="index" :disabled="time.disabled">{{ time.value }}</option>
              </select>
            </div>
          </div>
          <button @click.prevent="inviaPrenotazione()"
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
  data() {
    return {
      nomeCampo: "",
      date: "",
      nomeUser: store.getters.getUser,

      gCampo: [],
      campos: [],
      availableTimes: [],
      bookedHours: [],

      datiOrari: {
        nome: this.nomeCampo,
        date: this.date
      },
      datiPrenotazione: {
        orario: null, 
        utente: {email: store.getters.getEmail}
      },
      error:{
          status: false,
          message:"default error message"
      }
    }
  },

  mounted() {
  this.fetchCampos();
  for (let hour = 8; hour < 22; hour++) {
      const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
      const isBooked = this.bookedHours.includes(formattedHour);

      this.availableTimes.push({
        value: formattedHour,
        disabled: isBooked
      });
    }
},

watch: {
    date() {
      this.updateOrari(); 
    },
  },

  methods: {

  async updateOrari(){
    this.availableTimes = []
    this.fetchOrari().then(() => {
    for (let hour = 8; hour < 22; hour++) {
      const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
      const isBooked = this.bookedHours.includes(formattedHour);
      this.availableTimes.push({
        value: formattedHour,
        disabled: isBooked
      });
    }
  });
  },  

  async fetchCampos() {
    try {
    //console.log("fetching campos");
    const res = await fetch(`${config.BASE_URL}/campi/getcampi`);
    const data = await res.json();
    //console.log(data);
    this.campos = data.findCampo; // Set the fetched campos data to the component's data property
    } catch (error) {
    console.error(error);
    }
  },  

  async inviaPrenotazione() {
  //console.log("request inviaPrenotazione received");
  
  const Prenotazione = {
    nome: this.nomeCampo,
    data: this.date,
    utente: this.datiPrenotazione.utente,
    orario: this.datiPrenotazione.orario,
  };
  
  const opzioniRichiesta = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Prenotazione),
  };

  try {
    //console.log("trying to process request")
    const res = await fetch(`${config.BASE_URL}/prenotazioni`, opzioniRichiesta);
    const data = await res.json();

    if (data.success) {
      //console.log(data.message)
        router.push({ name: "Conferma" });
    }else{
      this.error.status=true;
      this.error.message= data?.error || data?.message || "Unexpected error"
    }
    }catch(error){
      this.error.status=true;
      this.error.message= error;
      //console.log(this.error.message)
    }
  },

  async fetchOrari(){
        const datiOrari = {
          nome: this.nomeCampo,
          data: this.date
        };

        //console.log(this.date)
        this.bookedHours = []

        const opzioniRichiesta = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datiOrari),
        };

        try{
          //console.log("trying to process request " + datiOrari.nome + ' ' + datiOrari.data);

          const res = await fetch(`${config.BASE_URL}/campi/getorari`, opzioniRichiesta);
          const data = await res.json();

          if (res.ok) {
            //console.log(data.findCampo)
            data.findCampo.prenotazioni.forEach(element => {
            this.bookedHours.push(element.orario);
            //console.log(element.orario);
          });
          }
          
          //console.log([...this.bookedHours]);
        } catch(error){
          console.error(error);
        }
    },
  }
};
</script>

<style scoped>
  .container-v {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container-h {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .custom{
    background-image: url("../images/sfondo.jpeg");
    background-size: cover;
    background-position:center;
    resize: both;
  }
  .ch{
    min-height: 90vh;
  }
</style>
  