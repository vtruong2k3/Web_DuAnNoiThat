/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import Loading from '../component/Loading'
import { useCategoryContext } from '../context/CategoryContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { fetchAddProduct, ProductAdmin } from '../services/ProductAdminServices'
import { ErrorType } from '../services/Authservices'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function addProduct() {
    const [loading, setLoading] = useState<boolean>(false)
    const { categoryContext } = useCategoryContext()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProductAdmin>()
    const navigate = useNavigate()
    const addProduct: SubmitHandler<ProductAdmin> = async (data)=>{

        
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("product_name", data.product_name);
            formData.append("price", data.price.toString());
            formData.append("description", data.description);
            formData.append("material", data.material);
            formData.append("dimensions", data.dimensions);
            formData.append("stock_quantity", data.stock_quantity.toString());
            formData.append("category_id", data.category_id);


            if (data.image_url && data.image_url[0]) {
                formData.append("image_url", data.image_url[0]);
            }
            const res = await fetchAddProduct(formData)
            navigate('/admin/product')
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
                            <h1 className="title">Thêm sản phẩm</h1>
                        </div>
                        <div className="add-account-body">
                            <div className="form-add-container">

                                <form onSubmit={handleSubmit(addProduct)} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label >Tên sản phẩm</label>
                                        <input
                                            {...register('product_name',{required:"Vui lòng không bỏ trống"})}
                                            type="text" name="product_name" placeholder="Tên sản phẩm" />
                                        {errors?.product_name && <div className="text-danger mt-3">{errors?.product_name.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Giá tiền</label>
                                        <input
                                             {...register('price',{required:"Vui lòng không bỏ trống",
                                                min:{
                                                    value:1,
                                                    message:"Giá tiền phải lớn hơn 1"
                                                }
                                             })}   
                                            type="text" id="price" name="price" placeholder="Giá tiền" />
                                        {errors?.price && <div className="text-danger mt-3">{errors?.price.message}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label >Image</label>
                                        <input
                                            {...register('image_url')}
                                            type="file" id="image_url" name="image_url" />
                                    </div>
                                    <div className="form-group">
                                        <label >Chất liệu</label>
                                        <input
                                            {...register('material',{required:"Vui lòng không bỏ trống"})}
                                            type="text"  placeholder="Chất liệu" />
                                        {errors?.material && <div className="text-danger mt-3">{errors?.material.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Kích thước</label>
                                        <input
                                        {...register('dimensions',{required:"Vui lòng không bỏ trống"})}

                                            type="text"  placeholder="Kích thước" />
                                        {errors?.dimensions && <div className="text-danger mt-3">{errors?.dimensions.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Hàng tồn kho</label>
                                        <input
                                            {...register('stock_quantity',{required:"Vui lòng không bỏ trống",
                                                min:{
                                                    value:1,
                                                    message:"Số lớn hơn 1"
                                                }
                                            })}
                                            type="text" id="stock_quantity" name="stock_quantity" placeholder="Số lượng hàng tồn kho" />
                                            {errors?.stock_quantity && <div className="text-danger mt-3">{errors?.stock_quantity.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Chi tiết sản phẩm</label>
                                        <textarea
                                            {...register('description',{required:"Vui lòng không bỏ trống"})}
                                            className='textarea' placeholder="Chi tiết sản phẩm" rows={3} ></textarea>
                                            {errors?.description && <div className="text-danger mt-3">{errors?.description.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label >Danh mục</label>
                                        <select
                                            {...register('category_id')}>
                                            
                                            {categoryContext.map(cate => (
                                                <option key={cate._id} value={cate._id}>{cate.category_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn">
                                        {loading ? (
                                            <>
                                                <Loading /> Đang xử lý...
                                            </>
                                        ) : (
                                            "Thêm sản phẩm"
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