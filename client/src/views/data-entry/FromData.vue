<template>
  <CRow>
    <CCard>
      <CCardHeader>Accident Data Entry From</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Last Accident ID" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Last Accident Entry Date" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Sl. No" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Incident ID" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CDatePicker label="Accident Date" locale="en-US" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="Accident Time"
                locale="en-US"
                placeholder="Enter Accident Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Location" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Direction" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Primary Vehicle" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Secondary Vehicle" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Third Vehicle" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="text" label="Source Of Information" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput
                type="number"
                label="Person Involve In Accident"
                placeholder="Enter Number"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="number" label="Fatal Injury" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="number" label="Major Injury" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="number" label="Minor Injury" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormInput type="number" label="No Injury" placeholder="" />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="RPV Response Time"
                locale="en-US"
                placeholder="Enter RPV Response Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="Ambulance Response Time"
                locale="en-US"
                placeholder="Enter Ambulance Response Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CTimePicker
                label="Recovery Response Time"
                locale="en-US"
                placeholder="Enter Recovery Response Time"
              />
            </CForm>
          </CCol>
          <CCol :md="4" class="mb-4">
            <CForm>
              <CFormTextarea
                label="Reason Of Accident"
                rows="3"
                text="Must be 8-20 words long."
              ></CFormTextarea>
            </CForm>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="6" class="d-flex justify-content-end mb-4">
            <CButton color="danger">Cancel</CButton>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CButton color="success">Submit</CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </CRow>
</template>
