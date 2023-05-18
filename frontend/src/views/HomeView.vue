<template>
  <div >
    <LogoBar/>
    <StartPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import LogoBar from '@/components/LogoBar.vue'
import StartPage from '@/components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    LogoBar, 
    StartPage
  }
}
</script>
