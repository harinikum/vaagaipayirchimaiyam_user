import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
export const UserContext = createContext();
function UserContextProvider({ children }) {
  const [userId, setuserId] = useState(null);
  const [profile, setprofile] = useState(null);
  const [email, setemail] = useState("");
  const [forget, setForget] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [time, setTime] = useState(null);
  // const [Endpoint, setEndpoint] = useState("http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/");
  const [Endpoint, setEndpoint] = useState("http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/User/");
  // const [ImgEndpoint,setImgEndpoint]=useState("http://localhsot/Nursing_Check/controllers/api/admin/upload/");
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider
      value={{
        userId,
        setuserId,
        profile,
        setprofile,
        Endpoint,
        setEndpoint,
        email,
        setemail,
        token,
        setToken,
        forget,
        timeLeft, setTimeLeft,
        time, setTime
      }}
    >
      {children}
    </UserContext.Provider>
  );
}



export default UserContextProvider;
