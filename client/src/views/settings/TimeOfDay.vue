<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">Time Of Day</h4>
        <button class="btn btn-primary" @click="reset(),openModal = true" type="button">
          <CIcon :icon="icon.cilPlaylistAdd" size="lg"/> Add New Time Of Day
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="allTimeOfDays"
    :itemsPerPage="5"
    itemsPerPageSelect
    pagination
    :sorterValue="[{ column: 'status', state: 'asc' }]"
    :tableBodyProps="{
      className: 'align-middle',
    }"
    :tableProps="{
      striped: true,
      hover: true,
    }"
  >
    <template #time_of_day="{ item }">
      <td>
        {{ item.time_of_day}}
      </td>
    </template>

     <template #start_time="{ item }">
      <td>
        {{ item.start_time}}
      </td>
    </template>

     <template #end_time="{ item }">
      <td>
        {{ item.end_time}}
      </td>
    </template>
      

    <template #Action="{ item }">
      <div class="row">
        <div class="col-12 ">
          <CButton size="sm" @click="editTimeOfDay(item)" color="info"><CIcon :icon="icon.cilPenAlt" size="lg"/>Edit</CButton>
        
          <CButton size="sm" color="danger" @click="deleteUser(item.id)" class="ms-1"><CIcon :icon="icon.cilTrash" size="lg"/>Delete</CButton>
        </div>
      </div>
    </template>
  </CSmartTable>

  <!-- Modal for Create User -->
  <CModal
    backdrop="static"
    :visible="openModal"
    @close="
      () => { 
        openModal = false
      }
    "
    hide-footer>
    <CModalHeader>
      <CModalTitle id="StaticBackdropExampleLabel">Add New Time Of Day</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
       <div class="row">
    <!-- Time of Day Input -->
    <div class="col-12">
      <CFormInput 
        label="Time of Day" 
        v-model="payload.timeOfDay" 
        required 
        id="timeOfDay"
      />
    </div>

    <!-- Start Time Picker -->
    <div class="col-12">
      <CTimePicker
        label="Start Time"
        v-model:time="payload.startTime"
        locale="en-US"
        placeholder="Enter Start Time"
        id="startTime"
      />
    </div>

    <!-- End Time Picker -->
    <div class="col-12">
      <CTimePicker
        label="End Time"
        v-model:time="payload.endTime"
        locale="en-US"
        placeholder="Enter End Time"
        id="endTime"
      />
    </div>
  </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="saveTimeOfDay">Save</CButton>
      <CButton color="danger" @click="reset">Reset</CButton>
    </CModalFooter>
  </CModal>

  <!-- Modal for Edit User -->
  <CModal
    backdrop="static"
    :visible="openEditModal"
    @close="
      () => {
        openEditModal = false
      }
    "
    hide-footer>
    <CModalHeader>
      <CModalTitle id="StaticBackdropExampleLabel">Edit Time Of Day</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
    <div class="row">
          <div class="col-12">
            <CFormInput label="Time of Day" v-model="payload.timeOfDay" required />
          </div>
 <div class="col-12">
   <CTimePicker
   label="Start Time" v-model:time="payload.startTime"
                locale="en-US"
                placeholder="Enter Start Time"
              />
          </div>
           <div class="col-12">
            <CTimePicker
   label="End Time" v-model:time="payload.endTime"
                locale="en-US"
                placeholder="Enter End Time"
              />
          </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="updateTimeOfDay">Save</CButton>
    </CModalFooter>
  </CModal>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { BASE_URL, API_ROUTES} from '@/constants/config.js'
import Swal from 'sweetalert2'
import { CIcon } from '@coreui/icons-vue';
    import * as icon from '@coreui/icons';
const details = ref([])
const openModal = ref(false)
const payload = ref({})
const openEditModal=ref(false)
const timeOfDayId= ref(null)

const columns = [
  {
    key: 'id',
  },
  {
    key: 'time_of_day',
  },
  {
    key: 'start_time',
  },
   {
    key: 'end_time',
  },
   {
    key: 'Action',
   
  }
]
const allTimeOfDays= ref([])


const saveTimeOfDay = async ()=>{
try{

await axios.post(`${BASE_URL}${API_ROUTES.timeOfDays.create}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getTimeOfDay();
  openModal.value=false;
 }
 catch(error){
  if  (error.response)
      Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2000
        });
        else console.log(error);
 }
}

const updateTimeOfDay = async ()=>{
try{
  await axios.put(`${BASE_URL}${API_ROUTES.timeOfDays.update(timeOfDayId.value)}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getTimeOfDay();
  openEditModal.value=false;
 }
 catch(error){
  if  (error.response)
      Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2000
        });
        else console.log(error);
 }
}

const reset = ()=>{
  payload.value={};
}

const editTimeOfDay = async (data)=>{
  openEditModal.value=true;
  timeOfDayId.value= data.id;
  payload.value={
    timeOfDay:data.time_of_day,
     startTime:data.start_time?data.start_time:'',
    endTime:data.end_time?data.end_time:''
  }
}

const getTimeOfDay = async ()=>{
  try{
    const res = await axios.get(`${BASE_URL}${API_ROUTES.timeOfDays.get}`)
 allTimeOfDays.value=res.data.data;
  }
  catch(error){
          Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2000
        });
  }
}

getTimeOfDay();

</script>
