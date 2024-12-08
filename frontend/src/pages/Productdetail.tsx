/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useParams } from 'react-router-dom'
import p1 from '../assets/img/product/product_1.png'
import p2 from '../assets/img/product/product_2.png'
import p3 from '../assets/img/product/product_3.png'
import p4 from '../assets/img/product/product_4.png'
import { useEffect, useState } from 'react'
import { ErrorType, getUser, UserType } from '../services/Authservices'
import { CommenttType, fetchCommet, fetchGetCommet, GetCommentType, getDetail, ProducDetail } from '../services/Productservices'
import { CartType, postCart } from '../services/Cartservices'
import toast from 'react-hot-toast'
import mongoose from 'mongoose';
import Loading from '../component/Loading'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUserContext } from '../context/UserContext'
export default function productDetail() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CommenttType>()
    const [count, setCount] = useState(1)
    const { id } = useParams()
    const { user } = useUserContext()
    const [products, setProducts] = useState<ProducDetail | null>(null)
    const [userData, setUserData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [comment, setComment] = useState<GetCommentType[]>([])
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
    const getComment = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetCommet(id)
            console.log(data);

            setComment(data.data)

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
        getComment()
    }, [])
    const addComment: SubmitHandler<CommenttType> = async (data) => {
        try {
            setLoading(true)
            const dataComment = {
                user_id: new mongoose.Types.ObjectId(user?.userData.id),
                product_id: new mongoose.Types.ObjectId(id),
                comment: data.comment
            }
            const res = await fetchCommet(dataComment)
            getComment()
            toast.success(res.data.message)

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

    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + 'VND'
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);


        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
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
                                <h4 className="material-title">Kích thước:</h4>
                                <span className='material-text'>{products.productData.dimensions}</span>
                            </div>
                            <div className="detail-list-right-dimensions">
                                <h4 className="dimensions-title">Chất liệu:</h4>
                                <span className='dimensions-text'>{products.productData.material}</span>
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
                                <button className='b2' onClick={addToCart}>{loading ? (<Loading />) : ("Thêm giỏ hàng")}</button>
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
                            <div className="comment-section">
                                <h2 className="comment-title mb-4">Bình luận</h2>


                                <div id="commentList">
                                    {comment.map(comment => (
                                        <div className="comment-card" key={comment._id}>
                                            <img src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg" alt="User Photo" />
                                            <div className="comment-content">
                                                <div className="d-flex align-items-center">
                                                    <span className="comment-author">{comment.user_id.username}</span>
                                                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                                                </div>
                                                <p className="comment-text">{comment.comment}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>


                                {token && (
                                    <div className="add-comment mt-4">
                                        <h4>Thêm bình luận</h4>
                                        <form id="commentForm" onSubmit={handleSubmit(addComment)}>

                                            <div className="mb-3 mt-3">
                                                <textarea
                                                    {...register('comment', { required: "Vui lòng không bỏ trống" })}
                                                    id="commentText" className="form-control" rows={3}></textarea>
                                                {errors.comment && <div className="text-danger mt-2">{errors.comment.message}</div>}
                                            </div>
                                            <button type="submit" className="btn btn-primary">Bình luận</button>
                                        </form>
                                    </div>
                                )}
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