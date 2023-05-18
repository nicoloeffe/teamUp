
<template>
<section class="relative">
  <img src="../images/sfondo.jpeg" alt="Background Image" class="w-full h-full object-cover">
  <div class="absolute inset-0 flex justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <button class="bg-black text-white rounded my-4 py-2 px-4 w-full">Prenota un campo!</button>
      <button class="bg-green-500 rounded text-black my-4 py-2 px-4 w-full">Login</button>
      <button class="bg-green-500 rounded text-black my-4 py-2 px-4 w-full">Registrati</button>
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
