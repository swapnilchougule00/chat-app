import { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { Send } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReplayBox from "./ReplayBox";
export default function ChatBox() {
  const { chats, activeChatId, addMessage } = useChatStore();
  const [inputMessage, setInputMessage] = useState("");

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const sendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, true);
      setTimeout(() => {
        addMessage("This is a prompt response", false);
      }, 1000);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen relative  bg-background flex-grow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">
          {activeChat?.title || "Select a chat"}
        </h2>
      </div>
      <div className="flex flex-col align-bottom pb-36 h-full justify-end ">
        <ScrollArea className="flex-grow flex flex-col justify-end p-4">
          {activeChat?.messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col  mb-4 h-fit`}>
              <div
                className={`flex  ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!msg.isUser && (
                  <Avatar className="mr-2">
                    <AvatarImage src="/placeholder.svg" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col ">
                  <ReplayBox
                    msg={msg}
                    activeChatId={activeChatId}
                    isUser={msg.isUser}
                    limit={0}
                  />
                </div>

                {msg.isUser && (
                  <Avatar className="ml-2">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 absolute bottom-0 right-0 left-0 bg-slate-100 border-t">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
