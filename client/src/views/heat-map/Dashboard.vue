<template>
  <!-- from data -->
  <CRow>
    <CCol :md="6" class="mb-4">
      <CForm>
        <CFormInput type="datetime-local" label="From Date" placeholder="Select From Date" />
      </CForm>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CForm>
        <CFormInput type="datetime-local" label="From Date" placeholder="Select From Date" />
      </CForm>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CForm>
        <CFormSelect aria-label="Default select example">
  <option value="">Select Reason Of Accidents</option>
  <option value="1">One</option>
  <option value="2">Two</option>
</CFormSelect>
      </CForm>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CForm>
        <CFormSelect aria-label="Default select example">
  <option value="">Select Location Zone</option>
  <option value="1">One</option>
  <option value="2">Two</option>
</CFormSelect>
      </CForm>
    </CCol>
  </CRow>
<hr>
<!-- Dashboard design -->
  <CRow>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accident By Month</CCardHeader>
        <CCardBody>
          <CChartBarCount />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accident By Month</CCardHeader>
        <CCardBody>
          <secoundBarChart />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script setup>
import {
  CChartBarCount,
  secoundBarChart,
} from './index.js'
</script>
