<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">Accident Data</h4>
        <button class="btn btn-primary" @click="reset(),openModal = true" type="button">
         <CIcon :icon="icon.cilFilter" size="lg"/> Filter
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="allAccidentData"
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
    <template #vehicle_type="{ item }">
      <td>
        {{ item.vehicle_type }}
      </td>
    </template>
      

    <template #Action="{ item }">
      <div class="row" >
         <div class="col-8 d-flex justify-content-center">
          <CButton size="sm" @click="editVehicleType(item)" color="info"><CIcon :icon="icon.cilPenAlt" size="lg"/>Edit</CButton>
       
          <CButton size="sm" color="danger" @click="deleteVehicleType(item.id)" class="ms-1"> <CIcon :icon="icon.cilTrash" size="lg"/>Delete</CButton>
        </div>
      </div>
    </template>
  </CSmartTable>

  <!-- Modal for Create Vehicle Type -->
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
      <CModalTitle id="StaticBackdropExampleLabel">Filter</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- vechicle_type-->
          <div class="col-12">
             <CDatePicker
                v-model:date="payload.accidentDateFrom"
                label="Accident Date From"
                locale="en-US"
              />
          </div>
     <div class="col-12">
             <CDatePicker
                v-model:date="payload.accidentDateTo"
                label="Accident Date To"
                locale="en-US"
              />
          </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="saveVehicleType">Search</CButton>
      <CButton color="danger" @click="reset">Reset</CButton>
    </CModalFooter>
  </CModal>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { BASE_URL, API_ROUTES} from '@/constants/config.js'
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import Swal from 'sweetalert2'
const openModal = ref(false)
const payload = ref({})
const vechicleTypeId = ref(null)
const page = ref(1)

const columns = [
  {
    key: 'id',
  },
  {
    key: 'incident_id',
  },
  {
    key: 'accident_date',
  },
  {
    key: 'accident_time',
  },
  {
    key: 'location',
  },
    {
    key: 'direction',
  },
   {
    key: 'Action',
  }
]
const allAccidentData = ref([])





const reset = ()=>{
  payload.value={};
}



const getAllAccident = async ()=>{
  try{
    const res = await axios.post(`${BASE_URL}${API_ROUTES.accident.getAccident}/${page.value}`)
 allAccidentData.value=res.data;
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

getAllAccident();

</script>
