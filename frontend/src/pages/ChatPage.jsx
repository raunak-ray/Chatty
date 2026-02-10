import ActiveTabSwitch from "../components/ActiveTabSwitch";
import AnimatedBorderContainer from "../components/AnimatedBorderContainer";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full max-w-6xl mx-auto h-[calc(100vh-80px)] relative p-4">
      <AnimatedBorderContainer>
        <div className="flex h-full rounded-2xl overflow-hidden">
          {/* Sidebar */}
          <div
            className={`
              ${selectedUser ? "hidden md:flex" : "flex"}
              w-full md:w-72
              bg-slate-800/50 backdrop-blur-sm
              flex-col border-r border-slate-800/50
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`
              ${selectedUser ? "flex" : "hidden md:flex"}
              flex-1 flex-col
              bg-slate-900/50 backdrop-blur-sm
            `}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </AnimatedBorderContainer>
    </div>
  );
}

export default ChatPage;
