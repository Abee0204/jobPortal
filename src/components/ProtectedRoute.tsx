import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "@/pages/FullScreenLoader";
import { getToken, removeToken } from "@/utils/token"
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    
    const token = getToken();
    if(!token){
        return <Navigate to={"/login"} replace />
    }


    const {isLoading , isError} = useCurrentUser();
    
    if(isLoading)
    {
        return <FullScreenLoader/>;
    }
    if(isError)
    {
        removeToken();
        return <Navigate to={"/login"} replace/>        
    }


  return <Outlet />;
}

export default ProtectedRoute
