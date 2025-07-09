<template>
  <div class="container mx-auto p-4 max-w-lg">
    <h1 class="text-2xl font-bold mb-4 text-center">Create Channel Post</h1>

    <ContentEditor v-model="post.content" />
    
    <ImageUpload 
      v-model="post.image_url"
      @file-selected="handleFileSelected"
    />
    
    <ButtonManager v-model="post.reply_markup" />
    
    <PublishButton
      :is-loading="isLoading"
      :is-edit-mode="isEditMode"
      :message="message"
      :disabled="!canPublish"
      @publish="handlePublish"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ContentEditor from '@/components/ContentEditor.vue';
import ImageUpload from '@/components/ImageUpload.vue';
import ButtonManager from '@/components/ButtonManager.vue';
import PublishButton from '@/components/PublishButton.vue';
import { usePostEditor } from '@/composables/usePostEditor';
import { useImageUpload } from '@/composables/useImageUpload';
import { useButtonManager } from '@/composables/useButtonManager';
import { useTelegram } from '@/composables/useTelegram';
import { useApi } from '@/services/api';
import type { PublishPayload } from '@/types/app';

// Configuration - replace with your actual webhook URL
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'YOUR_WEBHOOK_URL_HERE';

// Composables
const { post, isEditMode, messageId, initializeEditMode } = usePostEditor();
const { imageData, toBase64 } = useImageUpload();
const { validateButtons } = useButtonManager();
const { close } = useTelegram();
const { isLoading, message, publishPost } = useApi(WEBHOOK_URL);

// Computed properties
const canPublish = computed(() => {
  return post.value.content.trim().length > 0;
});

// Event handlers
const handleFileSelected = (file: File | null) => {
  imageData.value = file;
};

const handlePublish = async () => {
  if (!canPublish.value) {
    return;
  }

  try {
    let imageBase64: string | null = null;

    if (imageData.value) {
      imageBase64 = await toBase64(imageData.value);
    } else if (isEditMode.value && post.value.image_url) {
      imageBase64 = post.value.image_url;
    }

    const payload: PublishPayload = {
      is_edit: isEditMode.value,
      message_id: messageId.value,
      content: post.value.content,
      image_data: imageBase64,
      reply_markup: validateButtons(post.value.reply_markup),
    };

    const success = await publishPost(payload);

    if (success) {
      // Close the Mini App on success
      setTimeout(() => {
        close();
      }, 1500);
    }
  } catch (error) {
    console.error('Publishing error:', error);
  }
};

// Lifecycle
onMounted(() => {
  try {
    initializeEditMode();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});
</script>
