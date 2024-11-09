<template>
  <!-- from data -->
  <CRow>
    <CRow>
      <CCol class="d-flex justify-content-end">
        <CButton color="primary" @click="() => { filterModal = true }">Filter</CButton>
      </CCol>
    </CRow>
    <CModal :visible="filterModal" @close="() => { filterModal = false }">
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">Filter From</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormInput v-model="fromDate" type="date" label="From Date" />
            </CForm>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormInput v-model="toDate" type="date" label="To Date" />
            </CForm>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormSelect v-model="reasonOfAccident" label="Reason Of Accidents">
                <option value="">Select Reason Of Accidents</option>
                <option v-for="(val, index) in reasonData" :value="val.reasons_of_accident">{{ val.reasons_of_accident }}
                </option>
              </CFormSelect>
            </CForm>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormSelect v-model="locationZone" label="Location Zone">
                <option value="">Select Location Zone</option>
                <option v-for="(val, index) in locationZoneData" :value="val.location_zone">{{ val.location_zone }}
                </option>
              </CFormSelect>
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" @click="reset">
          reset
        </CButton>
        <CButton color="primary" @click="Search">Search</CButton>
      </CModalFooter>
    </CModal>
  </CRow>
  <CRow class="mt-2">
    <CCol :md="3" class="mb-4">
      <CCard color="success" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Accident</CCardTitle>
          <CCardText>2724</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="3" class="mb-4">
      <CCard color="danger" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Fatal Injury</CCardTitle>
          <CCardText>2036</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="3" class="mb-4">
      <CCard color="warning" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Major Injury</CCardTitle>
          <CCardText>132</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="3" class="mb-4">
      <CCard color="primary" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Minor Injury</CCardTitle>
          <CCardText>152</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- Dashboard design -->
  <CRow class="mt-2">
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accident By Month</CCardHeader>
        <CCardBody>
          <CChartBarCount  />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>No. Of Persons Injured</CCardHeader>
        <CCardBody>
          <secoundBarChart data:sumInjury/>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  {{apiData}}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CChartBarCount, secoundBarChart } from './index.js';
import { masterPinaStore } from '@/stores/master';
import axios from 'axios';
import { BASE_URL, API_ROUTES } from '@/constants/config.js'
import Swal from 'sweetalert2'

const masterStore = masterPinaStore();
const filterModal = ref(false);
const fromDate = ref('');
const toDate = ref('');
const locationZone = ref('');
const reasonOfAccident = ref('')
const reasonData = ref([]);
const locationZoneData = ref([]);
const apiData = ref({});
const sumInjury = ref([]);

const reset = () => {
  fromDate.value = '';
  toDate.value = '';
  locationZone.value = '';
  reasonOfAccident.value = '';
};

const Search = async () => {
  try {
    const res = await axios.post(`${BASE_URL}${API_ROUTES.Graph.DASHBOARD}`, {
      fromDate: fromDate.value,
      toDate: toDate.value,
      locationZone: locationZone.value,
      reasonOfAccident: reasonOfAccident.value
    })
    apiData.value = res.data;
    sumInjury.value=res.data.sumInjury;
    filterModal.value=false;
    Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are filter data successfully",
          showConfirmButton: false,
          timer: 1500
        });
  } catch (error) {
    console.log(error)
    Swal.fire({
          position: "top-end",
          icon: "error",
          title: "You are filter data  successfully",
          showConfirmButton: false,
          timer: 1500
        });
  }
}
console.log(sumInjury.value);
onMounted(async () => {
 
  try {
    await masterStore.getLocationZone();
    await masterStore.getReasonOfAccident();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error appropriately, e.g., show error message to the user
  }
  reasonData.value = await masterStore.getReasonOfAccidentData;
  locationZoneData.value = await masterStore.getLocationZoneData;
  Search();
})

</script>
