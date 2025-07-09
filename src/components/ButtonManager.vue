<template>
  <div class="mb-4">
    <h2 class="text-lg font-semibold mb-2">Reply Markup Buttons</h2>
    
    <div 
      v-for="(button, index) in modelValue" 
      :key="index" 
      class="flex items-center space-x-2 mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
    >
      <input
        type="text"
        :value="button.text"
        @input="updateButtonText(index, $event)"
        placeholder="Button Text"
        class="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
      />
      <input
        type="url"
        :value="button.url"
        @input="updateButtonUrl(index, $event)"
        placeholder="Button URL"
        class="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
      />
      <button
        @click="removeButton(index)"
        class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 min-w-[40px]"
        type="button"
        title="Remove button"
      >
        -
      </button>
    </div>
    
    <button
      @click="addButton"
      class="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      type="button"
    >
      Add Button
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Button } from '@/types/app';

interface Props {
  modelValue: Button[];
}

interface Emits {
  (e: 'update:modelValue', value: Button[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateButtonText = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const updatedButtons = [...props.modelValue];
  updatedButtons[index] = { ...updatedButtons[index], text: target.value };
  emit('update:modelValue', updatedButtons);
};

const updateButtonUrl = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const updatedButtons = [...props.modelValue];
  updatedButtons[index] = { ...updatedButtons[index], url: target.value };
  emit('update:modelValue', updatedButtons);
};

const addButton = () => {
  const updatedButtons = [...props.modelValue, { text: '', url: '' }];
  emit('update:modelValue', updatedButtons);
};

const removeButton = (index: number) => {
  const updatedButtons = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updatedButtons);
};
</script>
