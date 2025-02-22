export interface SignUpType {
  name: string;
  email: string;
  password: string;
  whereTo: string;
}
export interface LoginType {
  email: string;
  password: string;
  whereTo: string;
}

export interface ChatbotMessageType {
  role?: "user" | "Hifazat";
  content?: string;
  prompt?: string;
}
