import { getToken } from "@/utils/token"
import { Navigate, Outlet, replace } from "react-router-dom";

export const PublicRoute = () =>{
    const token = getToken();
    if(token)
        return <Navigate to={"/dashboard"} replace />

    return<Outlet/>
}

export default PublicRoute;