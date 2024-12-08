import { Link } from 'react-router-dom'
import logo from '../assets/img/logo/logo 1.png'
import p1 from '../assets/img/news/t1.webp'
export default function homeAdmin() {
    return (
        <div className="container-home-admin">
            <div className="admin-list">
                <div className="admin-left col-2">
                    <div className="admin-left-logo">
                        <img src={logo} alt="" className="admin-img-logo" />
                    </div>
                    <div className="admin-left-menu">
                        <ul className="menu">
                            <li><Link className='menu-link' to="/admin"><i className="fa-solid fa-house pe-1"></i> Bảng điều khiển</Link></li>
                            <li><Link className='menu-link' to="/admin/product"><i className="fa-solid fa-sliders pe-1"></i> Tài khoản</Link></li>
                            <li><Link className='menu-link' to="/admin/product"><i className="fa-brands fa-buffer pe-1"></i> Sản phẩm</Link></li>
                            <li><Link className='menu-link' to="#"><i className="fa-solid fa-clipboard pe-1"></i> Đơn hàng</Link></li>
                            <li><Link className='menu-link' to="#"><i className="fa-solid fa-chart-line pe-1"></i> Thống kê</Link></li>
                            <li><Link className='menu-link' to="#"><i className="fa-solid fa-arrow-right-from-bracket pe-1"></i> Thoát</Link></li>
                        </ul>

                    </div>
                </div>
                <div className="admin-right col-10">
                    <div className="admin-right-header">
                        <div className="header-title">
                            <h2 className="title-text">Vũ Văn Trường <i className="fa-regular fa-bell"></i></h2>
                        </div>
                    </div>
                    <div className="admin-right-body scroll">
                        <div className="admin-right-body-list">
                            <div className="list-box">
                                <div className="box-item item-custom-1">
                                    <p><i className="fa-solid fa-user me-2"></i>Account: 8</p>
                                </div>
                                <div className="box-item item-custom-2">
                                    <p><i className="fa-brands fa-buffer  me-2"></i>Sản phẩm: 8</p>
                                </div>
                                <div className="box-item item-custom-3">
                                    <p><i className="fa-solid fa-clipboard  me-2"></i>Đơn hàng: 8</p>
                                </div>
                            </div>

                            <div className="list-table-new">
                                <div className="table-new-header">
                                    <h1 className="title">Sản phẩm mới</h1>
                                </div>
                                <div className="table-new-body">
                                    <table className="table-custom">
                                        <thead className='table-thead'> 
                                            <tr>
                                                <td>STT</td>
                                                <td>Tên sản phẩm</td>
                                                <td>Hỉnh ảnh</td>
                                                <td>Giá</td>
                                                <td>Chất liệu</td>
                                                <td>Kích thước</td>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body'>
                                            <tr>
                                                <td>1</td>
                                                <td>Sản phẩm abc dsfgsdghgdsghdfgjdrtjhdryjdrj dfgsdfhsdghfdsgh</td>
                                                <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                                <td>23.000.000 VND</td>
                                                <td>Da bò thật</td>
                                                <td>300x400x500 mm</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Sản phẩm abc</td>
                                                <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                                <td>23.000.000 VND</td>
                                                <td>Da bò thật</td>
                                                <td>300x400x500 mm</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Sản phẩm abc</td>
                                                <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                                <td>23.000.000 VND</td>
                                                <td>Da bò thật</td>
                                                <td>300x400x500 mm</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Sản phẩm abc</td>
                                                <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                                <td>23.000.000 VND</td>
                                                <td>Da bò thật</td>
                                                <td>300x400x500 mm</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Sản phẩm abc</td>
                                                <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                                <td>23.000.000 VND</td>
                                                <td>Da bò thật</td>
                                                <td>300x400x500 mm</td>
                                            </tr>
                                            <tr className='table-tbody-bottom'>
                                                <td>1</td>
                                                <td>Sản phẩm abc</td>
                                                <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                                <td>23.000.000 VND</td>
                                                <td>Da bò thật</td>
                                                <td>300x400x500 mm</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}