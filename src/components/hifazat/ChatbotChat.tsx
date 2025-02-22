"use client";
// ------------------------
// Imports
// ------------------------
import { useCallback, useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
// , WandSparkles
import { ChatbotMessageType } from "@/types";
import ChatbotMessages from "./Messages";
import { chatbotChat, fetchChatHistory } from "@/handlers/chatbot";

// ------------------------
// Chatbot chat code starts here
// ------------------------
const ChatBotChat = () => {
  const [messages, setMessages] = useState<ChatbotMessageType[]>([]);
  const [thinking, setThinking] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ------------------------
  // Focus the input field when the screen is first loaded
  // ------------------------

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // ------------------------
  // Fetching chat history here
  // ------------------------
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const resp = await fetchChatHistory();
        if (resp.length <= 0) {
          setMessages([
            {
              role: "Hifazat",
              content:
                "Hi there! I am here to help you with your legal rights.",
            },
          ]);
        } else {
          const initialMessage: ChatbotMessageType[] = [
            {
              role: "Hifazat",
              content:
                "Hi there! I am here to help you with your legal rights.",
            },
          ];
          setMessages([...initialMessage, ...resp]);
        }
      } catch (error: any) {
        setMessages([
          {
            role: "Hifazat",
            content: `Hifazat is facing difficulties while fetching your chats! Please try refreshing the page! ${error.message}`,
          },
        ]);
      }
    };
    //   ------------------------
    //   Function call here: Fetching chat history
    //   ------------------------
    fetchChats();
  }, []);

  // ------------------------
  // Setting dynamic height for the user input field
  // ------------------------
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    };

    const handleResize = () => requestAnimationFrame(adjustHeight);
    handleResize();
  }, [inputMessage]);

  const handleInputMessage = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInputMessage(value);
    },
    []
  );

  // -----------------------
  // Actual send message function starts here
  // -----------------------
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const trimmedMessage = inputMessage.trim();
    const newMessage: ChatbotMessageType = {
      role: "user",
      content: trimmedMessage,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Add "Thinking" message
    const thinkingMessage: ChatbotMessageType = {
      role: "Hifazat",
      content: "Thinking",
    };
    setThinking(true);
    setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
    // Reset input and focus textarea
    setInputMessage("");
    try {
      const botResponse = await chatbotChat(newMessage);
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Thinking"),
        botResponse,
      ]);
    } catch (error: any) {
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Thinking"),
        {
          role: "Hifazat",
          category: "chat",
          content: `Sorry, an error occurred. Please try again. ${error.message}`,
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  // -----------------------
  // Generating visualization
  // -----------------------
  //   const handleVisualizer = async () => {
  //     try {
  //       const thinkingMessage: ChatbotMessageType = {
  //         role: "Hifazat",
  //         category: "chat",
  //         content: "Visualizing",
  //       };

  //       setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
  //       setThinking(true);

  //       const visualizationResponse:ChatbotMessageType = await visualizer();

  //       setMessages((prevMessages) => [
  //         ...prevMessages.filter((msg) => msg.content !== "Visualizing"),
  //         visualizationResponse,
  //       ]);
  //     } catch (error) {
  //       setMessages((prevMessages) => [
  //         ...prevMessages.filter((msg) => msg.content !== "Visualizing"),
  //         {
  //           role: "Hifazat",
  //           category: "chat",
  //           content: "Sorry, an error occurred while trying to visualize. Please try again.",
  //         },
  //       ]);
  //     } finally {
  //       setThinking(false);
  //     }
  //   };
  // -----------------------
  // When the enter is pressed the message will be sent, else the cursor will be moved to the new line
  // -----------------------
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (inputMessage.length <= 3000) {
        e.preventDefault();
        handleSendMessage();
      }
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center min-h-screen mt-10 scroll-container">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col h-screen relative" ref={chatContainerRef}>
          {/* 
          // ------------------
          // Chatbot message display field
          // ------------------
          */}
          <ChatbotMessages messages={messages} thinking={thinking} />
          {/* 
          // -----------------------
          // Chatbot input field
          // -----------------------
          */}
          <div className="sticky bottom-0 w-full max-w-3xl mx-auto md:px-4 pb-6 scroll-container">
            <div className="flex relative border rounded-xl border-dark-custom-blue-stroke dark:border-dark-custom-blue-stroke bg-white dark:bg-dark-custom-blue p-2">
              <textarea
                disabled={thinking}
                ref={textareaRef}
                value={inputMessage}
                onChange={handleInputMessage}
                onKeyDown={handleKeyPress}
                className={`w-full bg-white text-black dark:text-dark-primary-text px-3 py-3 outline-none resize-none overflow-y-scroll`}
                placeholder="Message Hifazat"
                rows={1}
                style={{ minHeight: "2.5rem" }}
              />
              <div className="flex justify-between items-center pt-2">
                {/* <button
                      disabled={thinking || showQuiz}
                      onClick={handleVisualizer}
                      className="disabled:text-dark-secondary-text/50 disabled:pointer-events-none bg-transparent transition-all text-black dark:text-dark-primary-text rounded-full p-2 focus:outline-none"
                      aria-label="Visualize button"
                    >
                      <WandSparkles className="size-5 md:size-[22px]" />
                    </button> */}

                <button
                  disabled={thinking}
                  onClick={handleSendMessage}
                  className="disabled:text-dark-secondary-text/50 disabled:pointer-events-none mr-2 text-black dark:text-dark-primary-text rounded-full size-10 lg:size-11 focus:outline-none transition-all"
                  aria-label="Send message"
                >
                  <Send className="size-5 md:size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotChat;
