<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autocomplete="username" v-model="username" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autocomplete="current-password"
                      v-model="password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" @click="handleSubmit" class="px-4"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { userPinaStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import Swal from 'sweetalert2'

export default {
  setup() {
    const authStore = userPinaStore();
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await authStore.login({ username: username.value, password: password.value });
        router.push('/dashboard');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are login successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something is wrong to login",
          showConfirmButton: false,
          timer: 1500
        });
        error.value = err.message;
      }
    };

    const handleLogout = () => {
      authStore.logout();
    };


    return {
      username,
      password,
      error,
      handleSubmit,
      handleLogout,
    };
  },
};
</script>