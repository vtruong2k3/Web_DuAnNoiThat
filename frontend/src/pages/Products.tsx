/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import n1 from '../assets/img/product/new_1.png'
import n2 from '../assets/img/product/new_2.png'
import n3 from '../assets/img/product/new_3.png'
import n4 from '../assets/img/product/new_4.png'
import { getProduct, ProductType } from '../services/Productservices'
import { ErrorType } from '../services/Authservices'
import toast from 'react-hot-toast'
import Loading from '../component/Loading'
import { Link } from 'react-router-dom'
export default function productAll() {
    const [loading, setLoading] = useState<boolean>(false)
    const [product, setProduct] = useState<ProductType>()
    const getProductAll = async () => {
        try {
            setLoading(true)
            const { data } = await getProduct()



            setProduct(data)
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
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + ' ' + 'VND'
    }
    return (
        
        <div className="container-product-all">
            {loading && <Loading/>}
            <div className="banner-product-all">
                <h1 className="banner-product-all-title">Tất cả sản phẩm</h1>
            </div>

            <div className="container">
                <div className="product-all-list">
                    <div className="col-3 col-left mt-5">
                        <div className="card">
                            <div className="card-header ">DANH MỤC SẢN PHẨM</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Trang chủ</li>
                                <li className="list-group-item">Giới thiệu</li>
                                <li className="list-group-item dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#sanphamMenu" aria-expanded="false">Sản phẩm</li>
                                <ul id="sanphamMenu" className="collapse list-group list-group-flush">
                                    <li className="list-group-item">Sản phẩm nổi bật</li>
                                    <li className="list-group-item dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#sanphamMoiMenu" aria-expanded="false">Sản phẩm mới</li>
                                    <ul id="sanphamMoiMenu" className="collapse list-group list-group-flush">
                                        <li className="list-group-item">Subcategory 1</li>
                                        <li className="list-group-item">Subcategory 2</li>
                                    </ul>
                                    <li className="list-group-item dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#phongNguMenu" aria-expanded="false">Phòng ngủ</li>
                                    <ul id="phongNguMenu" className="collapse list-group list-group-flush">
                                        <li className="list-group-item">Subcategory 1</li>
                                        <li className="list-group-item">Subcategory 2</li>
                                    </ul>
                                    <li className="list-group-item dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#phongKhachMenu" aria-expanded="false">Phòng khách</li>
                                    <ul id="phongKhachMenu" className="collapse list-group list-group-flush">
                                        <li className="list-group-item">Subcategory 1</li>
                                        <li className="list-group-item">Subcategory 2</li>
                                    </ul>
                                    <li className="list-group-item dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#phongBepMenu" aria-expanded="false">Phòng bếp</li>
                                    <ul id="phongBepMenu" className="collapse list-group list-group-flush">
                                        <li className="list-group-item">Subcategory 1</li>
                                        <li className="list-group-item">Subcategory 2</li>
                                    </ul>
                                    <li className="list-group-item dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#doTrangTriMenu" aria-expanded="false">Đồ trang trí</li>
                                    <ul id="doTrangTriMenu" className="collapse list-group list-group-flush">
                                        <li className="list-group-item">Subcategory 1</li>
                                        <li className="list-group-item">Subcategory 2</li>
                                    </ul>
                                </ul>
                                <li className="list-group-item">Tin tức</li>
                                <li className="list-group-item">Liên hệ</li>
                            </ul>
                        </div>
                        <div className="card mt-5">
                            <div className="card-header ">TÌM THEO GIÁ</div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'><input type="checkbox" /> Giá dưới 100.000đ</li>
                                <li className='list-group-item'><input type="checkbox" /> 100.000đ - 200.000đ</li>
                                <li className='list-group-item'><input type="checkbox" /> 200.000đ - 300.000đ</li>
                                <li className='list-group-item'><input type="checkbox" /> 300.000đ - 500.000đ</li>
                                <li className='list-group-item'><input type="checkbox" /> 500.000đ - 1.000.000đ</li>
                                <li className='list-group-item'><input type="checkbox" /> Giá trên 1.000.000đ</li>
                            </ul>
                        </div>

                        <div className="card mt-5">
                            <div className="card-header ">CHẤT LIỆU</div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'><input type="checkbox" /> Da công nghiệp</li>
                                <li className='list-group-item'><input type="checkbox" /> Da bò</li>
                                <li className='list-group-item'><input type="checkbox" /> Gỗ ổi</li>
                                <li className='list-group-item'><input type="checkbox" /> Gỗ xoan</li>
                                <li className='list-group-item'><input type="checkbox" /> Gỗ hương</li>
                                <li className='list-group-item'><input type="checkbox" /> Nhựa</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9 col-right">
                        <div className="arrange">
                            <p className='arrange-text'>Sắp xếp theo:
                                <select >
                                    <option value="Mặc định">Mặc định</option>
                                    <option value=""> Tên A đến Z</option>
                                    <option value="">Tên Z đến A</option>
                                    <option value="">Giá tăng dần</option>
                                    <option value="">Giá giảm dần</option>
                                </select>
                            </p>
                        </div>



                        <div className="product-new-list">
                        {product && product.productData && product.productData.length > 0 ? (
                                product.productData.map(product => (
                                    <div className="product-new-item" key={product._id}>
                                        <Link to={`/product/product-detail/${product._id}`}>
                                            <img src={`http://localhost:5000/uploads/${product.image_url}`} alt="" className="product-new-img" />
                                        </Link>
                                       
                                        <div className="product-new-body">
                                            <h3 className="product-new-body-title">{product.product_name}</h3>
                                            <div className="product-rating">
                                                <span className="star">★</span>
                                                <span className="star">★</span>
                                                <span className="star">★</span>
                                                <span className="star">★</span>
                                                <span className="star">★</span>
                                            </div>
                                            <div className="product-new-money">
                                                <p className='money-sale'>{formatPrice(product.price)}</p>
                                                <p className='money'>5.000.000 VND</p> {/* Giá cố định, có thể thay bằng giá gốc nếu có */}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No new products available</p>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}