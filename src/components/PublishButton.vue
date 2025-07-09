<template>
  <div>
    <button
      @click="handlePublish"
      :disabled="isDisabled"
      class="w-full p-3 rounded-md font-bold transition-colors"
      :class="buttonClasses"
      type="button"
    >
      {{ buttonText }}
    </button>

    <div 
      v-if="message" 
      :class="messageClasses"
      class="mt-4 text-center"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from '@/types/app';

interface Props {
  isLoading: boolean;
  isEditMode: boolean;
  message: Message | null;
  disabled?: boolean;
}

interface Emits {
  (e: 'publish'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isDisabled = computed(() => props.isLoading || props.disabled);

const buttonText = computed(() => {
  if (props.isLoading) return 'Publishing...';
  return props.isEditMode ? 'Save Changes' : 'Publish';
});

const buttonClasses = computed(() => ({
  'bg-green-500 text-white hover:bg-green-600': !isDisabled.value,
  'bg-gray-400 text-gray-600 cursor-not-allowed': isDisabled.value,
}));

const messageClasses = computed(() => ({
  'text-green-500': props.message?.type === 'success',
  'text-red-500': props.message?.type === 'error',
}));

const handlePublish = () => {
  if (!isDisabled.value) {
    emit('publish');
  }
};
</script>
