import React, { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { ReplyAll, Send, X } from "lucide-react";
import { Input } from "../ui/input";
import { ReplayBoxProps } from "../../types/type";

const ReplayBox: React.FC<ReplayBoxProps> = ({
  msg,
  activeChatId,
  limit,
  isUser,
}) => {
  const [replayInput, setReplayInput] = useState("");
  const [replayingToId, setReplayingToId] = useState<string | null>(null);
  const { addReplay } = useChatStore();
  const handleReplay = (msgId: string, userId: string) => {
    if (replayInput.trim()) {
      addReplay(msgId, activeChatId, replayInput, userId);
      setReplayInput("");
    }
  };

  limit! += 1;

  return (
    <>
      <div className="flex">
        <div
          className={`p-3 relative rounded-lg w-fit  ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {msg.content}
        </div>

        {!isUser && replayingToId !== msg.id && limit !== 3 && (
          <Button
            variant="ghost"
            size="sm"
            className="self-start mt-1"
            onClick={() => setReplayingToId(msg.id)}
          >
            <ReplyAll className="h-4 w-4 mr-1" />
            Reply
          </Button>
        )}
      </div>

      {replayingToId === msg.id && (
        <div className="mt-2 w-fit ml-14 flex items-center space-x-2">
          <Input
            type="text"
            value={replayInput}
            onChange={(e) => setReplayInput(e.target.value)}
            placeholder="Type your reply..."
            className="flex-grow"
            onKeyDown={(e) =>
              e.key === "Enter" && handleReplay(msg.id, msg.userId)
            }
          />
          <Button size="icon" onClick={() => handleReplay(msg.id, msg.userId)}>
            <Send className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setReplayingToId(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {msg.replay.length > 0 && replayingToId === msg.id && (
        <div className="mt-2 ml-20 w-fit  space-y-2">
          {msg.replay.map((item, index) => (
            <ReplayBox
              msg={item}
              key={index}
              isUser={isUser}
              activeChatId={activeChatId}
              limit={limit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ReplayBox;
