<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">Source Of Informations </h4>
        <button class="btn btn-primary" @click="reset(),openModal = true" type="button">
          <CIcon :icon="icon.cilPlaylistAdd" size="lg"/> Add New Reasons Of Accidents
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="allSourceOfInformation"
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
        <div class="row">
        <div class="col-10">
          <CButton size="sm" @click="editSourceOfInformation(item)" color="info"><CIcon :icon="icon.cilPenAlt" size="lg"/>Edit</CButton>
     
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
      <CModalTitle id="StaticBackdropExampleLabel">Add New Reasons Of Accidents</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- vechicle_type-->
          <div class="col-12">
            <CFormInput label="Source Of Information" v-model="payload.sourceOfInformation" required />
          </div>

        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="saveSourceOfInformation">Save</CButton>
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
      <CModalTitle id="StaticBackdropExampleLabel">Edit Reasons Of Accidents</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- Vehicle Category-->
          <div class="col-12">
            <CFormInput label="Source Of Information" v-model="payload.sourceOfInformation" required />
          </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="updateSourceOfInformation">Save</CButton>
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
const sourceOfInformationId= ref(null)

const columns = [
  {
    key: 'id',
      _style: { width: '20%' },
  },
  {
    key: 'source_of_information',
      _style: { width: '20%' },
  },
   {
    key: 'Action',
      _style: { width: '10%' },
  }
]
const allSourceOfInformation= ref([])

const saveSourceOfInformation = async ()=>{
try{
  await axios.post(`${BASE_URL}${API_ROUTES.sourceOfInformation.create}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getSourceOfInformation();
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

const updateSourceOfInformation = async ()=>{
try{
  await axios.put(`${BASE_URL}${API_ROUTES.sourceOfInformation.update(sourceOfInformationId.value)}`,payload.value);
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getSourceOfInformation();
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

const editSourceOfInformation = async (data)=>{
  openEditModal.value=true;
  sourceOfInformationId.value= data.id;
  payload.value={
    sourceOfInformation:data.source_of_information 
  }
}

const getSourceOfInformation= async ()=>{
  try{
    const res = await axios.get(`${BASE_URL}${API_ROUTES.sourceOfInformation.get}`)
 allSourceOfInformation.value=res.data.data;
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

getSourceOfInformation();

</script>
