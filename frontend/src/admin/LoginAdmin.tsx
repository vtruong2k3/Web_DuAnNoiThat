/* eslint-disable react-hooks/rules-of-hooks */
import { SubmitHandler, useForm } from "react-hook-form"
import { fetchLoginAdmin, LoginType } from "../services/AuthAdminServices"
import { ErrorType } from "../services/Authservices";
import toast from "react-hot-toast";
import Loading from '../component/Loading'
import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export default function loginAdimin() {
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginType>()
    const navigate=useNavigate()
    const onsubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            setLoading(true)
            const res=await fetchLoginAdmin(data)
            localStorage.setItem('token',res.data.token)
            navigate('/admin')
            Swal.fire({
                icon: 'success',                // Icon hiển thị (success, error, warning, info, question)
                title: 'Thành công',            // Tiêu đề của thông báo
                text: res.data.message,            // Nội dung của thông báo
                confirmButtonText: 'OK',        // Nút xác nhận
                showCloseButton: true,          // Nút đóng
                timer: 2000,                    // Tự động đóng sau 3 giây
                timerProgressBar: true,         // Hiển thị thanh tiến trình
            })
        } catch (error) {
            const errorMessage =
                (error as ErrorType).response?.data?.message ||
                (error as ErrorType).message ||
                "Đã xảy ra lỗi, vui lòng thử lại.";

            console.error("Lỗi:", errorMessage);
            toast.error(errorMessage);
            console.log(errorMessage);
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="login-body">
            <div className="login-admin-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className="form-group">
                        <label >Email</label>
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
                            type="email" id="email" name="email" placeholder="Enter your email" />
                        {errors?.email && <div className="text-danger mt-3">{errors?.email.message}</div>}
                    </div>
                    <div className="form-group">
                        <label >Password</label>
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
                            type="password" id="password" name="password" placeholder="Enter your password" />
                        {errors?.password && <div className="text-danger mt-3">{errors?.password.message}</div>}
                    </div>
                    <button type="submit" className="btn-login">
                        {loading ? (
                            <>
                                <Loading /> Đang xử lý...
                            </>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>
                </form>
                <div className="footer-text">
                    Don't have an account? <a href="#">Sign up</a>
                </div>
            </div>
        </div>
    )
}