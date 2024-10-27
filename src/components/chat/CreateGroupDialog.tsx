import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
type ModalProps = {
  setShowCreateGroup: (value: boolean) => void;
  showCreateGroup: boolean;
};
const CreateGroupDialog = ({
  setShowCreateGroup,
  showCreateGroup,
}: ModalProps) => {
  const { users, createGroup } = useChatStore();

  const [groupTitle, setGroupTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const handleCreateGroup = () => {
    if (groupTitle && selectedUsers.length > 0) {
      createGroup(groupTitle, selectedUsers);
      setGroupTitle("");
      setSelectedUsers([]);
      setShowCreateGroup(false);
    }
  };
  const handleToggleUser = (user: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(user)
        ? prevSelected.filter((u) => u !== user)
        : [...prevSelected, user]
    );
  };

  return (
    <Dialog
      open={showCreateGroup}
      onOpenChange={(isOpen) => {
        setShowCreateGroup(isOpen);
      }}
    >
      <DialogTrigger>
        <button
          onClick={() => setShowCreateGroup(!showCreateGroup)}
          className=" bg-blue-500 absolute bottom-10 right-3 text-white p-2 rounded mt-4"
        >
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            <div className="mt-4  ">
              <input
                type="text"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                placeholder="Group title"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <div className="mb-2">
                {users.map((user) => (
                  <label key={user} className="block mb-1">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user)}
                      onChange={() => handleToggleUser(user)}
                    />
                    <span className="ml-2">{user}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleCreateGroup}
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Create
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
