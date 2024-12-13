/* eslint-disable react-hooks/rules-of-hooks */

import logo from '../assets/img/logo/logo 1.png'
import React, { useEffect, useState } from 'react'
import { ErrorType, getUser, UserType } from '../services/Authservices';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useCart } from '../context/CartContext';
interface HeaderProps {
    onLoginClick: () => void;
    onCartClick: () => void

}
const headerClient: React.FC<HeaderProps> = ({ onLoginClick, onCartClick }) => {

    const [userData, setUserData] = useState<UserType | null>(null);
    const {totalQuantity}=useCart()
    const { setUser } = useUserContext()
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const userGet = async () => {
        try {
            const { data } = await getUser()
            setUserData(data)
            setUser(data)

        } catch (error) {
            const errorMessage =
                (error as ErrorType).response?.data?.message ||
                (error as ErrorType).message ||
                "Đã xảy ra lỗi, vui lòng thử lại.";

            console.error("Lỗi:", errorMessage);
            toast.error(errorMessage);
            console.log(errorMessage);
        }
    }
    const logOut = () => {
        localStorage.removeItem('token')
        Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: "Đăng xuất thành công",
            showCloseButton: true,
            timer: 2000,
            timerProgressBar: true,
        })
        navigate("/")


    }
    useEffect(() => {
        if (token) {
            userGet()
        }
    }, [token])
    return (
        <header  >
            <div className="header-logo-img">
                <img src={logo} alt="" className="logo-img" />
            </div>

            <nav>
                <ul className="menu">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li><Link to="#">Giới thiệu</Link></li>
                    <li><Link to="/product">Sản phẩm</Link></li>
                    <li><Link to="#">Tin tức</Link></li>
                    <li><Link to="#">Liên hệ</Link></li>
                </ul>
            </nav>

            <div className="header-search">
                <form >
                    <input type="text" className='search-input' placeholder='Tìm kiếm ...' />
                    <button className='search-button'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>


            <div className="header-list d-flex align-items-center">
                {token ? (
                    <div className="dropdown">
                        <button
                            className="header-list-btn-login dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton2"
                        >
                            <i className="fa-solid fa-user header-item"></i> <span className="header-item-username">{userData?.userData.username}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-white" aria-labelledby="dropdownMenuButton2">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <span className='dropdown-item-span'><i className="fa-solid fa-user pe-2"></i>Trang cá nhân</span>
                                </a>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/product/oder-item">
                                    <span className='dropdown-item-span'><i className="fa-solid fa-bag-shopping pe-2"></i>Đơn hàng </span>
                                </Link>
                            </li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" onClick={logOut}>
                                    <span className='dropdown-item-span'>Đăng xuất <i className="fa-solid fa-arrow-right-from-bracket"></i></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                ) : (
                    <button onClick={onLoginClick} className='header-list-btn-login'><i className="fa-regular fa-user header-item"></i></button>
                )}
                <button onClick={onCartClick} className='header-list-btn-login item-cart-custom'>{totalQuantity > 0 && (
                    <span className='item-cart-quantity'>{totalQuantity}</span>
                )}<i className="fa-solid fa-bag-shopping header-item"></i></button>
                <button className='header-list-btn-login'><i className="fa-solid fa-heart header-item"></i></button>
            </div>


        </header>
    )
}
export default headerClient