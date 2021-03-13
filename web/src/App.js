import { useLocation } from "react-router-dom";

import AuthLayout from "./components/AuthLayout";
import BaseLayout from "./components/BaseLayout";
import Routes from "./Routes";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  const location = useLocation();
  return location.pathname.startsWith("/auth") ? (
    <AuthLayout>{Routes}</AuthLayout>
  ) : (
    <BaseLayout>{Routes}</BaseLayout>
  );
}

export default App;
