import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css';
import '/src/assets/fonts/lineicons/LineIcons.scss'

import axiosInterceptor from './plugins/axios.js'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import './assets/main.css'

// import Chart from "/src/components/dashboard/Chart"
// Vue.component("chart", Chart)


const app = createApp(App)

app.use(createPinia())
app.use(axiosInterceptor)
app.use(VueSweetalert2)
app.component('VueDatePicker', VueDatePicker);

app.use(router)
app.mount('#app')
