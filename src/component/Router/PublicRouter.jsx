import { Navigate, Outlet } from "react-router-dom";
// import { getLocalStorage } from "../utils/helperFunc";

export default function PrivateRouter() {
  const authData = localStorage.getItem("userMail");

  let auth = { token: authData ? true : false }; 

  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
}
