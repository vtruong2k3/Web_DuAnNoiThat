/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { CartResBillType, fetchGetBill } from "../services/Cartservices"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { ErrorType } from "../services/Authservices"
import Loading from '../component/Loading'
export default function showBill() {
    const { oder_id } = useParams<string>()
    const [dataBill, setDataBill] = useState<CartResBillType | null>(null)
    const [totalAmount, setTotalAmount] = useState<number | undefined>(0);
    const [loading, setLoading] = useState<boolean>(false)

    const getBill = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetBill(oder_id)
            setDataBill(data)
            setTotalAmount(data?.data.total_amount)



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
        if (oder_id) {
            getBill()
        }
    }, [oder_id])
    const formatPrice = (price: number | undefined): string => {

        if (price === undefined || price === null) {
            return "0 VND";
        }
        return price.toLocaleString('vi-VN') + ' VND';
    };

    return (
        <div className="container-bill">
            <div className="order-success">
                <div className="success-header">
                    {loading && <Loading />}
                    <span className="success-icon">✔️</span>
                    <h2>Đặt hàng thành công</h2>
                </div>
                <div className="success-body">
                    <p className="success-body-title">{dataBill?.data.name}</p>
                    <p className="success-body-text">Chúc mừng bạn đã đặt hàng thành công!!!.  <strong>XSHOP</strong> sẽ sớm liên hệ với bạn để bàn giao sản phẩm nhanh nhất.</p>
                    <table>
                        <tr>
                            <td className="oder-code text">Mã đơn hàng :</td>
                            <td className="oder-code-text">{dataBill?.data.oders_code}</td>
                        </tr>
                        <tr>
                            <td className="pay text">Phương thức thanh toán :</td>
                            <td className="pay-text text-all">Thanh toán khi nhận hàng</td>
                        </tr>
                        <tr>
                            <td className="time text">Thời gian đặt hàng :</td>
                            <td className="time-text text-all">{dataBill?.data.createdAt}</td>
                        </tr>
                        <tr>
                            <td className="name text">Họ tên người nhận :</td>
                            <td className="name-text text-all">{dataBill?.data.name}</td>
                        </tr>
                        <tr>
                            <td className="address text">Địa chỉ nhận :</td>
                            <td className="address-text text-all">{dataBill?.data.address}</td>
                        </tr>
                        <tr>
                            <td className="pice text">Tổng tiền :</td>
                            <td className="total-price">{formatPrice(totalAmount)}</td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    )
}