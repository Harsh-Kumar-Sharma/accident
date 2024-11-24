<template>
  <CRow>
    <CCard>
      <CCardHeader>Accident Data Entry Form</CCardHeader>
      <CCardBody>
        <CRow>
          <!-- Fields for Accident Details -->
          <!-- <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="text"
                v-model="payload.slno"
                label="Sl. No"
                placeholder="Enter Sl. No."
              />
            </CForm>
          </CCol> -->
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="text"
                v-model="payload.incidentId"
                label="Incident ID"
                placeholder="Enter Incident Id"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CDatePicker
                v-model:date="payload.accidentDate"
                label="Accident Date"
                locale="en-US"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="Accident Time"
                v-model:time="payload.accidentTime"
                locale="en-US"
                placeholder="Enter Accident Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="text"
                v-model="payload.location"
                label="Location"
                placeholder="Enter Location"
              />
            </CForm>
          </CCol>
          
          <!-- Select Fields for Direction, Vehicle Types, Source of Information -->
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormSelect
                label="Direction"
                v-model="payload.direction"
                :options="directionOptions"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormSelect
                label="Primary Vehicle"
                v-model="payload.primaryVehicle"
                :options="vehicleOptions"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormSelect
                label="Secondary Vehicle"
                v-model="payload.secondaryVehicle"
                :options="vehicleOptions"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormSelect
                label="Third Vehicle"
                v-model="payload.thirdVehicle"
                :options="vehicleOptions"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormSelect
                label="Source Of Information"
                v-model="payload.sourceOfInformation"
                :options="informationSourceOptions"
              />
            </CForm>
          </CCol>
          
          <!-- Fields for Injuries and Response Times -->
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="number"
                v-model="payload.personInvolveInAccident"
                label="Person Involved In Accident"
                placeholder="Enter Number"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="number"
                v-model="payload.fatalInjury"
                label="Fatal Injury"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="number"
                v-model="payload.majorInjury"
                label="Major Injury"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="number"
                v-model="payload.minorInjury"
                label="Minor Injury"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="number"
                v-model="payload.noInjury"
                label="No Injury"
              />
            </CForm>
          </CCol>
          
          <!-- Response Times -->
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="RPV Response Time"
                v-model:time="payload.rpvResponseTime"
                locale="en-US"
                placeholder="Enter RPV Response Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="Ambulance Response Time"
                v-model:time="payload.ambulanceResponseTime"
                locale="en-US"
                placeholder="Enter Ambulance Response Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="Recovery Response Time"
                v-model:time="payload.recoveryResponseTime"
                locale="en-US"
                placeholder="Enter Recovery Response Time"
              />
            </CForm>
          </CCol>
          
          <!-- Reason for Accident -->
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormSelect
                label="Reason Of Accident"
                v-model="payload.reasonOfAccident"
                :options="reasonOptions"
              />
            </CForm>
          </CCol>
        </CRow>
        
        <!-- Form Buttons -->
        <CRow>
         <CCol :md="6" class="d-flex justify-content-end mb-4">
            <CButton color="success" @click="saveAccident"><CIcon :icon="icon.cilSave" size="lg"/>Submit</CButton>
          </CCol>
          <CCol :md="6" class=" mb-4">
            <CButton color="danger" @click="resetForm"><CIcon :icon="icon.cilReload" size="lg"/>Reset</CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </CRow>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import axios from 'axios'
import { BASE_URL, API_ROUTES } from '@/constants/config.js'
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
// Payload for the form fields
const payload = ref({
  incidentId: "",
  accidentDate: "",
  accidentTime: "",
  location: "",
  direction: "",
  primaryVehicle: "",
  secondaryVehicle: "",
  thirdVehicle: "",
  sourceOfInformation: "",
  personInvolveInAccident: 0,
  fatalInjury: 0,
  majorInjury: 0,
  minorInjury: 0,
  noInjury: 0,
  rpvResponseTime: "",
  ambulanceResponseTime: "",
  recoveryResponseTime: "",
  reasonOfAccident: "",
});

// Options for Select Fields
const directionOptions = [
  { label: 'Select menu', value: '' },
  { label: 'LHS', value: 'LHS' },
  { label: 'RHS', value: 'RHS' },
];

const vehicleOptions = ref([{ label: 'Select menu', value: '' }]);
const informationSourceOptions = ref([{ label: 'Select menu', value: '' }]);
const reasonOptions = ref([{ label: 'Select menu', value: '' }]);

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

// Fetch source of information
const getSourceOfInformation = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${API_ROUTES.sourceOfInformation.get}`);
    informationSourceOptions.value = [{ label: 'Select menu', value: '' }];
    res.data.data.forEach(val => {
      informationSourceOptions.value.push({ label: val.source_of_information, value: val.source_of_information });
    });
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.message });
  }
};

// Fetch reason of accidents
const getReasonOfAccident = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${API_ROUTES.reasonOfAccident.get}`);
    reasonOptions.value = [{ label: 'Select menu', value: '' }];
    res.data.data.forEach(val => {
      reasonOptions.value.push({ label: val.reasons_of_accidents, value: val.reasons_of_accidents });
    });
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.message });
  }
};

// On mounted, fetch the necessary data
onMounted(() => {
  getVehicleType();
  getSourceOfInformation();
  getReasonOfAccident();
});

// Save Accident Data
const saveAccident = async () => {
   try {
   await axios.post(`${BASE_URL}${API_ROUTES.accident.create}`,payload.value);
  resetForm();
  Swal.fire('Success', 'Accident Data Submitted', 'success');
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.message });
  }
};

// Reset Form
const resetForm = () => {
  Object.keys(payload.value).forEach(key => {
    payload.value[key] = key === 'fatalInjury' || key === 'majorInjury' || key === 'minorInjury' || key === 'noInjury' ? 0 : '';
  });
};
</script>