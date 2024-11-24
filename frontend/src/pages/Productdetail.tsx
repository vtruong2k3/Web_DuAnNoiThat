/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useParams } from 'react-router-dom'
import p1 from '../assets/img/product/product_1.png'
import p2 from '../assets/img/product/product_2.png'
import p3 from '../assets/img/product/product_3.png'
import p4 from '../assets/img/product/product_4.png'
import { useEffect, useState } from 'react'
import { ErrorType, getUser, UserType } from '../services/Authservices'
import { CartType, getDetail, postCart, ProducDetail } from '../services/Productservices'
import toast from 'react-hot-toast'
import mongoose from 'mongoose';
import Loading from '../component/Loading'
export default function productDetail() {

    const [count, setCount] = useState(1)
    const { id } = useParams()
    const [products, setProducts] = useState<ProducDetail | null>(null)
    const [userData, setUserData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const token = localStorage.getItem('token')
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const getProductDetail = async (id: string | undefined) => {
        try {
            setLoading(true)
            const { data } = await getDetail(id)

            setProducts(data)



        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        } finally {
            setLoading(false)
        }
    }
    const userGet = async () => {
        try {
            const { data } = await getUser()
            setUserData(data)



        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        }
    }
    const addToCart = async () => {
        if (token) {
            try {
                setLoading(true)
                if (typeof count !== 'number' || count <= 0) {
                    toast.error("Số lượng sản phẩm không hợp lệ");
                    return;
                }

                const productCart: CartType = {
                    user_id: new mongoose.Types.ObjectId(userData?.userData.id),
                    product_id: new mongoose.Types.ObjectId(products?.productData._id),
                    quantity: count,
                };


                const res = await postCart(productCart);


                toast.success(res.data.message);

            } catch (error) {
                const err = error as { message: string };
                toast.error(err.message || "Đã có lỗi xảy ra, vui lòng thử lại.");
            } finally {
                setLoading(false)
            }
        } else {
            toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
        }
    };


    useEffect(() => {
        getProductDetail(id)
        if (token) {
            userGet()
        }
    }, [id, token])
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + 'VND'
    }
    return (

        <div className="container-detail">
            <div className="container">
                {products ? (
                    <div className="detail-list">
                        <div className="col-5 detail-list-left">
                            <div className="detail-item-top">
                                <img src={`http://localhost:5000/uploads/${products.productData.image_url}`} alt="" className="detail-item-top-img" />
                            </div>
                            <div className="detail-item-bottom">
                                <img src={p1} alt="" className="detail-item-bottom-img" />
                                <img src={p2} alt="" className="detail-item-bottom-img" />
                                <img src={p3} alt="" className="detail-item-bottom-img" />
                                <img src={p4} alt="" className="detail-item-bottom-img" />
                            </div>
                        </div>
                        <div className="col-5 detail-list-right">
                            <h1 className="detail-list-right-title">{products.productData.product_name}</h1>
                            <div className="detail-list-right-review">
                                <div className="product-rating">
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                </div>
                                <Link to={'#'} className='text-review'>50 lượt đánh giá</Link>
                            </div>
                            <div className="detail-list-right-money">
                                <p className="detai-sale">{formatPrice(products.productData.price)}</p>

                            </div>
                            <div className="detail-list-right-material">
                                <h4 className="material-title">Chất liệu:</h4>
                                <span className='material-text'>{products.productData.dimensions}</span>
                            </div>
                            <div className="detail-list-right-dimensions">
                                <h4 className="dimensions-title">Kích thước:</h4>
                                <span className='dimensions-text'>{products.productData.meterial}</span>
                            </div>
                            <div className="detail-list-right-quantity">
                                <h4 className="quantity-title">Số lượng:</h4>
                                <div className='quantity-item'>
                                    <button className='quantity-min' onClick={decrement}>-</button>
                                    <input type="text" className='quantity-input' readOnly min={1} defaultValue={1} value={count} />
                                    <button className='quantity-max' onClick={increment}>+</button>
                                </div>
                            </div>

                            <div className="detail-list-right-add-cart">
                                <button className='b1'>Mua ngay</button>
                                <button className='b2' onClick={addToCart}>{loading ? (<Loading/>):("Thêm giỏ hàng")}</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Không tìm thấy id sản phẩm</p>
                )}
                <div className="detail-tabs mt-5">
                    <ul className="nav nav-tabs" id="productTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link  active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="true">Chi tiết sản phẩm</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="warranty-tab" data-bs-toggle="tab" data-bs-target="#warranty" type="button" role="tab" aria-controls="warranty" aria-selected="false">Bình luận</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="shipping-tab" data-bs-toggle="tab" data-bs-target="#shipping" type="button" role="tab" aria-controls="shipping" aria-selected="false">Vận chuyển</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="productTabContent">
                        <div className="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
                            <p>cHI TIẾT SẢN PHẨM</p>


                        </div>
                        <div className="tab-pane fade" id="warranty" role="tabpanel" aria-labelledby="warranty-tab">
                            <div className="review-section mt-5">
                                <h3>Đánh giá & Bình luận</h3>
                                <div className="mb-4">
                                    <label className="form-label">Viết đánh giá của bạn:</label>
                                    <textarea className="form-control" id="review" rows={3}></textarea>
                                    <button className="btn btn-primary mt-2">Gửi</button>
                                </div>

                                <div className="review-card card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="card-title">Tên Người Dùng</h5>
                                            <div className="star-rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                        <p className="card-text">Nội dung đánh giá của người dùng.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade" id="shipping" role="tabpanel" aria-labelledby="shipping-tab">
                            <p>Thông tin vận chuyển và thời gian giao hàng.</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}