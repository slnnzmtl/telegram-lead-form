import { ref, onMounted } from 'vue';
import type { TelegramWebApp } from '@/types/telegram';

export const useTelegram = () => {
  const tg = ref<TelegramWebApp | null>(null);
  const isReady = ref(false);

  onMounted(() => {
    if (window.Telegram?.WebApp) {
      tg.value = window.Telegram.WebApp;
      tg.value.ready();
      isReady.value = true;
    } else {
      console.warn('Telegram WebApp script not loaded. Running in browser mode.');
    }
  });

  const close = () => {
    if (tg.value) {
      tg.value.close();
    }
  };

  const expand = () => {
    if (tg.value) {
      tg.value.expand();
    }
  };

  const showAlert = (message: string, callback?: () => void) => {
    if (tg.value) {
      tg.value.showAlert(message, callback);
    } else {
      alert(message);
      callback?.();
    }
  };

  const showConfirm = (message: string, callback?: (confirmed: boolean) => void) => {
    if (tg.value) {
      tg.value.showConfirm(message, callback);
    } else {
      const confirmed = confirm(message);
      callback?.(confirmed);
    }
  };

  return {
    tg,
    isReady,
    close,
    expand,
    showAlert,
    showConfirm,
    startAppParam: tg.value?.initDataUnsafe?.start_param || '',
  };
};
