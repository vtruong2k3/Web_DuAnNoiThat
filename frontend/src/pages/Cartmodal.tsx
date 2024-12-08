/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ErrorType} from '../services/Authservices';
import { Cart, fetchCart } from '../services/Cartservices';
import Loading from '../component/Loading'

import { useUserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ModalProps {
    
    onClose: () => void;

}
const cartModal: React.FC<ModalProps> = ({  onClose }) => {
  
    const [cart, setCart] = useState<Cart[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)
    const {setTotalQuantity}=useCart()
    
    const {user}=useUserContext()
   
    const getAllCart = async () => {
        try {
            setLoading(true)
            const { data } = await fetchCart(user?.userData.id)
            setCart(data.data.cartItems);
           
            setTotalAmount(data.totalAmount);
            setTotalQuantity(data.totalQuantity)
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
        if (user?.userData.id) {
            getAllCart()
        }
    }, [user])
    const isCartEmpty = cart.length === 0 ;
    const formatPrice=(price:number):string=>{
        return price.toLocaleString('vi-VN')+ ' ' + 'VND'
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
                                        <a href={'/product/cart'}><img src={`http://localhost:5000/uploads/${product.image_url}`} alt="" className="cartmodal-img" /></a>
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
                        <Link  to="/product/oders" className='cartmodal-pay-link'><button  disabled={isCartEmpty} onClick={onClose} className='cartmodal-pay-btn'>{loading ? (
                            <>
                                <Loading />Loading...
                            </>
                        ) : (
                            "Thanh toán"
                        )}</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default cartModal