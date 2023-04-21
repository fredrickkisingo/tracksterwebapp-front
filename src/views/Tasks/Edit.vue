<template>
<side-menu />

<main class="main-content" id="main-content">
    <!-- begin::page header -->
  <div class="page-header">
      <h3>Update Task</h3>
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
                        <VueDatePicker v-model="task.due_date" :direction="'bottom'"></VueDatePicker>
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
                            <option v-for="status in statusOptions" :key="status.value" :value="status.value">{{ status.label }}</option>
                        </select>
                      </div>
                    </div>
                    <!-- only output remarks if the status is completed -->
                    <div class="col-md-6" v-if="selectedStatus == 4 || selectedStatus  == 1">
                        <textarea class="form-control" v-model="task.remarks" rows="24" style="height:120px" cols="50" placeholder="Remarks"></textarea>
                    </div>
                    
                 
                    <div class="col-md-12">
                      <div class="form-group">
                        <button @click.prevent="updateTask()" style="margin-top:20px" class="btn btn-primary float-right">
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
import { inject } from 'vue'
import  SideMenu from '/src/components/dashboard/SideMenu.vue'
import VueDatePicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from "axios";

export default{

name: 'edit-task',
data(){
    return{
        task: {
            name: '',
            description: '',
            status_id: '',
            due_date: '',
            remarks: '',
        },
        errors: [],
      status: [],
      selectedStatus: null,
      statusOptions: [],
    }
    },

    components :{
    SideMenu
},
mounted(){
    this.getTask();
    this.getStatus();
},


methods:{
    getTask(){
        const $fetch = inject('$fetch')
        const id = this.$route.params.id;
        $fetch.get('/tasks/'+id).then(response => {
            this.task = response.data.data;
            this.selectedStatus = this.task.status_id;
        })
    },
    getStatus(){
        const $fetch = inject('$fetch')
        $fetch.get('/status').then(response => {
            this.status = response.data;
            this.statusOptions = this.status.map(status => {
                return {
                    value: status.id,
                    label: status.name
                }
            })
        })
    },
    async updateTask(){
        const $fetch = inject('$fetch')
        const id = this.$route.params.id;
        await $fetch.put('/tasks/'+id, this.task).then(response => {
            
            toast.success('Task Updated Successfully');
            this.$router.push('/tasks');

        }).catch(error => {

            toast.error('An Error Occured while updating the task please try again');
             
        })
    }
}
}


</script>