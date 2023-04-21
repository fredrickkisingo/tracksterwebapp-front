<template>
    <canvas ref="chart"></canvas>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js';
import { toast } from 'vue3-toastify';
import { inject } from 'vue'

  export default {
   async mounted() {
    
    const $fetch = inject('$fetch')

    const token = localStorage.getItem('access_token');
    await axios.get('http://127.0.0.1:8000/api/v1/task-chart',{
        headers: {
          Authorization: `Bearer ${token}`
        }
        })
        .then(response => {
          const data = response.data;
          this.renderChart(data);
        })
        .catch(error => {

            toast.error("An error  occcured while rendering the chart");
        });
    },
  
    methods: {
      renderChart(data) {
        
        const ctx = this.$refs.chart.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(d => d.label),
            datasets: [
              {
                label: 'Tasks by User',
                data: data.map(d => d.value),
                fill: false,
                borderColor: '#3e95cd',
                borderWidth: 2,
                pointBackgroundColor: '#3e95cd',
                pointRadius: 5
              }
            ]
          },
          options: {
            // customize chart options here
          }
        });
      }
    }
  };
  </script>
  