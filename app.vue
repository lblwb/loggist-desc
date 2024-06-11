<script setup lang="ts">
const layout = "cargoexc";

useHead({
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk}` : '';
  }
})
</script>
<template>
  <div class="CargoTransApp">
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
