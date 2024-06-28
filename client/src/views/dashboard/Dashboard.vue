
<template>
  <CRow>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accident By Month</CCardHeader>
        <CCardBody><CChartBarCount /></CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accident By Month</CCardHeader>
        <CCardBody><secoundBarChart /></CCardBody>
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

