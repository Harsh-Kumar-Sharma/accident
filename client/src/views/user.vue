<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">Users Management</h4>
        <button class="btn btn-primary" @click="reset(),openModal = true" type="button">
          <CIcon :icon="icon.cilUserPlus" size="lg"/> Add New User
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="allUsers"
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
    <template #username="{ item }">
      <td>
        {{ item.login.username }}
      </td>
    </template>
       <template #role_name="{ item }">
      <td>
        {{ item.user_role_mapping.role.role_name }}
      </td>
      </template>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.login.status)">{{ item.login.status }}</CBadge>
      </td>
    </template>

    <template #Action="{ item }">
      <div class="row">
        <div class="col-10">
          <CButton size="sm" @click="editUser(item)" color="info"><CIcon :icon="icon.cilPenAlt" size="lg"/>Edit</CButton>
        
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
      <CModalTitle id="StaticBackdropExampleLabel">Add New User</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- First Name -->
          <div class="col-6">
            <CFormInput label="First Name" v-model="userPayload.firstName" required />
          </div>

          <!-- Last Name -->
          <div class="col-6">
            <CFormInput label="Last Name" v-model="userPayload.lastName" required />
          </div>

          <!-- Email -->
          <div class="col-6">
            <CFormInput label="Email" v-model="userPayload.email" type="email" required />
          </div>

          <!-- Mobile -->
          <div class="col-6">
            <CFormInput label="Mobile" v-model="userPayload.mobile"  required />
          </div>

          <!-- Role -->
          <div class="col-6">
        <CFormSelect
    label="Select Role"
    v-model="userPayload.roleId"
    required
  >
    <option value="">Select Role</option>
    <option v-for="val in allRoles" :value="val.id" :key="val.id">{{ val.role_name }}</option>
  </CFormSelect>
          </div>

          <!-- Username -->
          <div class="col-6">
            <CFormInput label="Username" v-model="userPayload.username" required />
          </div>

          <!-- Password -->
          <div class="col-6">
            <CFormInput label="Password" v-model="userPayload.password" type="password" required />
          </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="saveUser">Save</CButton>
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
      <CModalTitle id="StaticBackdropExampleLabel">Edit User</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="row">
          <!-- First Name -->
          <div class="col-6">
            <CFormInput label="First Name" v-model="userPayload.firstName" required />
          </div>

          <!-- Last Name -->
          <div class="col-6">
            <CFormInput label="Last Name" v-model="userPayload.lastName" required />
          </div>

          <!-- Email -->
          <div class="col-6">
            <CFormInput label="Email" v-model="userPayload.email" type="email" required />
          </div>

          <!-- Mobile -->
          <div class="col-6">
            <CFormInput label="Mobile" v-model="userPayload.mobile"  required />
          </div>

          <!-- Role -->
          <div class="col-6">
        <CFormSelect
    label="Select Role"
    v-model="userPayload.roleId"
    required
  >
    <option v-for="val in allRoles" :value="val.id" :key="val.id">{{ val.role_name }}</option>
  </CFormSelect>
          </div>

          <!-- Username -->
          <div class="col-6">
            <CFormInput label="Username" v-model="userPayload.username" required />
          </div>

          <!-- Password -->
          <div class="col-6">
            <CFormInput label="Password" v-model="userPayload.password" type="password" required />
          </div>

          <!-- status -->
          <div class="col-6">
                  <CFormSelect label="Status" v-model="userPayload.status">
<option value="active">Active</option>
  <option value="deactive">Deactive</option>
</CFormSelect> 
          </div>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="primary" @click="updateUser">Save</CButton>
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
const userPayload = ref({})
const openEditModal=ref(false)
const allRoles = ref([]);
const userId= ref(null)

const columns = [
  {
    key: 'id',
  },
  {
    key: 'first_name',
  },
    {
    key: 'last_name',
  },
   {
    key: 'username',
  },
  {
    key: 'role_name',
  },
  'status',
   {
    key: 'Action',
  }
]
const allUsers = ref([])



const getBadge = (status) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'deactive':
      return 'danger'
    default:
      'primary'
  }
}


const saveUser = async () => {
 try{
  await axios.post(`${BASE_URL}${API_ROUTES.users.create}`,userPayload.value)
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Create successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getUsers();
  openModal.value=false;
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

const updateUser = async () => {
 try{
  await axios.put(`${BASE_URL}${API_ROUTES.users.update(userId.value)}`,userPayload.value)
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Update successfully",
          showConfirmButton: false,
          timer: 2000
        });
  reset();
  getUsers();
  openEditModal.value=false;
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


const reset = ()=>{
  userPayload.value={};
}

const editUser = async (data)=>{
  openEditModal.value=true;
  userId.value= data.id;
  userPayload.value={
    firstName:data.first_name,
    lastName:data.last_name,
    email:data.email,
    mobile:data.mobile,
    username:data.login.username,
    status:data.login.status,
    roleId: data.user_role_mapping.role_id 
  }
}


const getRoles = async ()=>{
  try{
    const res = await axios.get(`${BASE_URL}${API_ROUTES.users.getRoles}`)
 allRoles.value=res.data.data;
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

const getUsers = async ()=>{
  try{
    const res = await axios.get(`${BASE_URL}${API_ROUTES.users.getUser}`)
 allUsers.value=res.data.data.getusers;
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

const deleteUser = async (id)=>{
  try{
   await axios.delete(`${BASE_URL}${API_ROUTES.users.delete(id)}`)
   Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Delete successfully",
          showConfirmButton: false,
          timer: 2000
        });
         getUsers();
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

getRoles();
getUsers();
</script>
