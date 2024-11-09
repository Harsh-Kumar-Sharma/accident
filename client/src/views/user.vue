<template>
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">Users Management</h4>
        <button class="btn btn-primary" @click="openModal = true" type="button">
          <i class="fas fa-plus"></i> Add New User
        </button>
      </div>
    </div>
  </div>
  <CSmartTable
    class="mt-2"
    :activePage="2"
    :columns="columns"
    clickableRows
    :items="items"
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
    <template #registered="{ item }">
      <td>
        {{ formatDate(item.registered) }}
      </td>
    </template>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>

    <template #Action="{ item }">
      <div class="row">
        <div class="col-5 d-flex justify-content-center">
          <CButton size="sm" color="info">Edit</CButton>
        </div>
        <div class="col-5 d-flex justify-content-center">
          <CButton size="sm" color="danger" class="ms-1">Delete</CButton>
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
    hide-footer
  >
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
            <CFormInput label="Mobile" v-model="userPayload.mobile" type="tel" required />
          </div>

          <!-- Role -->
          <div class="col-6">
            <CFormSelect
              label="Select Role"
              v-model="userPayload.roleName"
              :options="allRoles"
              required
            />
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
      <CButton color="danger" @click="resetForm">Reset</CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup>
import { ref } from 'vue'

const details = ref([])
const openModal = ref(false)
const userPayload = ref({})

const columns = [
  {
    key: 'id',
  },
  {
    key: 'name',
    _style: { width: '20%' },
  },
  {
    key: 'registered',
    sorter: (date1, date2) => {
      const a = new Date(date1.registered)
      const b = new Date(date2.registered)
      return a > b ? 1 : b > a ? -1 : 0
    },
  },
  {
    key: 'role',
    _style: { width: '20%' },
  },
  'status',
  'Action',
]
const items = [
  {
    id: 1,
    name: 'Samppa Nori',
    avatar: '1.jpg',
    registered: '2021/03/01',
    role: 'Member',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Estavan Lykos',
    avatar: '2.jpg',
    registered: '2018/02/07',
    role: 'Staff',
    status: 'Banned',
  },
  {
    id: 3,
    name: 'Chetan Mohamed',
    avatar: '3.jpg',
    registered: '2020/01/15',
    role: 'Admin',
    status: 'Inactive',
    _selected: true,
  },
  {
    id: 4,
    name: 'Derick Maximinus',
    avatar: '4.jpg',
    registered: '2019/04/05',
    role: 'Member',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Friderik Dávid',
    avatar: '5.jpg',
    registered: '2022/03/25',
    role: 'Staff',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Yiorgos Avraamu',
    avatar: '6.jpg',
    registered: '2017/01/01',
    role: 'Member',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Avram Tarasios',
    avatar: '7.jpg',
    registered: '2016/02/12',
    role: 'Staff',
    status: 'Banned',
    _selected: true,
  },
  {
    id: 8,
    name: 'Quintin Ed',
    avatar: '8.jpg',
    registered: '2023/01/21',
    role: 'Admin',
    status: 'Inactive',
  },
  {
    id: 9,
    name: 'Enéas Kwadwo',
    avatar: '9.jpg',
    registered: '2024/03/10',
    role: 'Member',
    status: 'Pending',
  },
  {
    id: 10,
    name: 'Agapetus Tadeáš',
    avatar: '10.jpg',
    registered: '2015/01/10',
    role: 'Staff',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Carwyn Fachtna',
    avatar: '11.jpg',
    registered: '2014/04/01',
    role: 'Member',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Nehemiah Tatius',
    avatar: '12.jpg',
    registered: '2013/01/05',
    role: 'Staff',
    status: 'Banned',
    _selected: true,
  },
  {
    id: 13,
    name: 'Ebbe Gemariah',
    avatar: '13.jpg',
    registered: '2012/02/25',
    role: 'Admin',
    status: 'Inactive',
  },
  {
    id: 14,
    name: 'Eustorgios Amulius',
    avatar: '14.jpg',
    registered: '2011/03/19',
    role: 'Member',
    status: 'Pending',
  },
  {
    id: 15,
    name: 'Leopold Gáspár',
    avatar: '15.jpg',
    registered: '2010/02/01',
    role: 'Staff',
    status: 'Active',
  },
]

const formatDate = (date) => {
  const _date = new Date(date)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return _date.toLocaleDateString('en-US', options)
}

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      'primary'
  }
}

const toggleDetails = (item) => {
  if (details.value.includes(item._id)) {
    details.value = details.value.filter((_item) => _item !== item._id)
    return
  }

  details.value.push(item._id)
}

const saveUser = async () => {}

const resetForm = async () => {}
</script>
