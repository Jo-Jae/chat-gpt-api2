import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className=" max-w-screen-md mx-auto min-h-screen shadow-md">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
