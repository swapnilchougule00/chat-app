import React, { useMemo, useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { MessageCircle, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CreateGroupDialog from "./CreateGroupDialog";

export default function ChatList() {
  const { chats, activeChatId, setActiveChat } =
    useChatStore();


  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [userInput, setUserInput] = useState("");

  const filteredChats = useMemo(
    () =>
      userInput.trim()
        ? chats.filter((chat) =>
            chat.title.toLowerCase().includes(userInput.toLowerCase())
          )
        : chats,
    [userInput, chats]
  );

  return (
    <div className="w-80 bg-background relative border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats"
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput((e.target as HTMLInputElement).value)
            }
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg transition-colors ${
                chat.id === activeChatId
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              <div>
                <p className="font-medium">{chat.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.messages[chat.messages.length - 1]?.content ||
                    "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <button
        onClick={() => setShowCreateGroup(!showCreateGroup)}
        className=" bg-blue-500 absolute bottom-10 right-3 text-white p-2 rounded mt-4"
      >
        <Plus />
      </button>
      <CreateGroupDialog
        setShowCreateGroup={setShowCreateGroup}
        showCreateGroup={showCreateGroup}
      />
    </div>
  );
}
