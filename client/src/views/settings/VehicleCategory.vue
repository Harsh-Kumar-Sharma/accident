<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">Vechicle Category</h4>
        <button class="btn btn-primary" @click="reset(),openModal = true" type="button">
          <CIcon :icon="icon.cilPlaylistAdd" size="lg"/> Add New vechicle Category
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="allVehicleCategory"
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
    <template #vechicle_type="{ item }">
      <td>
        {{ item.vechicle_Category}}
      </td>
    </template>
      


    <template #Action="{ item }">
      <div class="row" >
         <div class="col-10">
          <CButton size="sm" @click="editVehicleCategory(item)" color="info"><CIcon :icon="icon.cilPenAlt" size="lg"/>Edit</CButton>
       
          <CButton size="sm" color="danger" @click="deleteVehicleCategory(item.id)" class="ms-1"><CIcon :icon="icon.cilTrash" size="lg"/>Delete</CButton>
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
      <CModalTitle id="StaticBackdropExampleLabel">Add New User</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <div class="col-12">
            <CFormInput label="vehicle Category" v-model="payload.vehicleCategory" required />
          </div>
        <div class="col-12">
         <CForm>
              <CFormSelect
                label="Vehicle Type"
                v-model="payload.vehicleType"
                :options="vehicleOptions"
              />
            </CForm>
        </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="saveVehicleCategory">Save</CButton>
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
      <CModalTitle id="StaticBackdropExampleLabel">Edit Vehicle Type</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
         
          <div class="col-12">
            <CFormInput label="vehicle Category" v-model="payload.vehicleCategory" required />
          </div>

            <div class="col-12">
         <CForm>
              <CFormSelect
                label="Vehicle Type"
                v-model="payload.vehicleType"
                :options="vehicleOptions"
              />
            </CForm>
        </div>
        
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="updateVehicleCategory">Save</CButton>
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
const vechicleCategoryId = ref(null)
const vehicleOptions = ref([{ label: 'Select menu', value: '' }]);
const columns = [
  {
    key: 'id',
    _style: { width: '10%' },
  },
  {
    key: 'vehicle_category',
    _style: { width: '10%' },
  },
    {
    key: 'vehicle_type',
    _style: { width: '10%' },
  },
   {
    key: 'Action',
    _style: { width: '10%' },
  }
]
const allVehicleCategory= ref([])


const saveVehicleCategory= async ()=>{
try{
  await axios.post(`${BASE_URL}${API_ROUTES.vehicleCategory.create}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getVehicleCategory();
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

const updateVehicleCategory= async ()=>{
try{
  await axios.put(`${BASE_URL}${API_ROUTES.vehicleCategory.update(vechicleCategoryId.value)}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getVehicleCategory();
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

const editVehicleCategory = async (data)=>{
  openEditModal.value=true;
  vechicleCategoryId.value= data.id;
  payload.value={
    vehicleCategory:data.vehicle_category,
    vehicleType:data.vehicle_type
  }
}

const getVehicleCategory = async ()=>{
  try{
    const res = await axios.get(`${BASE_URL}${API_ROUTES.vehicleCategory.get}`)
 allVehicleCategory.value=res.data.data;
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

// Fetch vehicle types
const getVehicleType = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${API_ROUTES.vehicleType.get}`);
    vehicleOptions.value = [{ label: 'Select menu', value: '' }]; // Clear previous options
    res.data.data.forEach(val => {
      vehicleOptions.value.push({ label: val.vehicle_type, value: val.vehicle_type });
    });
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.message });
  }
};

getVehicleCategory();

getVehicleType();

</script>
