/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from 'react-router-dom'
import cod from '../assets/img/icon/cod.svg'
import pay from '../assets/img/icon/other-pay.svg'
import { useEffect, useState } from "react";
import { District, fetchDistricts, fetchProvinces, fetchWards, Province, ProvinceAll, Ward } from "../services/ApiVnservices";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Cart, CartResType, fetchCart, fetchCheckOut } from '../services/Cartservices';
import mongoose from 'mongoose';
import { useUserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { ErrorType } from '../services/Authservices';
import Swal from 'sweetalert2';

export default function oders() {
   
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedWard, setSelectedWard] = useState<string>('');
    const { user } = useUserContext()
    const {
        register,
        handleSubmit,
        formState:{errors}

    } = useForm<ProvinceAll & CartResType>()
    const [cart, setCart] = useState<Cart []>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const Navig=useNavigate()
    


    

    const getAllCart = async () => {
        try {
           
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
        } 
    }
    useEffect(() => {
        if (user?.userData.id) {
            getAllCart()
        }
    }, [user])
    useEffect(() => {
        const fetchAllProvinces = async () => {
            try {
                const data = await fetchProvinces();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchAllProvinces();
    }, []);

    const handleProvinceChange = async (provinces: string) => {
        setSelectedProvince(provinces);
        setSelectedDistrict('');
        setSelectedWard('');
        setWards([]);
        if (provinces) {


            try {
                const data = await fetchDistricts(provinces);
                setDistricts(data);


            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        }
    };

    const handleDistrictChange = async (districts: string) => {
        setSelectedDistrict(districts);
        setSelectedWard('');
        if (districts) {


            try {
                const data = await fetchWards(districts);


                setWards(data);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        }
    };
    
    const onsubmit: SubmitHandler<ProvinceAll & CartResType> = async (data) => {
        try {
            const province = provinces.find((p) => p.code == data.province);
            const district = districts.find((d) => d.code == data.district);
            const ward = wards.find((w) => w.code == data.ward);

            const provinceName = province ? province.name : '';
            const districtName = district ? district.name : '';
            const wardName = ward ? ward.name : '';

            const dataCartItem = {
                user_id: new mongoose.Types.ObjectId(user?.userData.id),
                name: data.name,
                phone: data.phone,
                address: data.address + ', ' + wardName + ', ' + districtName + ', ' + provinceName,
                note: data.note,
                totalAmount: totalAmount
            }
            const res = await fetchCheckOut(dataCartItem)
            Swal.fire({
                icon: 'success',                
                title: 'Đặt hàng thành công', 
                text: res.data.message,    
                confirmButtonText: 'OK',       
                showCloseButton: true,         
                timer: 3000,                  
                timerProgressBar: true,        
            })
            Navig(`/bill/${res.data.oder_id}`)
        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        }

    }
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + ' ' + 'VND'
    }
    return (
        <div className="container-oders">
            <div className="container">
                <div className="oders-list">
                    <div className="oders-left col-7">
                        <div className="oders-left-item">
                            <div className="oder-left-heading">
                                <h2 className="oder-left-heading-title">
                                    Thông tin giao hàng
                                </h2>
                            </div>
                            <div className="oders-left-body">
                                <div className="form-group-custom">
                                    <label className="form-lable col-2" >Họ tên:</label>
                                    <input
                                        {...register('name',
                                            {required:"Vui lòng không bỏ trống"})}
                                        type="text" className="form-input-custom col-10" />
                                    
                                </div>
                                {errors?.name && <div className='text-danger err-custom' >{errors?.name.message}</div>}
                                <div className="form-group-custom">
                                    <label className="form-lable col-2" >Điện thoại:</label>
                                    <input
                                        {...register('phone',
                                            {required:"Vui lòng không bỏ trống",
                                                minLength:{
                                                    value:10,
                                                    message:"Số điện thoại tối thiếu 10 kí tự"
                                                },
                                                maxLength:{
                                                    value:10,
                                                    message:"Số điện thoại tối đa 10 kí tự"
                                                }
                                            })}
                                        type="text" className="form-input-custom col-10" />
                                       
                                </div>
                                {errors?.phone && <div className='text-danger err-custom'>{errors?.phone.message}</div>}
                                <div className="form-group-custom">
                                    <label className="form-lable col-2">Địa chỉ:</label>
                                    <div className="form-group-item col-10">
                                        <input
                                            {...register('address',{required:"Vui lòng không bỏ trống"})}
                                            type="text" className="form-input-custom input-custom" />
                                            {errors?.address && <div className='text-danger'>{errors?.address.message}</div>}
                                        <div className="from-select-group">
                                            <select
                                                {...register('province')}
                                                value={selectedProvince}
                                                onChange={(e) => handleProvinceChange(e.target.value)}
                                                className="from-select">
                                                <option value="1">Chọn Tỉnh/Thành phố</option>
                                                {provinces.map((p) => (
                                                    <option key={p.code} value={p.code}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                {...register('district')}
                                                value={selectedDistrict}
                                                onChange={(e) => handleDistrictChange(e.target.value)}
                                                disabled={!selectedProvince}
                                                className="from-select">
                                                <option value="1">Chọn Quận/Huyện</option>
                                                {districts.map((p) => (
                                                    <option key={p.code} value={p.code}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                {...register('ward')}
                                                value={selectedWard}
                                                onChange={(e) => setSelectedWard(e.target.value)}
                                                disabled={!selectedDistrict}
                                                className="from-select">
                                                <option value="1">Chọn Phường/Xã</option>
                                                {wards.map((p) => (
                                                    <option key={p.code} value={p.code}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group-custom">
                                    <label className="form-lable col-2">Ghi chú:</label>
                                    <textarea
                                        {...register('note')}
                                        className="form-textarea col-10" rows={4}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="oders-left-shipper">
                            <div className="oder-left-heading">
                                <h2 className="oder-left-heading-title">
                                    Thông tin giao hàng
                                </h2>

                            </div>
                            <div className="oders-left-shipper-item">
                                <div className="oders-left-shipper-raido">
                                    <input type="radio" className="oders-left-shipper-input" />
                                    <p className="oders-left-shipper-text">Giao hàng tận nơi</p>
                                </div>
                                <div className="oders-left-shipper-img">
                                    <i className="fa-solid fa-truck-fast"></i>
                                </div>
                            </div>
                        </div>
                        <div className="oders-left-pay">
                            <div className="oder-left-heading">
                                <h2 className="oder-left-heading-title">
                                    Phương thức thành toán
                                </h2>

                            </div>
                            <div className="oders-left-pay-body">
                                <div className="oders-left-pay-body-item">
                                    <input type="radio" name="flexRadioDefault" className="oders-left-pay-input" />
                                    <img src={cod} alt="" className="oders-left-pay-img" />
                                    <p className="oders-left-pay-text">Thanh toán khi nhận hàng (COD)</p>
                                </div>
                                <div className="oders-left-pay-body-item">
                                    <input type="radio" name="flexRadioDefault" className="oders-left-pay-input" />
                                    <img src={pay} alt="" className="oders-left-pay-img" />
                                    <p className="oders-left-pay-text">Thanh toán chuyển khoản qua ngân hàng</p>
                                </div>
                            </div>
                        </div>
                        <div className="oders-left-btn">
                            <Link to={'/product/cart'} className='oders-left-btn-link'><i className="fa-solid fa-arrow-left pe-2"></i>Giỏ hàng</Link>
                           <button onClick={handleSubmit(onsubmit)} className='oders-left-btn-button'>Tiếp tục thanh toán</button>
                        </div>
                    </div>
                    <div className="oders-right col-5">
                        <div className="oders-right-heading">
                            <h3 className="oders-right-heading-title oder-left-heading-title">
                                Đơn hàng của bạn
                            </h3>
                        </div>

                        <div className="oders-right-body">
                            <div className="oders-right-list">

                                {cart.map(product => (
                                    <div className="oders-right-item" key={product.product_id}>

                                        <div className="oders-right-item-img col-3">
                                            <img src={`http://localhost:5000/uploads/${product.image_url}`} alt="" className="oders-right-item-img" />
                                            <span className='oders-right-item-quantity'>{product.quantity}</span>
                                        </div>

                                        <div className="oders-right-item-title col-5">
                                            <h4 className="title">{product.product_name}</h4>
                                        </div>
                                        <div className="oders-right-item-money col-4">
                                            <p className="money">{formatPrice(product.price)}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="oders-right-discount-code">
                                <input type="text" className='oders-right-discount-input' />
                                <button className='oders-right-discount-btn'>Áp dụng</button>
                            </div>

                            <div className="oders-right-total-money">
                                <div className="oders-right-money-item">
                                    <p className="oders-right-text">
                                        Tạm tính
                                    </p>
                                    <p className="oders-right-text-money">
                                        {formatPrice(totalAmount)}
                                    </p>
                                </div>
                                <div className="oders-right-money-item">
                                    <p className="oders-right-text">
                                        Vận chuyển
                                    </p>
                                    <p className="oders-right-text-money">
                                        0 VND
                                    </p>
                                </div>
                                <div className="oders-right-money-item-total">
                                    <p className=" oders-right-text">
                                        Tổng tiền
                                    </p>
                                    <p className="oders-right-text-total">
                                        {formatPrice(totalAmount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}