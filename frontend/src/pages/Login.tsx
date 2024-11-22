
import Swal from 'sweetalert2';

import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { ErrorType, RegisterType, userLogin } from '../services/Authservices';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Loading from '../component/Loading'


interface LoginModalProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const ModalLogin: React.FC<LoginModalProps> = ({ onSwitchToRegister, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterType>()
    const navigte = useNavigate()
    const onsubmit: SubmitHandler<RegisterType> = async (data) => {
        try {
            setLoading(true)
            const res = await userLogin(data)
            localStorage.setItem('token', res.data.token)
            navigte('/')
            Swal.fire({
                icon: 'success',                // Icon hiển thị (success, error, warning, info, question)
                title: 'Thành công',            // Tiêu đề của thông báo
                text: res.data.message,    // Nội dung của thông báo
                confirmButtonText: 'OK',        // Nút xác nhận
                showCloseButton: true,          // Nút đóng
                timer: 1000,                    // Tự động đóng sau 3 giây
                timerProgressBar: true,         // Hiển thị thanh tiến trình
            }).then(() => {
                
                onClose();

            });;
        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="modal-overlay" onClick={onClose}>


            <div className="container-login" onClick={e => e.stopPropagation()}>
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
                            <input
                                {...register("email",
                                    {
                                        required: "Vui lòng không bỏ trống",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Địa chỉ email không hợp lệ"
                                        }
                                    }
                                )}
                                type="email" id="email" placeholder="House@gmail.com" />
                            {errors?.email && <div className="text-danger">{errors?.email.message}</div>}
                        </div>

                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input
                                {...register("password",
                                    {
                                        required: "Vui lòng không bỏ trống",
                                        minLength: {
                                            value: 5,
                                            message: "Mật khẩu phải trên 5 kí tự"
                                        }
                                    }
                                )}
                                type="password" id="password" placeholder="**********" />
                            {errors?.password && <div className="text-danger">{errors?.password.message}</div>}
                        </div>
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label>Lưu tài khoản</label>
                        </div>
                        <button className="btn-login" onClick={handleSubmit(onsubmit)} >{loading ? (
                            <>
                                <Loading /> Đang xử lý...
                            </>
                        ) : (
                            "Đăng nhập"
                        )}</button>
                        <p className="text-center mt-3 mb-1">Hoặc</p>
                        <div className="social-login">

                            <Link className="fb-custom" to={'#'} ><i className="fa-brands fa-facebook"></i></Link>
                            <Link className="gg-custom" to={'#'}><i className="fa-brands fa-google "></i></Link>
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
