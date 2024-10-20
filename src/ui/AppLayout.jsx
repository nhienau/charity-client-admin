import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";

function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <AppHeader />
        <main className="grow overflow-auto bg-slate-100 px-16 pb-12 pt-10">
          <div className="mx-auto my-0 flex max-w-[85rem] flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
