<template>
  <div class="mb-4">
    <label 
      for="content" 
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Content (Markdown supported)
    </label>
    <textarea
      id="content"
      :value="modelValue"
      @input="updateValue"
      rows="10"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter your post content here..."
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>
