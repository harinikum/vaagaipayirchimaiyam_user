import LandingPage from "../LandingPage";
import Home from "../Home";
import { PATH } from "./routeConstants";
export const RouterPage=[
    {
        key:"home",
        title:"Home",
        Component:LandingPage,
        route:PATH.HOME,
        isPublic:true
    }
]