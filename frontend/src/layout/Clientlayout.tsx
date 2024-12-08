/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet } from "react-router-dom";
import Header from "../component/Header"
import Footer from "../component/Footer"
import LoginModal from '../pages/Login';
import RegisterModal from '../pages/Register';
import Modalcart from '../pages/Cartmodal'
import { useState } from "react";
export default function layoutClient() {
    const [currentModal, setCurrentModal] = useState<null | 'login' | 'register' | 'cart'>(null);

    const openLoginModal = () => setCurrentModal("login");
    const openRegisterModal = () => setCurrentModal("register");
    const openCartModal=()=>setCurrentModal("cart")
    const closeModal = () => setCurrentModal(null);
    return (
        <div className="main">
            <Header onLoginClick={openLoginModal} onCartClick={openCartModal}/>
            {currentModal === "login" && (
                <LoginModal onClose={closeModal} onSwitchToRegister={openRegisterModal} />
            )}

            {currentModal === "register" && (
                <RegisterModal onClose={closeModal} onSwitchToLogin={openLoginModal} />
            )}
            {currentModal === "cart" && (
                <Modalcart onClose={closeModal}  />
            )}
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}