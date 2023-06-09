<template>
  <div class="custom">
    <div class="flex flex-col items-center justify-center ch">
      <div class="w-full max-w-md p-4 bg-green-500 rounded-lg shadow-md">
        <div class="bg-white rounded-lg pt-4 my-2 max-h-96 overflow-auto ">
          <div v-for="prenotazione in bookedPrenotazioni" :key="prenotazione.id" class="flex items-center justify-center my-2 shadow-md ">
            <p>Data: {{ prenotazione.data }}</p>
            <div class=" w-10 "></div>
            <p>Orario: {{ prenotazione.orario }}</p>
            <div class=" w-10 "></div>
            <p>{{ prenotazione.campo }}</p>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

  
  <script>
  import { config } from "@/config";
  
  export default {
    data() {
      return {
        bookedPrenotazioni: [],
        utente: {email: "mariorossi@gmail.com"}
      }
    },
    mounted() {
      this.fetchPrenotazioni();
    },
    methods: {
      async fetchPrenotazioni() {
        const datiPrenotazione = {
          utente: this.utente
        }
        const opzioniRichiesta = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datiPrenotazione),
        }
        try {
        console.log("trying to process request");
        const res = await fetch(`${config.BASE_URL}/prenotazioni/getprenotazioni`, opzioniRichiesta);
        const data = await res.json();

        if (res.ok) {
          //console.log(data.findPrenotazione);

          this.bookedPrenotazioni = data.findPrenotazione.map((element) => ({
            campo: element.campo,
            data: element.data,
            orario: element.orario
          })).reverse(); // Reverse the array before assigning it to bookedPrenotazioni
        }
      } catch (error) {
        console.error(error);
      }
      },
    },
  };
  </script>
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
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
  