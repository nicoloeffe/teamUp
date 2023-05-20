<template>
  <div >
    <NavBar/>
    <HomePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar, 
    HomePage,
  }
}
</script>
