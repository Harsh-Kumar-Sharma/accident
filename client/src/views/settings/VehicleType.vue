<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">vechicle Type</h4>
        <button class="btn btn-primary" @click="reset(),openModal = true" type="button">
         <CIcon :icon="icon.cilPlaylistAdd" size="lg"/> Add New vechicle Type
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="allVehicleType"
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
         <div class="col-10 ">
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
      <CModalTitle id="StaticBackdropExampleLabel">Add New Vehicle Type</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- vechicle_type-->
          <div class="col-12">
            <CFormInput label="vechicle Type" v-model="payload.vehicleType" required />
          </div>

        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="saveVehicleType"><CIcon :icon="icon.cilSave" size="lg"/>Save</CButton>
      <CButton color="danger" @click="reset"><CIcon :icon="icon.cilReload" size="lg"/>Reset</CButton>
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
      <CModalTitle id="StaticBackdropExampleLabel">Edit Vehicle Type</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- Vehicle Type -->
          <div class="col-12">
            <CFormInput label="vechicle Type" v-model="payload.vehicleType" required />
          </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="updateVehicleType"><CIcon :icon="icon.cilSave" size="lg"/>Save</CButton>
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
const allRoles = ref([]);
const vechicleTypeId = ref(null)

const columns = [
  {
    key: 'id',
    _style: { width: '20%' },
  },
  {
    key: 'vehicle_type',
    _style: { width: '20%' },
  },
   {
    key: 'Action',
    _style: { width: '8%' },
  }
]
const allVehicleType = ref([])


const saveVehicleType = async ()=>{
try{
  await axios.post(`${BASE_URL}${API_ROUTES.vehicleType.create}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getVehicleType();
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

const updateVehicleType = async ()=>{
try{
  await axios.put(`${BASE_URL}${API_ROUTES.vehicleType.update(vechicleTypeId.value)}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getVehicleType();
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

const editVehicleType = async (data)=>{
  openEditModal.value=true;
  vechicleTypeId.value= data.id;
  payload.value={
    vehicleType:data.vehicle_type 
  }
}

const getVehicleType = async ()=>{
  try{
    const res = await axios.get(`${BASE_URL}${API_ROUTES.vehicleType.get}`)
 allVehicleType.value=res.data.data;
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

getVehicleType();

</script>
