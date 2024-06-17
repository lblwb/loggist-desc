<script setup lang="ts">
import {useAuthModalStore} from "~/stores/auth/modal/singIn";
import ModalAuth from "~/components/Main/Modal/Auth/ModalAuth.vue";

const authModalStore = useAuthModalStore();
</script>
<template>
  <div class="excApp">
    <div class="excHead">
      <MainNavbar/>
    </div>
    <div class="excContext">
      <slot/>
    </div>

    <div class="excModalsWrapper">
      <ModalAuth :is-visible="authModalStore.getStatusModalSignIn"
                 @close="authModalStore.setStatusShowModalSignIn(false)"/>
    </div>

    <div class="excToasts">
      <Notivue v-slot="item">
        <Notification :item="item"/>
      </Notivue>
    </div>
  </div>
</template>
<style>
@import "~/assets/css/main.css";
</style>
<style scoped>
.excApp {
  padding: 0 64px;
}

.excHead {
  margin-top: 32px;
  margin-bottom: 32px;
}
</style>