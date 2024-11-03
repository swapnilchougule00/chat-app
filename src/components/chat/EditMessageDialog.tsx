/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pen } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

type editProps = {
  chatId: string;
  msg: any;
};

export const EditMessageDialog = ({ chatId, msg }: editProps) => {
  const { editMessage } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const [showEditMessage, setShowEditMessage] = useState(false);

  const handleEditMessage = () => {
    if (inputValue) {
      const msgId = msg?.id;
      editMessage(msgId, chatId, inputValue);
      setInputValue("");
      setShowEditMessage(false);
    }
  };

  return (
    <Dialog
      open={showEditMessage}
      onOpenChange={(isOpen) => {
        setShowEditMessage(isOpen);
      }}
    >
      <DialogTrigger>
        <Pen
          className="h-4 cursor-pointer w-4 mb-2"
          onClick={() => setShowEditMessage(!showEditMessage)}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>
            <div className="mt-4  ">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type here..."
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />

              <button
                onClick={handleEditMessage}
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
