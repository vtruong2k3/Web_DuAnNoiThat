import { Outlet } from "react-router-dom";

export default function adminLayout(){
    return(
        <div className="main">
            <div className="container-admin">
                <Outlet/>
            </div>
        </div>
    )
}