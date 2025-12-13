import React, { createContext, useContext, useState } from "react";
import { ChatInfo } from "~/lib/types";

type ChatContextType = {
  chatInfo: ChatInfo | null;
  setChatInfo: (info: ChatInfo) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);

  return (
    <ChatContext.Provider value={{ chatInfo, setChatInfo }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
