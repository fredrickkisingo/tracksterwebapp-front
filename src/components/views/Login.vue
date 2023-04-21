<template>
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <h4>Trackster Task App</h4>
          <div class="col-md-6">
              <div class="card px-5 py-5" id="form1">
                <form method="post" class="login" @submit.prevent="onSubmit">
                  <div class="form-data" v-if="!submitted">
                      <div class="forms-inputs mb-4" style="margin-left: -60px;"> <span>Email or username</span> 
                        <input autocomplete="off" 
                         name="email"
                         v-model="form.email"
                        :class="{ 'is-invalid': errors.email }"
                        type="text" />
                        <p class="error" v-if="emailError">{{ emailError }}</p>
                      <p class="error" v-if="emailEmptyError">{{ emailEmptyError }}</p>
                      </div>
                      <div class="forms-inputs mb-4"> <span>Password</span> 
                        <input autocomplete="off" type="password" name="password"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="form.password"
                        :class="{ 'is-invalid': errors.password }" />
                        <p class="error" v-if="passwordEmptyError">{{ passwordEmptyError }}</p>
  
                      </div>
                      <div class="mb-3"> <button
                        type="submit"
                        value="Login" class="btn btn-dark w-100">Login</button> </div>
                  </div>
                </form>
              </div>
          </div>
      </div>
  </div>
    </template>
    <script setup>
    import { ref } from "vue";
    import  http from "../services/http";
    import { useAuthStore } from "../store/AuthStore.js";
    import { toast } from 'vue3-toastify';
   const form = ref({
    email: "",
    password: "",
  });
  const store = useAuthStore();
  
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
  
  
     await http.post("http://127.0.0.1:8000/api/v1/login", {
      email_address: form.value.email,
    password: form.value.password,
      }, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
        }
      })
        .then(async (response) => {
  
          const newUser = await fetchUser(response.data.access_token);
          setUser(newUser);
          setAccessToken(response.data.access_token);
          toast.success(`Successfully Logged In`);
  
          router.push({ name: "home" });
        })
        .catch((error) => {
          // console.log(error.response);
  
          if (error.response.status == 401) {
         
            toast.error(`Invalid Credentials`);
  
          }
          toast.error(`Invalid Credentials`);
  
        }); // credentials didn't match);
      }
  }
  
    </script>
    <style>
    body{background: #d7d5d5}.card{border: none;height: 320px}
    .forms-inputs{position: relative}
    .forms-inputs span{top:-18px;left: 10px;background-color: #fff;padding: 5px 10px;font-size: 15px}
    .forms-inputs input{height: 50px;border: 2px solid #eee}
    .forms-inputs input:focus{box-shadow: none;outline: none;border: 2px solid #000}
    .btn{height: 50px}
    .success-data{display: flex;flex-direction: column}
    .bxs-badge-check{font-size: 90px}
    .error{
      margin-top: 0.25rem;
    margin-left:0px;
      font-size: unset !important;
      color: #f62d51 !important;
  }
  </style>
    