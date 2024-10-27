/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ChatState } from "../types/type";

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [
    {
      id: "1",
      title: "Swapnil Chougule",
      isGroup: false,
      participants: ["swapnil"],
      messages: [
        {
          id: "m1",
          userId: "u1",
          content: "Hello Swapnil!",
          isUser: true,
          isReplied: true,
          replay: [],
        },
        {
          id: "m2",
          userId: "u2",
          content: "Hi! How are you?",
          isReplied: true,
          replay: [],
          isUser: false,
        },
      ],
    },
    {
      id: "2",
      title: "Sid",
      isGroup: false,
      participants: ["sid"],
      messages: [
        {
          id: "m3",
          userId: "u3",
          isReplied: true,
          replay: [],
          content: "Hey Sid!",
          isUser: true,
        },
        {
          id: "m4",
          isReplied: true,
          replay: [],
          userId: "u2",
          content: "Yo! What's up?",
          isUser: false,
        },
      ],
    },
  ],

  activeChatId: "1",
  users: ["swapnil", "sid", "virat", "rohit"],
  addMessage: (content, isUser) => {
    const { chats, activeChatId } = get();
    set({
      chats: chats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: `${Date.now()}`,
                  content,
                  userId: "1",
                  isUser,
                  isReplied: false,
                  replay: [],
                },
              ],
            }
          : chat
      ),
    });
  },

  addReplay: (msgId, chatId, content, userId) => {
    const replayContent = {
      chatId: chatId,
      msgId: msgId,
      userId: userId,
      content: content,
      id: `${Date.now()}`,
      replay: [],
    };
    const { chats } = get();

    const recursiveAddReplay = (messages: any[]): any[] => {
      return messages.map((message) => {
        if (message.id === msgId) {
          return {
            ...message,
            replay: [...message.replay, replayContent],
          };
        } else if (message.replay.length > 0) {
          return {
            ...message,
            replay: recursiveAddReplay(message.replay),
          };
        }
        return message;
      });
    };

    set({
      chats: chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: recursiveAddReplay(chat.messages),
            }
          : chat
      ),
    });
  },

  setActiveChat: (chatId) => set({ activeChatId: chatId }),
  createGroup: (groupTitle, participants) => {
    const newGroup = {
      id: `${Date.now()}`,
      title: groupTitle,
      isGroup: true,
      participants,
      messages: [],
    };
    set((state) => ({
      chats: [...state.chats, newGroup],
      activeChatId: newGroup.id,
    }));
  },
}));
