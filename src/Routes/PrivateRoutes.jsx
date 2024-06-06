import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <div className="w-16 mx-auto h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;