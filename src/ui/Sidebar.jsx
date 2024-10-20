import { useSidebar } from "@/contexts/SidebarContext";
import ButtonSidebar from "./ButtonSidebar";
import SidebarHead from "./SidebarHead";
import SidebarMain from "./SidebarMain";

function Sidebar({ mobile = false }) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`h-full shrink-0 bg-slate-50 ${
        mobile ? "" : "invisible w-0 overflow-hidden"
      } ${
        isOpen
          ? "md:visible md:flex md:w-60 md:flex-col md:border-r md:border-solid md:border-slate-300"
          : ""
      }`}
    >
      <SidebarHead>
        {mobile === false && <ButtonSidebar onClick={toggleSidebar} />}
      </SidebarHead>
      <SidebarMain />
    </aside>
  );
}

export default Sidebar;
