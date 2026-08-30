import MainComponent from "./component/MainComponent/MainComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import Editprofile from "./component/Pages/Editprofile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserContextProvider from "./Context";
import './font.css'


function App() {
  const clientID =
  "677661556369-t1e46f794o4kuo7vk0beg13dintu27fb.apps.googleusercontent.com";

  return (
    <div style={{ fontFamily: 'Source' }}>
    <GoogleOAuthProvider clientId={clientID}>
   <UserContextProvider>
          <MainComponent style={{ fontFamily: 'Source' }} />
   </UserContextProvider>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
