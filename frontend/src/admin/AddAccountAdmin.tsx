/* eslint-disable react-hooks/rules-of-hooks */
import { SubmitHandler, useForm } from "react-hook-form"
import { fetchAddUser, UserType } from "../services/AuthAdminServices"
import Loading from '../component/Loading'
import toast from "react-hot-toast"
import { ErrorType } from "../services/Authservices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function addAccount() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserType>()
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const addUser: SubmitHandler<UserType> = async (data) => {


        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("address", data.address);
            formData.append("phone", data.phone);
            formData.append("role", data.role);


            if (data.avatar && data.avatar[0]) {
                formData.append("avatar", data.avatar[0]);
            }
            const res = await fetchAddUser(formData)
            navigate('/admin')
            Swal.fire({
                icon: 'success',                
                title: 'Thành công',           
                text: res.data.message,            
                confirmButtonText: 'OK',       
                showCloseButton: true,          
                timer: 2000,                   
                timerProgressBar: true,         
            })
        } catch (error) {
            const errorMessage =
                (error as ErrorType).response?.data?.message ||
                (error as ErrorType).message ||
                "Đã xảy ra lỗi, vui lòng thử lại.";

            console.error("Lỗi:", errorMessage);
            toast.error(errorMessage);
            console.log(errorMessage);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="admin-right">
            <div className="admin-right-header">
                <div className="header-title">
                    <h2 className="title-text">Vũ Văn Trường <i className="fa-regular fa-bell"></i></h2>
                </div>
            </div>
            <div className="admin-right-body scrollable-content">

                <div className="admin-right-body-list">

                    <div className="list-table-new">
                        <div className="table-new-header">
                            <h1 className="title">Thêm tài khoản</h1>
                        </div>
                        <div className="add-account-body">
                            <div className="form-add-container">

                                <form onSubmit={handleSubmit(addUser)} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label >Username</label>
                                        <input
                                            {...register('username', { required: "Vui lòng không bỏ trống" })}
                                            type="text" id="username" name="username" placeholder="Enter username" />
                                        {errors?.username && <div className="text-danger mt-3">{errors?.username.message}</div>}
                                    </div>
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
                                            type="email" id="email" name="email" placeholder="Enter email" />
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
                                            type="password" id="password" name="password" placeholder="Enter password" />
                                        {errors?.password && <div className="text-danger mt-3">{errors?.password.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Avatar</label>
                                        <input
                                            {...register('avatar')}
                                            type="file" id="avatar" name="avatar" />
                                    </div>
                                    <div className="form-group">
                                        <label >Address</label>
                                        <input
                                            {...register('address', { required: "Vui lòng không bỏ trống" })}
                                            type="text" id="address" name="address" placeholder="Enter address" />
                                        {errors?.address && <div className="text-danger mt-3">{errors?.address.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Phone</label>
                                        <input
                                            {...register('phone', { required: "Vui lòng không bỏ trống" })}
                                            type="tel" id="phone" name="phone" placeholder="Enter phone number" />
                                        {errors?.phone && <div className="text-danger mt-3">{errors?.phone.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Role</label>
                                        <select
                                            {...register('role')}
                                            id="role" name="role" >
                                            <option value="">Select role</option>
                                            <option value="admin">Admin</option>
                                            <option value="customer">Customer</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn">
                                        {loading ? (
                                            <>
                                                <Loading /> Đang xử lý...
                                            </>
                                        ) : (
                                            "Tạo tài khoản"
                                        )}

                                    </button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}