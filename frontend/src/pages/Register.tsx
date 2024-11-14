// src/components/Modal.tsx
import React from "react";
import { Link } from "react-router-dom";


interface RegisterModalProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
  }

const ModalRegister: React.FC<RegisterModalProps> = ({onSwitchToLogin,onClose}) => {
   

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="container-register" onClick={e=>e.stopPropagation()}>
                <div className="container">
                    <div className="col-6 register">
                        <div className="register-content">
                            <h2>Đăng nhập</h2>
                            <p>Chào mừng bạn đến với House.com . Nếu bạn đã có tài khoản, có thể đăng nhập tại ô dưới đây.</p>
                            <button onClick={onSwitchToLogin} className="btn-register">Tôi có tài khoản</button>
                        </div>
                    </div>
                    <div className="col-5 login">
                        <div className="login-close" onClick={onClose}>
                        <i className="fa-solid fa-x"></i>
                        </div>
                        <h2 className="text-center login-title">Đăng ký</h2>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="email" id="email" placeholder="House@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ Email</label>
                            <input type="email" id="email" placeholder="House@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" id="password" placeholder="**********" />
                        </div>
                        
                       
                        <p className="text-center mt-3 mb-1">Hoặc</p>
                        <div className="social-login mb-3">

                            <Link className="fb-custom" to={'#'} ><i className="fa-brands fa-facebook"></i></Link>
                            <Link className="gg-custom" to={'/'}><i className="fa-brands fa-google "></i></Link>
                        </div>
                        <button className="btn-login">Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRegister;
