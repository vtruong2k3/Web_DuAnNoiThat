/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { fetchOders, OderType } from "../services/OderServices"
import { ErrorType } from "../services/Authservices"
import toast from "react-hot-toast"
import Loading from '../component/Loading'
export default function oderItems() {
    const [oders, setOder] = useState<OderType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getOder = async () => {
        try {
            setLoading(true)
            const { data } = await fetchOders()
            setOder(data.data)
           

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
        getOder()
    }, [])
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + ' VND'
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);


        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    return (
        <div className="orderitem-container ">
            {loading && <Loading />}
            <h2 className="text-center order-title mb-5">Lịch sử đơn hàng</h2>




            <div className="row order-list" >

                {oders.map(oder => (
                    <div className="col-md-8 mb-4" key={oder._id}>
                        <div className="order-card shadow-sm">
                            <div className="order-card-header d-flex justify-content-between align-items-center">
                                <h6 className="order-id">Đơn hàng #{oder.oders_code}</h6>
                                <span className="order-status bg-warning">{oder.status}</span>
                            </div>
                            <div className="order-card-body">
                                <p className="order-date"><strong>Ngày đặt:</strong> {formatDate(oder.createdAt)}</p>
                                <p className="order-total"><strong>Tổng tiền:</strong> {formatPrice(oder.total_amount)}</p>
                                <button className="btn btn-detail mt-2">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                ))}
               


            </div>


        </div>

    )
}