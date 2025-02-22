// -----------------------
// Imports
// -----------------------
import { ChatbotMessageType } from "@/types";
import Cookies from "js-cookie";
import { oneChabotMessage } from "@/data/constants";

// -----------------------
// Fetching chatbot's chat history
// -----------------------
export const fetchChatHistory = async () => {
  const response = await fetch("/api/chatbot", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 6000 },
  });
  const responseMessage = await response.json();
  if (responseMessage.status === 200) {
    const normalizedMessages: ChatbotMessageType[] =
      responseMessage.message.flatMap((entry: any) => [
        { role: "user", content: entry.prompt },
        {
          role: "Hifazat",
          content: entry.gemini_response,
        },
      ]);
    return normalizedMessages;
  } else if (responseMessage.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 3000);
    return responseMessage;
  } else {
    return responseMessage;
  }
};

// -----------------------
// Sending message to chatbot
// -----------------------
export const chatbotChat = async (message: ChatbotMessageType) => {
  const response = await fetch("/api/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  const responseMessage = await response.json();

  // -----------------------
  // If response is ok, formatting the response to be displayed
  // -----------------------
  if (responseMessage.status === 200) {
    const botMessage: ChatbotMessageType = oneChabotMessage(
      responseMessage.message.role,
      responseMessage.message.gemini_response
    ) as ChatbotMessageType;

    return botMessage;
    // -----------------------
    // If token is expired
    // -----------------------
  } else if (responseMessage.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 3000);
    const botMessage: ChatbotMessageType = oneChabotMessage(
      "Hifazat",
      "Session expired. Logging you in again."
    ) as ChatbotMessageType;

    return botMessage;
  } else if (responseMessage.status === 429) {
    const botMessage: ChatbotMessageType = oneChabotMessage(
      "Hifazat",
      "Resource Exhausted! Please try after some time."
    ) as ChatbotMessageType;

    return botMessage;
  }
  // -----------------------
  // In case of an error occurs
  // -----------------------
  else {
    const botMessage: ChatbotMessageType = oneChabotMessage(
      "Hifazat",
      "Please Try Sending Message Again"
    ) as ChatbotMessageType;
    return botMessage;
  }
};
