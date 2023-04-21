<template>
       <!-- begin::page header -->
  <div class="page-header">
      <h3>My Reports</h3>
    </div>
    <!-- end::page header -->

    <side-menu />
    <task-line-chart></task-line-chart>

</template>
<script>
import "/src/assets/scss/dashboard.scss";

import  SideMenu from '/src/components/dashboard/SideMenu.vue'
import TaskLineChart from '/src/components/dashboard/TaskLineChart.vue';
export default {
   name:'task-reports',
  components: {
    TaskLineChart,
    SideMenu
  }
};
</script>