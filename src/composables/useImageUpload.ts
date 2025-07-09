import { ref } from 'vue';

export const useImageUpload = () => {
  const imageData = ref<File | null>(null);
  const imagePreview = ref<string | null>(null);

  const handleImageUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      imageData.value = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
        resolve();
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = () => {
    imageData.value = null;
    imagePreview.value = null;
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return {
    imageData,
    imagePreview,
    handleImageUpload,
    removeImage,
    toBase64,
  };
};
