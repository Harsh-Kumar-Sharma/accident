<script setup>
import avatar from '@/assets/images/avatars/8.jpg';
import { userPinaStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import Swal from 'sweetalert2'

 const authStore = userPinaStore();
   const router = useRouter();

const logout = async ()=>{
  try{
   await authStore.logout();
     router.push('/');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are logout successfully",
          showConfirmButton: false,
          timer: 1500
        });
  }catch(error){
  Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something is wrong to logout",
          showConfirmButton: false,
          timer: 1500
        });
  }
}

</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownItem @click="logout" > <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
