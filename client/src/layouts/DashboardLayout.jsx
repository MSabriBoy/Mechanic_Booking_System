import { useState } from "react";

import Header from "../components/layout/Header";
import MobileSidebar from "../components/layout/MobileSidebar";
import PageContainer from "../components/layout/PageContainer";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100">
     <div className="flex">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
  <Sidebar
    collapsed={collapsed}
    onCollapse={() => setCollapsed((prev) => !prev)}
  />
</div>
      
     </div>

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
    collapsed ? "lg:ml-20" : "lg:ml-72"
  }`}>
        <Header
          onMenuClick={() => setMobileOpen(true)}
        />

        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
};

export default DashboardLayout;