import { ref } from 'vue';
import type { PublishPayload, ApiResponse, Message } from '@/types/app';

export class ApiService {
  private readonly webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async publishPost(payload: PublishPayload): Promise<ApiResponse> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  }
}

export const useApi = (webhookUrl: string) => {
  const apiService = new ApiService(webhookUrl);
  const isLoading = ref(false);
  const message = ref<Message | null>(null);

  const publishPost = async (payload: PublishPayload): Promise<boolean> => {
    isLoading.value = true;
    message.value = null;

    try {
      await apiService.publishPost(payload);
      
      message.value = {
        type: 'success',
        text: payload.is_edit ? 'Post updated successfully!' : 'Post published successfully!'
      };
      
      return true;
    } catch (error) {
      message.value = {
        type: 'error',
        text: 'Failed to publish post. Please try again.'
      };
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const clearMessage = () => {
    message.value = null;
  };

  return {
    isLoading,
    message,
    publishPost,
    clearMessage,
  };
};
