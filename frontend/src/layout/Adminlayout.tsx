import { Navigate, Outlet } from "react-router-dom";
import Header from '../component/HeaderAdmin'
export default function adminLayout() {
    const token = localStorage.getItem('token')
    return (
        <div className="main">
            {token ? (
                <div className="container-admin">
                    <div className="admin-list">
                        <Header />
                        <Outlet />
                    </div>

                </div>
            ) : (
                <Navigate to={'/login-admin'}/>
            )}
        </div>
    )
}