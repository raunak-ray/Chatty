import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="w-full border-b border-slate-600/50">
      <div className="tabs tabs-boxed bg-transparent p-2 m-2 flex items-center justify-between">
        <button
          onClick={() => setActiveTab("chats")}
          className={`tab ${
            activeTab === "chats"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-slate-400"
          } px-6 rounded-md`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`tab ${
            activeTab === "contacts"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-slate-400"
          } px-6 rounded-md`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}
export default ActiveTabSwitch;
