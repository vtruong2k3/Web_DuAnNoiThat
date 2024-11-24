/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ErrorType, getUser, UserType } from '../services/Authservices';
import { Cart, fetchCart } from '../services/Productservices';
import Loading from '../component/Loading'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;

}
const cartModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null
    const [userData, setUserData] = useState<UserType | null>(null);
    const [cart, setCart] = useState<Cart[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)
    const token = localStorage.getItem('token')


    const userGet = async () => {

        try {
            const { data } = await getUser()
            setUserData(data)
        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        }
    }
    useEffect(() => {
        if (token) {
            userGet()

        }
    }, [token])
    const getAllCart = async () => {
        try {
            setLoading(true)
            const { data } = await fetchCart(userData?.userData.id)
            setCart(data.data.cartItems);
            setTotalAmount(data.totalAmount);

        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (userData?.userData.id) {
            getAllCart()
        }
    }, [userData])
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + 'VND'
    }


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="container-cartmodal" onClick={e => e.stopPropagation()}>
                <div className='cartmodal-close' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="container-cartmodal-heading-title">
                    <h1 className='container-cartmodal-title text-center'>Giỏ hàng <span><i className="fa-solid fa-bag-shopping"></i></span></h1>
                </div>
                <div className="cartmodal-list">


                    {
                        cart.length>0 ? (
                            cart.map((product) => (
                                <div className="cartmodal-item" key={product.product_id}>
                                    <div className="col-md-4">
                                        <a href={'/product'}><img src={`http://localhost:5000/uploads/${product.image_url}`} alt="" className="cartmodal-img" /></a>
                                    </div>
                                    <div className="col-md-8 cartmodal-body">
                                        <h4 className="cartmodal-body-title">{product.product_name}</h4>
                                        <p className="cartmodal-body-money">{formatPrice(product.price)}</p>
                                        <p className="cartmodal-body-quantity">Số lượng:<span className='cartmodal-body-text ms-2'><input type="text" readOnly value={product.quantity} /></span></p>
                                    </div>
                                </div>
                            ))
                        ):(
                            <p className='text-center text-danger'>Không tìm thấy sản phẩm trong giỏ hàng</p>
                        )
                    }

                   


                    <div className="cartmodal-pay">
                        <div className="cartmodal-pay-heading">
                            <h4 className="cartmodal-pay-amount-title">
                                Tổng tiền:
                            </h4>
                            <p className="cartmodal-pay-amount-money">{formatPrice(totalAmount)}</p>
                        </div>
                        <a href="/" className='cartmodal-pay-link'><button className='cartmodal-pay-btn'>{loading ? (
                            <>
                                <Loading />Loading...
                            </>
                        ) : (
                            "Thanh toán"
                        )}</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default cartModal