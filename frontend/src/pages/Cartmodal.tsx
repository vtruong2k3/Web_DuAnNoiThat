import React from 'react';
import p4 from '../assets/img/project-home/Rectangle 7.png'


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    
  }
const cartModal: React.FC<ModalProps>=({isOpen,onClose})=> {
    if(!isOpen) return null
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="container-cartmodal" onClick={e=>e.stopPropagation()}>
                <div className='cartmodal-close' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="cartmodal-list">
                    
                    
                   
                    
                   
                  
                    
                <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>
                    <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>
                    <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>
                    <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>
                    <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>
                    <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>
                    <div className="cartmodal-item">
                        <div className="col-md-4">
                           <a href={'/product'}><img src={p4} alt="" className="cartmodal-img" /></a>
                        </div>
                        <div className="col-md-8 cartmodal-body">
                            <h4 className="cartmodal-body-title">Sofa Zara</h4>
                            <p className="cartmodal-body-money">3.200.000 VND</p>
                        </div>
                    </div>

                    <div className="cartmodal-pay">
                        <div className="cartmodal-pay-heading">
                            <h4 className="cartmodal-pay-amount-title">
                                Tổng tiền:
                            </h4>
                            <p className="cartmodal-pay-amount-money">12.000.000 VND</p>
                        </div>
                        <a href="/" className='cartmodal-pay-link'><button className='cartmodal-pay-btn'>Thanh toán</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default cartModal