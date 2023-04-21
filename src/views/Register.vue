<template>
    <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form @submit.prevent="onSubmit">
           
  
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email"  class="form-control form-control-lg"
                placeholder="Enter a valid email address" name="email" v-model="form.email" :class="{ 'is-invalid': errors.email }" />
              <label class="form-label" for="form3Example3">Email address</label>
            </div>
  
            <!-- Password input -->
            <div class="form-outline mb-3">
              <input type="password"  class="form-control form-control-lg"
                placeholder="Enter password"  name="password" :type="showPassword ? 'text' : 'password'"
                    v-model="form.password" :class="{ 'is-invalid': errors.password }" />
              <label class="form-label" for="form3Example4">Password</label>
              <p class="error" v-if="passwordEmptyError">{{ passwordEmptyError }}</p>
  
            </div>
  
            
            <div class="text-center text-lg-start mt-4 pt-2">
              <button type="submit" value="Login" class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;">Register</button>
            
            </div>
  
          </form>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
      <!-- Copyright -->
      <div class="text-white mb-3 mb-md-0">
        Copyright © <span id="currentYear">{{ currentYear }}</span>. All rights reserved.
      </div>
  
    
    </div>
  </section>
      </template>
      <script setup>
      import axios from "axios";
      import { ref } from "vue";
      import { useAuthStore } from "../stores/AuthStore.js";
      import {useRouter} from "vue-router";
      import { toast } from 'vue3-toastify';
      import 'vue3-toastify/dist/index.css';
  
     const form = ref({
      email: "",
      password: "",
    });
    const store = useAuthStore();
    
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const { setUser } = store;
    
    const { setAccessToken } = store;
    
    const errors = ref({});
    
    const emailEmptyError = ref('')
    const passwordEmptyError = ref('')
    const emailError = ref('')
    
    const showPassword = ref(false);
    const completeform = form.value
    
    function isEmpty(value) {
      return (
        value === null ||
        value === undefined ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    async function onSubmit() {
    const email = completeform.email
    const password= completeform.password
    
    
      if (!email) {
    
            emailEmptyError.value = "Email address is required";
            setTimeout(() => {
                emailEmptyError.value = ""
            }, 1000);
        } else if (!validateEmail(email)) {
       
          emailError.value = "Please enter a valid email address";
          setTimeout(() => {
              emailError.value = ""
          }, 1000);
      };
    
      if (!password) {
     
        passwordEmptyError.value = "Password is required";
        setTimeout(() => {
            passwordEmptyError.value = ""
        }, 1000);
    }
    else{
    
    
       await axios.post("http://127.0.0.1:8000/api/v1/register", {
        email: form.value.email,
      password: form.value.password,
        }, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        })
          .then(async (response) => {
    
            if(response.data.message == "Invalid Credentials"){
              toast.error(`Invalid Credentials`);
              return;
            }
            else if(response.data.message == "User does not exist"){
             
              toast.error(`User does not exist`);
              return;
            }
  
        
            const access_token = response.data.access_token;
            localStorage.setItem("access_token", access_token);
  
            const token = access_token;
            //make an api call to get the user details
          axios.get('http://127.0.0.1:8000/api/v1/init',{
          headers: {
            Authorization: `Bearer ${token}`
          }
          }).then(response => {
          // this.is_loaded = true
  
          if(response.data.authenticated) {
            //check if user is already in the local storage
            if(localStorage.getItem('user') == null) {
              localStorage.setItem('user', JSON.stringify(response.data.user))
            }
  
            toast.success(`Successfully Registered`);
            
            router.push({
                          name: "home"
                      });
                      location.reload(); // reload the page
  
  
           
          } else {
            
            localStorage.removeItem('user')
  
            localStorage.removeItem('access_token')
  
              router.push({
                          name: "login"
                      });
                      location.reload(); // reload the page
  
  
          }
        })
  
          
    
            router.push({ name: "home" });
           
    
          })
          .catch((error) => {
            // console.log(error.response);
            console.log(error)
    
            if (error.response.status == 401) {
           
              toast.error(`Invalid Credentials`);
    
            }
            toast.error(`Invalid Credentials`);
    
          }); // credentials didn't match);
        }
    }
    
      </script>
    <style scoped>
     
    .error{
      margin-top: 0.25rem;
    margin-left:0px;
      font-size: unset !important;
      color: #f62d51 !important;
  }
  .divider:after,
    .divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
    }
    .h-custom {
    height: calc(100% - 73px);
    }
    @media (max-width: 450px) {
    .h-custom {
    height: 100%;
    }
    }
  </style>  
      