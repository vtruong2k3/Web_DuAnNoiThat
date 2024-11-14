

import { Link } from "react-router-dom";



interface LoginModalProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
  }

const ModalLogin: React.FC<LoginModalProps> = ({onSwitchToRegister,onClose}) => {
  
   
    
  
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="container-login" onClick={e=>e.stopPropagation()}>
                <div className="container">
                    <div className="col-6 register">
                        <div className="register-content">
                            <h2>Đăng Ký</h2>
                            <p>Chào mừng bạn đến với House.com. Nếu bạn chưa có tài khoản, có thể đăng ký tại ô dưới đây.</p>
                            <button onClick={onSwitchToRegister} className="btn-register">Tạo tài khoản</button>
                        </div>
                    </div>
                    <div className="col-5 login">
                        <div className="login-close" onClick={onClose}>
                        <i className="fa-solid fa-x"></i>
                        </div>
                        <h2 className="text-center login-title">Đăng nhập</h2>
                        <div className="form-group">
                            <label>Địa chỉ Email</label>
                            <input type="email" id="email" placeholder="House@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" id="password" placeholder="**********" />
                        </div>
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label>Lưu tài khoản</label>
                        </div>
                        <button className="btn-login" >Đăng nhập</button>
                        <p className="text-center mt-3 mb-1">Hoặc</p>
                        <div className="social-login">

                            <Link className="fb-custom" to={'#'} ><i className="fa-brands fa-facebook"></i></Link>
                            <Link className="gg-custom" to={'/'}><i className="fa-brands fa-google "></i></Link>
                        </div>
                        <div className="forgot-password">
                            <a href="#">Quên mật khẩu ?</a>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
};

export default ModalLogin;
