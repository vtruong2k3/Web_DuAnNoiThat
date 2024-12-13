/* eslint-disable react-hooks/rules-of-hooks */
import Swal from 'sweetalert2';
import logo from '../assets/img/logo/logo 1.png'
import { Link, useNavigate } from "react-router-dom";

export default function headerAdmin() {
    const navigate = useNavigate()
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
        navigate("/login-admin")


    }
    return (
        <div className="admin-left">
            <div className="admin-left-logo">
                <img src={logo} alt="" className="admin-img-logo" />
            </div>
            <div className="admin-left-menu">
                <ul className="menu">
                    <li><Link className='menu-link' to="/admin"><i className="fa-solid fa-house pe-1"></i> Bảng điều khiển</Link></li>
                    <li><Link className='menu-link' to="/admin/account"><i className="fa-solid fa-sliders pe-1"></i> Tài khoản</Link></li>
                    <li><Link className='menu-link' to="/admin/product"><i className="fa-brands fa-buffer pe-1"></i> Sản phẩm</Link></li>
                    <li><Link className='menu-link' to="/admin/category"><i className="fa-solid fa-list"></i> Danh mục</Link></li>
                    <li><Link className='menu-link' to="/admin/oder"><i className="fa-solid fa-clipboard pe-1"></i> Đơn hàng</Link></li>
                    <li><Link className='menu-link' to="#"><i className="fa-solid fa-chart-line pe-1"></i> Thống kê</Link></li>
                    <li onClick={logOut}><Link className='menu-link' to="#"><i className="fa-solid fa-arrow-right-from-bracket pe-1"></i> Thoát</Link></li>
                </ul>

            </div>
        </div>
    )
}