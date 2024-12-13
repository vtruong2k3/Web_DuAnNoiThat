/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react'

import { CountType, fetchCountAll, fetchGetPoductNew, ProductAdmin } from '../services/ProductAdminServices'
import Loading from '../component/Loading'
import { ErrorType } from '../services/Authservices'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
export default function homeAdmin() {
    const [product, setProduct] = useState<ProductAdmin[]>([])
    const [count, setCount] = useState<CountType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const getProductNew = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetPoductNew()
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
        getProductNew()
    }, [])
    const getCountAll = async () => {
        try {
            setLoading(true)
            const { data } = await fetchCountAll()
            setCount(data)
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
        getCountAll()
    }, [])
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
                    <div className="list-box">
                        <div className="box-item item-custom-1">
                            <p><i className="fa-solid fa-user me-2"></i>Account: {count?.totalAccounts||0}</p>
                        </div>
                        <div className="box-item item-custom-2">
                            <p><i className="fa-brands fa-buffer  me-2"></i>Sản phẩm: {count?.totalProduct || 0}</p>
                        </div>
                        <div className="box-item item-custom-3">
                            <p><i className="fa-solid fa-clipboard  me-2"></i>Đơn hàng: {count?.totalOders || 0}</p>
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
                                    {product.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{index + 1}</td>
                                            <td>{product.product_name}</td>
                                            <td><Link to={`/product/product-detail/${product._id}`}><img src={`http://localhost:5000/uploads/${product.image_url}`} alt={product.product_name} width={100} height={70} /></Link></td>
                                            <td className='text-price'>{formatPrice(product.price)}</td>
                                            <td>{product.material}</td>
                                            <td>{product.dimensions}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}