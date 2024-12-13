/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import Loading from '../component/Loading'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CategoryType, fetchAddCategory } from '../services/CategoryAdminServices'
import { useNavigate } from 'react-router-dom'
import { ErrorType } from '../services/Authservices'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
export default function addCatrgory(){
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState:{errors}
    }=useForm<CategoryType>()
    const addCategory:SubmitHandler<CategoryType>=async(data)=>{
        try {
            setLoading(true)
            
            const res = await fetchAddCategory(data)
            navigate('/admin/category')
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
    return(
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
                            <h1 className="title">Thêm danh mục</h1>
                        </div>
                        <div className="add-account-body">
                            <div className="form-add-container">

                                <form onSubmit={handleSubmit(addCategory)}>
                                    <div className="form-group">
                                        <label >Tên danh mục</label>
                                        <input
                                        {...register('category_name',{required:"Vui lòng không bỏ trống"})}
                                        type="text"  placeholder="Danh mục" />
                                        {errors?.category_name && <div className="text-danger mt-3">{errors?.category_name.message}</div>}
                                    </div>
                                    
                                    <button type="submit" className="btn">
                                        {loading ? (
                                            <>
                                                <Loading /> Đang xử lý...
                                            </>
                                        ) : (
                                            "Thêm danh mục"
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