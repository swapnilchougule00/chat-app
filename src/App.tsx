import ChatBox from "./components/chat/ChatBox";
import ChatList from "./components/chat/ChatList";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatList />
      <ChatBox />
    </div>
  );
}

export default App;
