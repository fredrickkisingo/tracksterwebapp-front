<template>
    <div class="side-menu">
      <div class="container">
        <div class="side-menu-body">
          <div class="menu-header">
            <div class="logo">
              <img  :src="logoUrl"  alt="logo" class="sidebar-logo">
            </div>
            <div class="menu">
              <p>Trackster App.</p>
              <!-- <p><router-link :to="{ name: 'profile' }">{{ $store.getters.getAuthUser.name }}</router-link></p> -->
            </div>
          </div>
          <ul>
            <li class="side-menu-divider m-t-0"></li>
        
            <li>
              <router-link :to="{ name: 'home' }">
                <i class="lni-home"></i>
                <span class="sidemenu">Home</span>
              </router-link>
            </li>

            <li>
              <router-link :to="{ name: 'tasks' }">
                <i class="lni lni-book"></i>
                <span class="sidemenu">Tasks</span>
              </router-link>
            </li>

            <li>
              <router-link :to="{ name: 'reports' }">
                <i class="lni lni-blogger"></i>                
                <span class="sidemenu">Reports</span>
              </router-link>
            </li>

          </ul>
          <ul class="bottom-menu">
            <li class="side-menu-divider m-t-0"></li>
            <li>
              
            </li>
          </ul>
          <ul class="bottom-menu">
          <li class="side-menu-divider m-t-0"></li>
          <li>
            <a href="#" @click.prevent="logout">
              <i class="icon lni-ban"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import logoUrl from '/src/tasker.svg'
  import axios from "axios";
  import {useRouter} from "vue-router";
import { toast } from 'vue3-toastify';

  export default {
    mounted() {

    },
  
    methods: {
      logout() {

        const token = localStorage.getItem("access_token");
        const router = useRouter();

        axios.post('http://127.0.0.1:8000/api/v1/log-out', null, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}).then((response => {
        // this.is_loaded = true

        if(response.data) {
            localStorage.removeItem('user')

            localStorage.removeItem('access_token')

            // window.location.href = this.$router.resolve({ name: 'login' }).href
            this.$router.push({ name: 'login' }) // <-- Update this line

            location.reload();
        } else {
          
            toast.error('Something went wrong', {
                position: 'top-right',
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          

        }
      }))
           

}
    },
    data() {
      return {
        logoUrl
      }
    }
  };
  </script>
  <style>
  .sidebar-logo{
    width:60px
  }
</style>