/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ErrorType } from '../services/Authservices';
import { Cart, CartType, fetchCart, fetchDeleteCart, updateCart } from '../services/Cartservices';
import Loading from '../component/Loading'
import { useUserContext } from '../context/UserContext';

import mongoose from 'mongoose';

export default function cart() {
    const [cart, setCart] = useState<Cart[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useUserContext()




    const getAllCart = async () => {
        try {
            setLoading(true)
            const { data } = await fetchCart(user?.userData.id)
            setCart(data.data.cartItems);
            setTotalAmount(data.totalAmount);





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
        if (user?.userData.id && cart.length >= 0) {
            getAllCart()
        }
    }, [user])
    
    const DecreaseAddCart = async (productId: string, quantity: number) => {

        try {

            const updatedQuantity = quantity - 1;

            const productCart: CartType = {
                user_id: new mongoose.Types.ObjectId(user?.userData.id),
                product_id: new mongoose.Types.ObjectId(productId),
                quantity: updatedQuantity,
            };
            await updateCart(productCart)


        } catch (error) {
            toast.error((error as ErrorType).message);
        }
    }
    const IncreaseAddCart = async (productId: string, quantity: number) => {

        try {

            const updatedQuantity = quantity + 1;

            const productCart: CartType = {
                user_id: new mongoose.Types.ObjectId(user?.userData.id),
                product_id: new mongoose.Types.ObjectId(productId),
                quantity: updatedQuantity,
            };
            await updateCart(productCart)


        } catch (error) {
            toast.error((error as ErrorType).message);
        }
    }

    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + ' ' + 'VND'
    }

    const updateTotalAmount = () => {
        const newTotalAmount = cart.reduce((sum, product) => sum + product.totalPrice, 0);

        setTotalAmount(newTotalAmount);
    };
    useEffect(() => {
        updateTotalAmount();
    }, [cart]); 

    const handleIncrease = (productId: string, quantity: number) => {
        setCart(prevCart =>
            prevCart.map(product =>
                product.product_id === productId
                    ? { ...product, quantity: product.quantity + 1, totalPrice: (product.quantity + 1) * product.price }
                    : product
            )
        );
        updateTotalAmount();
        IncreaseAddCart(productId, quantity);




    };

    const handleDecrease = (productId: string, quantity: number) => {
        setCart(prevCart =>
            prevCart.map(product =>
                product.product_id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1, totalPrice: (product.quantity - 1) * product.price }
                    : product
            )
        );
        updateTotalAmount();
        DecreaseAddCart(productId, quantity)


    };
    const handleDeleteProduct = async (product_id: string) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirmed) return;

        try {
            const response = await fetchDeleteCart(product_id)
            if (cart.length > 0) {
                getAllCart()
            } else {
                return false
            }
            toast.success(response.data.message)
        } catch (error) {
            toast.error((error as ErrorType).message)
            console.log((error as ErrorType).message);

        }
    };

    return (
        <div className="container-cart">
            {loading && <Loading />}
            <div className="cart-heading">
                <h1 className="cart-heading-title text-center">Giỏ hàng</h1>
            </div>
            <div className="container">
                <div className="cart-body">
                    <div className="cart-body-list">

                        <div className="cart-body-list-left col-9">
                            <div className="cart-body-list-left-header">
                                <div className="cart-left-header-item-product col-5">
                                    Sản phẩm
                                </div>
                                <div className="cart-left-header-item-money col-2">
                                    Giá
                                </div>
                                <div className="cart-left-header-item-quantity col-2">
                                    Số lượng
                                </div>
                                <div className="cart-left-header-item-money-total col-3">
                                    Tổng tiền
                                </div>
                            </div>
                            <div className="cart-body-list-left-body">
                                {cart.length > 0 ? (
                                    cart.map(product => (
                                        <div className="cart-body-list-left-body-item" key={product.product_id}>
                                            <div className="cart-left-body-item-product col-5">
                                                <div className="cart-left-body-item-product-img">
                                                    <Link to={`/product/product-detail/${product.product_id}`}><img src={`http://localhost:5000/uploads/${product.image_url}`} alt="" className="cart-left-body-product-img" /></Link>
                                                </div>
                                                <div className="cart-left-body-item-product-row">
                                                    <h3 className="cart-left-body-product-title">{product.product_name}</h3>
                                                    <p onClick={() => handleDeleteProduct(product.product_id)} className="cart-left-body-product-delete"><i className="fa-solid fa-trash"></i>  Xóa</p>
                                                </div>
                                            </div>
                                            <div className="cart-left-body-item-money col-2">
                                                <p className="cart-left-body-item-money-text">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>
                                            <div className="cart-left-body-item-quantity col-2">
                                                <div className='quantity-item'>
                                                    <button
                                                        className='quantity-min'
                                                        onClick={() => handleDecrease(product.product_id, product.quantity)}
                                                        disabled={product.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className='quantity-input'
                                                        readOnly
                                                        value={product.quantity}
                                                    />
                                                    <button
                                                        className='quantity-max'
                                                        onClick={() => handleIncrease(product.product_id, product.quantity)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="cart-left-body-item-money-total col-3">
                                                <p className='cart-left-body-item-money-total-text'>{formatPrice(product.totalPrice)}</p>
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                    <p className='text-center text-danger'>Không tìm thấy sản phẩm trong giỏ hàng</p>
                                )}
                            </div>
                        </div>

                        <div className="cart-body-list-right col-3">
                            <div className="cart-body-list-right-item">
                                <h1 className="cart-body-list-right-item-title">Thông tin đơn hàng</h1>

                                <div className="cart-body-list-right-item-money">
                                    <p className="cart-body-list-right-money-title">Tổng tiền:</p>
                                    <p className="cart-body-list-right-money-total">{formatPrice(totalAmount)}</p>
                                </div>

                                <Link to={'/product/oders'} className='cart-body-list-right-link'><button className='cart-body-list-right-btn'>Thanh toán</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}