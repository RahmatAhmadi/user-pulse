import MainLayout from "../../components/MainLayout/MainLayout";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <MainLayout />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
