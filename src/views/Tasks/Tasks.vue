<template>
<side-menu />

<main class="main-content" id="main-content">

    <!-- begin::page header -->
  <div class="page-header">
      <h3>My Tasks</h3>
    </div>
    <!-- end::page header -->

    <div class ="row">
        <div class="col-md-12 d-flex justify-content-end">
            <button class="btn btn-primary add-task" @click="addTask()">
            <i class="lni-plus"></i> Add Task
            </button>
        </div>

        <div class="task-table-container" v-if="tasks.data && tasks.data.length > 0">

           
            
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
        <div v-else>
                No tasks Created
        </div>
    </div>

</main>
</template>
<script>
import "/src/assets/scss/dashboard.scss";
import { inject } from 'vue'
import  SideMenu from '/src/components/dashboard/SideMenu.vue'
import moment from 'moment';


export default{
    name: 'Tasks',

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
    console.log(this.tasks)
    this.status = await $fetch.get('/status');
  },

  methods:{
    formatDueDate(date) {
      return moment(date).format('MMM DD, YYYY h:mm A');
    },
    addTask(){
        this.$router.push({ name: 'task-create' });
    },
    editTask(id) {
      this.$router.push({ name: 'edit-task', params: { id } });
    },
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