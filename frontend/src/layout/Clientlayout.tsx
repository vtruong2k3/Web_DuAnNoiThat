import {Outlet} from "react-router-dom";
import Header from "../component/Header"
import Footer from "../component/Footer"

export default function layoutClient(){
    return(
        <div className="main">
            <Header/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}