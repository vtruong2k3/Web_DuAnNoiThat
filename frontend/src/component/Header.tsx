/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo/logo 1.png'
import React, { useState } from 'react'
import Modalcart from '../pages/Cartmodal'
interface HeaderProps {
    onLoginClick: () => void;
  }
 const headerClient: React.FC<HeaderProps>=({onLoginClick}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false);

   
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    
    const closeModal = () => {
      setIsModalOpen(false);
    };
    return (
        <header  >
            <div className="header-logo-img">
                <img src={logo} alt="" className="logo-img" />
            </div>

            <nav>
                <ul className="menu">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="/product">Sản phẩm</a></li>
                    <li><a href="#">Tin tức</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </nav>

            <div className="header-search">
                <form >
                    <input type="text" className='search-input' placeholder='Tìm kiếm ...' />
                    <button className='search-button'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>


            <div className="header-list">
                <button onClick={onLoginClick} className='header-list-btn-login'><i className="fa-regular fa-user header-item"></i></button>
                <button onClick={openModal} className='header-list-btn-login'><i className="fa-solid fa-bag-shopping header-item"></i></button>
                <Link to={'#'}><i className="fa-solid fa-heart header-item"></i></Link>
            </div>
           <Modalcart isOpen={isModalOpen} onClose={closeModal} />

        </header>
    )
}
export default headerClient