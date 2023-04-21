<script>
import axios from "axios";
export default {
  name: 'App',
  components: {
  
  },
  data(){
    return {
      is_loaded:false
    }
  },
mounted() {
      this.init() 

      // Call the init function every 2 minutes
  setInterval(() => {
    this.init();
  }, 120000);  // 2 minutes = 120000 milliseconds
  },
  methods: {
    init() {
      const token = localStorage.getItem("access_token");

      axios.get('http://127.0.0.1:8000/api/v1/init',{
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    ContentType: 'application/json'

  }
  }).then(response => {
        // this.is_loaded = true

        if(response.data.authenticated) {
          //check if user is already in the local storage
          if(localStorage.getItem('user') == null) {
            localStorage.setItem('user', response.data.user)
          }
         
        } else {
          
          localStorage.removeItem('user')

          localStorage.removeItem('access_token')

            // window.location.href = this.$router.resolve({ name: 'login' }).href
            this.$router.push({ name: 'login' }) // <-- Update this line


        }
      })
    }
  }
}
</script>
<template>
  <router-view></router-view>
</template>






