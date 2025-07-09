<template>
  <div class="mb-4">
    <label 
      for="image" 
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Image
    </label>
    <input
      type="file"
      id="image"
      @change="handleFileChange"
      accept="image/*"
      class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
    <div v-if="preview" class="mt-2">
      <img 
        :src="preview" 
        class="max-w-xs max-h-48 rounded-md border border-gray-300 dark:border-gray-600"
        alt="Image preview"
      />
      <button 
        @click="removeImage" 
        class="mt-1 text-sm text-red-500 hover:text-red-700"
        type="button"
      >
        Remove Image
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue: string | null;
}

interface Emits {
  (e: 'update:modelValue', value: string | null): void;
  (e: 'file-selected', file: File | null): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const preview = ref<string | null>(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  preview.value = newValue;
});

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        preview.value = result;
        emit('update:modelValue', result);
        emit('file-selected', file);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }
};

const removeImage = () => {
  preview.value = null;
  emit('update:modelValue', null);
  emit('file-selected', null);
  
  // Reset file input
  const fileInput = document.getElementById('image') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
};
</script>
