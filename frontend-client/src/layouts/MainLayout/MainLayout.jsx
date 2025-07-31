import { Outlet } from "react-router-dom";
import ClientFooter from "./ClientFooter";
import ClientHeader from "./ClientHeader";

const MainLayout = () => {
  return (
    <div className="site-wrap">
      <Outlet />

      <ClientFooter />
    </div>
  );
};

export default MainLayout;
