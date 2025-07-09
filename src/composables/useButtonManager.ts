import type { Button } from '@/types/app';

export const useButtonManager = () => {
  const addButton = (buttons: Button[]) => {
    buttons.push({ text: '', url: '' });
  };

  const removeButton = (buttons: Button[], index: number) => {
    if (index >= 0 && index < buttons.length) {
      buttons.splice(index, 1);
    }
  };

  const validateButtons = (buttons: Button[]): Button[] => {
    return buttons.filter(button => 
      button.text.trim() !== '' && button.url.trim() !== ''
    );
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return {
    addButton,
    removeButton,
    validateButtons,
    isValidUrl,
  };
};
