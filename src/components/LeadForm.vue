<template>
  <form @submit.prevent="handlePublish" class="space-y-4">
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
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTelegram } from '@/composables/useTelegram';
import { useForm } from '@/composables/useForm';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import InputPhone from '@/components/InputPhone.vue';
import TextArea from './TextArea.vue';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'YOUR_WEBHOOK_URL_HERE';
const { close } = useTelegram();
const { form, sendForm } = useForm(WEBHOOK_URL);

const formValid = computed(() => {
  return form.value.name.trim() !== '' &&
         form.value.phone.trim() !== ''
});

onMounted(() => {
  // Initialize form with empty values
  form.value = {
    name: '',
    phone: '',
    message: 'Доброго дня! Я хочу залишити заявку.',
  };
});

const handlePublish = async () => {
  if (!formValid.value) {
    return;
  }

  try {
    const success = await sendForm(form.value);
    if (success) {
      setTimeout(() => {
        close();
      }, 1500);
    }
  } catch (error) {
    console.error('Publishing error:', error);
  }
};
</script>
