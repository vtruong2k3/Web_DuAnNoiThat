// src/components/Modal.tsx
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorType, RegisterType, userRegister } from "../services/Authservices";
import Swal from 'sweetalert2';
import toast from "react-hot-toast";
import Loading from '../component/Loading'

interface RegisterModalProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
}

const ModalRegister: React.FC<RegisterModalProps> = ({ onSwitchToLogin, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterType>()
    const [loading, setLoading] = useState<boolean>(false)
    const onsubmit: SubmitHandler<RegisterType> = async (data) => {
        try {
            setLoading(true)
            const res = await userRegister(data)
            

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
                onSwitchToLogin();
            });;
           
        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="container-register" onClick={e => e.stopPropagation()}>
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
                            <input
                                {...register("username",
                                    {
                                        required: "Vui lòng không bỏ trống"
                                    }
                                )}
                                type="text" id="name" placeholder="House@gmail.com" />
                            {errors?.username && <div className="text-danger">{errors?.username.message}</div>}
                        </div>
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


                        <p className="text-center mt-3 mb-1">Hoặc</p>
                        <div className="social-login mb-3">

                            <Link className="fb-custom" to={'#'} ><i className="fa-brands fa-facebook"></i></Link>
                            <Link className="gg-custom" to={'#'}><i className="fa-brands fa-google "></i></Link>
                        </div>
                        <button className="btn-login" onClick={handleSubmit(onsubmit)}>{loading ? (
                            <>
                                <Loading /> Đang xử lý...
                            </>
                        ) : (
                            "Đăng ký"
                        )}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRegister;
