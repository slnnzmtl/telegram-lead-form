<template>
  <div>
    <h1 v-if="!submitted" class="text-2xl text-white font-bold mb-4 text-center">Залиште заявку і ми звʼяжемося з вами</h1>

    <form v-if="!submitted" @submit.prevent="handlePublish" class="space-y-4">
      <InputField
        v-model="form.name"
        label="Введіть ваше ім'я"
        required
      />
      <InputPhone 
        v-model="form.phone"
        label="Введіть ваш телефон"
        required
        default-country="UA"
      />
      <TextArea
        v-model="form.message"
        label="Повідомлення"
      />
      <div class="flex gap-4">
        <Button type="submit" :disabled="!formValid">Опублікувати</Button>
        <Button type="button" variant="secondary" @click="close">Закрити</Button>
      </div>
    </form>
    <div v-else class="flex text-white flex-col items-center justify-center py-12">
      <h2 class="text-2xl font-semibold mb-4">Дякуємо за вашу заявку!</h2>
      <p class="mb-6 text-center">Ми отримали вашу інформацію та зв'яжемося з вами найближчим часом.</p>
      <Button type="button" @click="close">Закрити</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTelegram } from '@/composables/useTelegram';
import { useForm } from '@/composables/useForm';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import InputPhone from '@/components/InputPhone.vue';
import TextArea from './TextArea.vue';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'YOUR_WEBHOOK_URL_HERE';
const { close } = useTelegram();
const { form, sendForm } = useForm(WEBHOOK_URL);

const submitted = ref(false);
const formValid = computed(() => {
  return form.value.name.trim() !== '' &&
         form.value.phone.trim() !== ''
});

function getServiceIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('serviceId') || '';
}

onMounted(() => {
  form.value = {
    name: '',
    phone: '',
    message: 'Доброго дня! Я хочу отримати консультацію.' as string,
    serviceId: getServiceIdFromUrl(),
  };
});

const handlePublish = async () => {
  if (!formValid.value) {
    return;
  }

  try {
    const success = await sendForm(form.value);
    if (success) {
      submitted.value = true;
    }
  } catch (error) {
    console.error('Publishing error:', error);
  }
};
</script>
