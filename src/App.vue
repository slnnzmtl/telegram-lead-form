<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4 max-w-lg">
      <h1 class="text-2xl text-white font-bold mb-4 text-center">Залиште заявку і ми звʼяжемося з вами</h1>
      <LeadForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import LeadForm from './components/LeadForm.vue';

</script>

<style scoped lang="scss">
.container {
  
}
</style>