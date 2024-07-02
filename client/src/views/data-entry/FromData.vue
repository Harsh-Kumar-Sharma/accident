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
                            <CFormInput type="text" label="Accident Date" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Accident Time" placeholder="" />
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
                            <CFormInput type="number" label="Person Involve In Accident" placeholder="Enter Number" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Fatal Injury" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Major Injury" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Minor Injury" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="No Injury" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="RPV Response Time" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Ambulance Response Time" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Recovery Response Time" placeholder="" />
                        </CForm>
                    </CCol>
                    <CCol :md="4" class="mb-4">
                        <CForm>
                            <CFormInput type="text" label="Reason Of Accident" placeholder="" />
                        </CForm>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol :md="6" class=" d-flex justify-content-end mb-4">
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