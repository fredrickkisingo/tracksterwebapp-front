<template>
<side-menu />

<main class="main-content" id="main-content">
  <!-- begin::page header -->
  <div class="page-header">
      <h3>Dashboard</h3>
    </div>
    <!-- end::page header -->

     <div class="row">
        <div class="col-md-3">
        <router-link :to="{ name: 'tasks' }">
          <div class="card stat-card">
            <div class="card-body green">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-uppercase font-size-11 m-b-15">
                    Completed Tasks
                  </h6>
                  <h4 class="m-b-0">
                    {{ completedTasksCount }}
                  </h4>
                </div>
                <div>
                  <div class="icon">
                    <i class="lni lni-book"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

     
      <div class="col-md-3">
        <router-link :to="{ name: 'tasks' }">
          <div class="card stat-card">
            <div class="card-body yellow">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-uppercase font-size-11 m-b-15">
                     Ongoing Tasks
                  </h6>
                  <h4 class="m-b-0">
                    {{ ongoingTasksCount }}
                  </h4>
                </div>
                <div>
                  <div class="icon">
                    <i class="lni lni-book"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link
          :to="{ name: 'tasks' }"
          class="text-secondary"
        >
          <div class="card stat-card">
            <div class="card-body gray">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-uppercase font-size-11 m-b-15">
                    Pending  Tasks
                  </h6>
                  <h4 class="m-b-0">
                    {{ pendingTasksCount }}
                  </h4>
                </div>
                <div>
                  <div class="icon">
                    <i class="lni lni-book"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link :to="{ name: 'tasks' }">
          <div class="card stat-card">
            <div class="card-body red">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-uppercase font-size-11 m-b-15">
                    Incomplete Tasks
                  </h6>
                  <h4 class="m-b-0">
                    {{ incompleteTasksCount }}
                  </h4>
                </div>
                <div>
                  <div class="icon">
                    <i class="lni lni-book"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div> 
    <div class ="row">
        <div class="col-md-12 d-flex justify-content-end">
            <button class="btn btn-primary add-task" @click="addTask()">
            <i class="lni-plus"></i> Add Task
            </button>
        </div>

        <div class="task-table-container">

           
            
            <table class="table table-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                
                <tr v-for="task in tasks.data" :key="task.id">
                <td>{{ task.name }}</td>
                <td>{{ task.description }}</td>
                <td>{{ formatDueDate(task.due_date) }}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-task" @click="editTask(task.id)">
                    <i class="lni-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
                    <i class="lni-trash"></i> Delete
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</main>
</template>
<script>
import "/src/assets/scss/dashboard.scss";
import { inject } from 'vue'

import  SideMenu from '../components/dashboard/SideMenu.vue'
import moment from 'moment';

export default{
name: 'Home',

setup(){

},
    components: {
    SideMenu
  },
  data() {
    return {
      tasks: [],
      status: []
    };
  },
  async created() {
    const $fetch = inject('$fetch')

    this.tasks = await $fetch.get('/tasks');
    this.status = await $fetch.get('/status');
  },
  computed: {

    completedTasksCount() {
        const tasks = this.tasks.data;

      const completedStatusId = 4;

      
      const completedTasks = tasks.filter(
        task => task.status_id === completedStatusId
      );
      return completedTasks.length;
    },
    pendingTasksCount() {
        const tasks = this.tasks.data;

      const pendingStatusId = 2;
      const pendingTasks = tasks.filter(
        task => task.status_id === pendingStatusId
      );
      return pendingTasks.length;
    },
    ongoingTasksCount() {
        const tasks = this.tasks.data;

      const ongoingStatusId = 3;
      const ongoingTasks = tasks.filter(
        task => task.status_id === ongoingStatusId
      );
      return ongoingTasks.length;
    },
    incompleteTasksCount() {
        const tasks = this.tasks.data;

      const ongoingStatusId = 1;
      const ongoingTasks = tasks.filter(
        task => task.status_id === ongoingStatusId
      );
      return ongoingTasks.length;
    },

  },
  async mounted(){
    const $fetch = inject('$fetch')

    const tasks =   await $fetch.get('/tasks');

    const status =   await $fetch.get('/status'); 

   

  },
  methods:{
    formatDueDate(date) {
      return moment(date).format('MMM DD, YYYY h:mm A');
    },
    editTask(id) {
      this.$router.push({ name: 'edit-task', params: { id } });
    },
    addTask(){
        this.$router.push({ name: 'task-create' });
    },
    async deleteTask(id) {

        const $fetch = inject('$fetch')

        const confirmed = await this.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

  if (confirmed) {
    await $fetch.delete(`/tasks/${id}`);
    await this.$swal(
      'Deleted!',
      'Your Task has been deleted.',
      'success'
    );
    window.location.reload();
  }
}
  }


}

</script>
<style scoped>
.task-table-container {
  border: 2px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  padding: 10px;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-collapse: collapse;
  border: 1px solid #dee2e6;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody+tbody {
  border-top: 2px solid #dee2e6;
}
.edit-task{
    margin-right: 10px;
}
.add-task{
    margin:10px;
}
</style>