<template>
  <div class="wrapper min-vh-100 d-flex flex-column justify-content-center align-items-center">
    <!-- Background Video -->
    <div class="video-background">
      <video autoplay loop muted>
        <source src="../../assets/login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="transparent-card p-4">
              <CCardBody class="d-flex flex-column align-items-center fw-light">
                <!-- Logo Section -->
                <div class="logo-container mb-4">
                  <img src="@/assets/images/logo.png" alt="SIMS Logo" class="logo-img" />
                </div>
                <!-- Company Name -->
                <h2 class="text-center mb-2">Smart Incident Management System (SIMS)</h2>

                <p class="text-center text-body-secondary">Sign In to your account</p>

                <!-- Username Input -->
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autocomplete="username" v-model="username" />
                </CInputGroup>

                <!-- Password Input -->
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput type="password" placeholder="Password" autocomplete="current-password"
                    v-model="password" />
                </CInputGroup>

                <!-- Login Button -->
                <CRow>
                  <CCol :xs="6">
                    <CButton color="primary" @click="handleSubmit" class="px-4">Login</CButton>
                  </CCol>
                </CRow>

                <!-- Error Message (if any) -->
                <p v-if="error" class="text-danger mt-2">{{ error }}</p>
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
import axios from 'axios'
import { BASE_URL, API_ROUTES } from '../../constants/config'
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
        const res = await axios.post(`${BASE_URL}${API_ROUTES.AUTH.LOGIN}`, {
          username: username.value,
          password: password.value,
        })

        await authStore.saveAuthUser(res.data);
        router.push('/dashboard');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        console.log(err)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Login failed, please try again",
          showConfirmButton: false,
          timer: 1500
        });
        error.value = err.response ? err.response.data.message : 'invalid Login';
      }
    };

    return {
      username,
      password,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 100vh;
  /* Full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  /* Send the video behind content */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-img {
  width: 80px;
  height: auto;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  color: #007bff;
  text-align: center;
}

p.text-body-secondary {
  font-size: 16px;
}

.text-center {
  text-align: center;
}

.text-danger {
  font-size: 14px;
}

.ccard-body {
  background-color: rgba(255, 255, 255, 0.85);
  /* Semi-transparent background */
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
}

h2,
p {
  color: #333;
}

.mb-4 {
  margin-bottom: 2rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

p.text-danger {
  color: red;
}

.transparent-card {
  background-color: rgba(255, 255, 255, 0.7);
  /* Set transparent background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Optional: lighter shadow */
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* Optional: softer border */
}
</style>
