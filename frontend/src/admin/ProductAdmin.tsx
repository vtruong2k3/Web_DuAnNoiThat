/* eslint-disable react-hooks/rules-of-hooks */


import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ErrorType } from '../services/Authservices'
import { fetchDeleteProduct, fetchGetPoductAll, ProductAdmin } from '../services/ProductAdminServices'
import Loading from '../component/Loading'
import Swal from 'sweetalert2'

export default function productAdmin() {
    const [product, setProduct] = useState<ProductAdmin[]>([])
    const [loading, setLoading] = useState<boolean>(false)
   
    const getProductAll = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetPoductAll()
            setProduct(data.data)
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
    useEffect(() => {
        getProductAll()
    }, [])
    const handDelete=async(product_id:string|undefined)=>{
        if(window.confirm("Bạn có muốn xóa hay không ?")){
            try {
                setLoading(true)
               const res=await fetchDeleteProduct(product_id)
               getProductAll()
                Swal.fire({
                    icon: 'success',                // Icon hiển thị (success, error, warning, info, question)
                    title: 'Xóa Thành công',            // Tiêu đề của thông báo
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
            } finally {
                setLoading(false)
            }
        }
    }
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + ' ' + 'VND'
    }
    return (
        <div className="admin-right">
            <div className="admin-right-header">
                <div className="header-title">
                    <h2 className="title-text">Vũ Văn Trường <i className="fa-regular fa-bell"></i></h2>
                </div>
            </div>
            <div className="admin-right-body scrollable-content">
                {loading && <Loading />}
                <div className="admin-right-body-list">

                    <div className="list-table-new">
                        <div className="table-new-header">
                            <h1 className="title">Danh sách sản phẩm</h1>
                        </div>
                        <div className="table-new-add">
                            <Link to={'/admin/add-product'}><button className="add-btn">Thêm sản phẩm</button></Link>
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
                                        <td>Active</td>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {product.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{index + 1}</td>
                                            <td>{product.product_name}</td>
                                            <td><Link to={`/product/product-detail/${product._id}`}><img src={`http://localhost:5000/uploads/${product.image_url}`} alt={product.product_name} width={100} height={70} /></Link></td>
                                            <td className='text-price'>{formatPrice(product.price)}</td>
                                            <td>{product.material}</td>
                                            <td>{product.dimensions}</td>
                                            <td className='active'>
                                                <Link className='edit' to={'#'}><i className="fa-regular fa-pen-to-square"></i></Link>
                                                <button onClick={()=>handDelete(product._id)} className='delete'><i className="fa-regular fa-trash-can"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* <tr>
                                        <td>1</td>
                                        <td>Sản phẩm abc dsfgsdghgdsghdfgjdrtjhdryjdrj dfgsdfhsdghfdsgh</td>
                                        <td><img src={p1} alt="" width={'100px'} height={'70px'} /></td>
                                        <td>23.000.000 VND</td>
                                        <td>Da bò thật</td>
                                        <td>300x400x500 mm</td>

                                    </tr> */}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}