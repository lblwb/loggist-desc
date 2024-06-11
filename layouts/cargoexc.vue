<script setup lang="ts">
// definePageMeta({
//   // title: "Грузовые перевозки",
//   titleTemplate: "%->%",
// })
</script>
<template>
  <div class="excApp">
    <div class="excHead">
      <MainNavbar/>
    </div>
    <div class="excContext">
      <slot/>
    </div>
  </div>
</template>
<style>
@import "~/assets/css/main.css";
</style>
<style scoped>
.excApp{
  padding: 0 64px;
}
.excHead{
  margin-top: 32px;
  margin-bottom: 32px;
}
</style>