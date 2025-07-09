// Application types
export interface Post {
  content: string;
  image_url: string | null;
  reply_markup: Button[];
}

export interface Button {
  text: string;
  url: string;
}

export interface PublishPayload {
  is_edit: boolean;
  message_id: number | null;
  content: string;
  image_data: string | null;
  reply_markup: Button[];
}

export interface EditData {
  message_id: number;
  content?: string;
  image_url?: string;
  reply_markup?: Button[];
}

export interface Message {
  type: 'success' | 'error';
  text: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}
