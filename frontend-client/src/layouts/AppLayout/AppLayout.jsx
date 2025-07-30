import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Outlet />;
};

export default AppLayout;
