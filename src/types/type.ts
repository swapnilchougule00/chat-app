export interface Message {
  id: string;
  userId: string;
  content: string;
  isUser: boolean;
  isReplied: boolean;
  replay: Replay[];
}

export interface Replay {
  userId: string;
  content: string;
  id: string;
  chatId: string;
  msgId: string;
  replay: Replay[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isGroup: boolean;
  participants: string[];
}

export interface ChatState {
  chats: Chat[];
  activeChatId: string;
  users: string[];
  addMessage: (content: string, isUser: boolean) => void;
  addReplay: (
    content: string,
    msgId: string,
    chatId: string,
    userId: string
  ) => void;
  setActiveChat: (chatId: string) => void;
  createGroup: (groupTitle: string, participants: string[]) => void;
}
export interface ReplayBoxProps {
  msg: Message | Replay;
  activeChatId: string;
  limit?: number;
  isUser?: boolean;
}
