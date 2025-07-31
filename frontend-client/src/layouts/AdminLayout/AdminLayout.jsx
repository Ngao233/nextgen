import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <header>Admin header</header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
