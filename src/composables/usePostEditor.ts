import { ref } from 'vue';
import type { Post, EditData } from '@/types/app';
import { useTelegram } from './useTelegram';

export const usePostEditor = () => {
  const { tg } = useTelegram();
  
  const post = ref<Post>({
    content: '',
    image_url: null,
    reply_markup: []
  });

  const isEditMode = ref(false);
  const messageId = ref<number | null>(null);

  const initializeEditMode = () => {
    if (!tg.value?.initDataUnsafe?.start_param) return;

    try {
      const editData: EditData = JSON.parse(atob(tg.value.initDataUnsafe.start_param));
      
      if (editData.message_id) {
        isEditMode.value = true;
        messageId.value = editData.message_id;
        post.value.content = editData.content || '';
        post.value.image_url = editData.image_url || null;
        post.value.reply_markup = editData.reply_markup || [];
      }
    } catch (error) {
      console.error('Could not parse edit data:', error);
      throw new Error('Failed to load post for editing.');
    }
  };

  const resetPost = () => {
    post.value = {
      content: '',
      image_url: null,
      reply_markup: []
    };
    isEditMode.value = false;
    messageId.value = null;
  };

  return {
    post,
    isEditMode,
    messageId,
    initializeEditMode,
    resetPost,
  };
};
