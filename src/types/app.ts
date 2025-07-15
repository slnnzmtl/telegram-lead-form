export interface Button {
  text: string;
  url: string;
}
export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface FormData {
  name: string;
  phone: string;
  message?: string;
  buttons?: Button[];
}
