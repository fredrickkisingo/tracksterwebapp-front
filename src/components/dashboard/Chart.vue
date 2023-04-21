<template>
    <div>
      <canvas :id="chart_id" :width="width" :height="height" :aria-label="chart_id" role="img" :responsive="false"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js'
  
  export default {
    mounted() {
      this.draw()
    },
  
    data() {
      return {
        chart_id: `chart-id-${Math.random(10)}`
      }
    },
    
    props: {
      type: {
        default() {
          return 'line'
        }
      },
      data: {
        default() {
          return []
        }
      },
      options: {
        default() {
          return []
        }
      },
      width: {
        default() {
          return 300
        }
      },
      height: {
        default() {
          return 300
        }
      }
    },
  
    methods: {
      draw() {
        let ctx = document.getElementById(this.chart_id)
  
        new Chart(ctx, {
          type: this.type,
          data: this.data,
          options: this.options
        });
      }
    }
  }
  </script>