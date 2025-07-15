import { FormData } from '@/types/app';
import { ref } from 'vue';

export const useForm = (webhookUrl: string) => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const success = ref<boolean>(false);

  const form = ref<FormData>({
    name: '',
    phone: '',
    message: '',
    buttons: [],
  });

  const setFormData = (data: { name: string; phone: string; message?: string; buttons?: { text: string; url: string }[] }) => {
    form.value = {
      ...form.value,
      ...data,
    }
  };

  const sendForm = async (formData: FormData): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;
    success.value = false;
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      success.value = true;
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to send form.';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    isLoading,
    error,
    success,
    sendForm,
    clearError,
    form,
    setFormData,
  };
};
