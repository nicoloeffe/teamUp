
<template>
<section class="relative">
  <img src="../images/sfondo.jpeg" alt="Background Image" class="w-full h-full object-cover">
  <div class="absolute inset-0 flex justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <button class="bg-green-600 text-white rounded-lg shadow-2xl my-4 py-2 px-4 w-60">Prenota un campo!</button>
      <button class="bg-black rounded-lg shadow-2xl text-white my-4 py-2 px-4 w-44">Accedi</button>
      <button class="bg-black rounded-lg shadow-2xl text-white my-4 py-2 px-4 w-44">Registrati</button>
    </div>
  </div>
</section>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name:'HomePage'
})
</script>
