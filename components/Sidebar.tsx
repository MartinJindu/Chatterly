import Logo from "./sidebar-components/Logo";
import SearchInput from "./sidebar-components/SearchInput";
import ChatSummary from "./sidebar-components/ChatSummary";
export default function Sidebar() {
  return (
    <aside
      aria-label="sidebar"
      id="sidebar"
      className="hidden md:flex flex-col w-64 lg:w-80 border-r bg-gray-900 border-gray-800/50 shadow-sm p-2"
    >
      <Logo />
      <SearchInput />
      <ChatSummary />
    </aside>
  );
}
