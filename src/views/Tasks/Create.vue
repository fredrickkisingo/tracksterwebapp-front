<template>
<side-menu />

<main class="main-content" id="main-content">
    <!-- begin::page header -->
  <div class="page-header">
      <h3>Add Task</h3>
    </div>
    <!-- end::page header -->

          <div class="card">
            <div class="card-body">
              <form >
                <div class="">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Task Name</label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          v-model="task.name"
                          placeholder="Task Name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Due Date</label>
                        <VueDatePicker v-model="task.date" :direction="'bottom'"></VueDatePicker>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Description</label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          v-model="task.description"
                          placeholder="e.g  to do something"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Status</label>
                        <select v-model="selectedStatus" class="form-select" >
                            <option value="Please select" disabled>Please select</option>

                            <option v-for="status in statusOptions" :key="status.value" :value="status.value">{{ status.label }}</option>
                        </select>
                      </div>
                    </div>
                    
                 
                    <div class="col-md-12">
                      <div class="form-group">
                        <button @click.prevent="createTask()" class="btn btn-primary float-right">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
</main>

</template>
<script>
import "/src/assets/scss/dashboard.scss";

import  SideMenu from '/src/components/dashboard/SideMenu.vue'
import VueDatePicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { inject } from 'vue'
import axios from "axios";

export default{

name: 'task-create',

data(){

    return {
        task: {
            name: '',
            description: '',
            status_id: null,
            due_date: ''
        },
        errors: [],
      status: [],
      selectedStatus: 'Please select',
      statusOptions: [],
    };

},
components: {
    SideMenu,
    VueDatePicker
  },
async mounted(){

    const $fetch = inject('$fetch')

    this.status = await $fetch.get('/status');

    const status= this.status.data

    this.statusOptions = status.map((status) => {
        return {
            value: status.id,
            label: status.name
        }
    })
    console.log(this.statusOptions)
},

methods : {
    async createTask(){
        
        //run validation here
        if(!this.task.name){
            toast.error(`Task name is required`);
            return;
        }
        if(!this.task.description){
            toast.error(`Task description is required`);
            return;
        }
        if(!this.task.date){
            toast.error(`Task due date is required`);
            return;
        }
        if(!this.selectedStatus){
            toast.error(`Task status is required`);
            return;
        }

        


        const task = {
            name: this.task.name,
            description: this.task.description,
            status_id: this.selectedStatus,
            due_date: this.task.date
        }

        const token = localStorage.getItem('access_token')
        const $fetch = inject('$fetch')

        await $fetch.post('/tasks', task).then((response) => {
    console.log(response)
            if(response.status === 200){
                toast.success(`Task added successfully`);
                this.$router.push('/tasks')
            }else{
                toast.error(`Something went wrong while adding the task.Please try again `);
            }
        }).catch((error) => {
            toast.error(`Something went wrong while adding the task.Please try again `);

        })
    }

    }
}


</script>