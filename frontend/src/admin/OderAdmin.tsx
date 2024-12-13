/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import Loading from '../component/Loading'
import { fetchGetOderAll, OderType } from '../services/ProductAdminServices'
import { ErrorType } from '../services/Authservices'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function oderAdmin() {
    const [loading, setLoading] = useState<boolean>(false)
    const [oder, setOder] = useState<OderType[]>([])
    const getOderAll = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetOderAll()
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
        getOderAll()
    }, [])
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN') + ' ' + 'VND'
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);


        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    return (
        <div className="admin-right">
            <div className="admin-right-header">
                <div className="header-title">
                    <h2 className="title-text">Vũ Văn Trường <i className="fa-regular fa-bell"></i></h2>
                </div>
            </div>
            <div className="admin-right-body scrollable-content">

                <div className="admin-right-body-list">

                    <div className="list-table-new">
                        {loading && <Loading />}
                        <div className="table-new-header">
                            <h1 className="title">Danh sách đơn hàng</h1>
                        </div>

                        <div className="table-new-body">
                            <table className="table-custom">
                                <thead className='table-thead'>
                                    <tr>
                                        <td>STT</td>
                                        <td>Họ tên</td>
                                        <td>Địa chỉ</td>
                                        <td>Số điện thoại</td>
                                        <td>Ngày đặt</td>
                                        <td>Tổng tiền</td>
                                        <td>Ghi chứ</td>
                                        <td>Chi tiết đơn</td>
                                        <td>Active</td>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {oder.map((o, index) => (
                                        <tr key={o._id}>
                                            <td>{index + 1}</td>
                                            <td>{o.name}</td>
                                            <td className='text-address'>{o.address}</td>
                                            <td >{o.phone}</td>
                                            <td >{formatDate(o.createdAt)}</td>

                                            <td>{formatPrice(o.total_amount)}</td>

                                            <td>{o.note}</td>
                                            <td><Link style={{ textDecoration: 'none' }} to={'#'}>Chi tiết</Link></td>
                                            <td className='active'>
                                                <Link className='edit' to={'#'}><i className="fa-regular fa-pen-to-square"></i></Link>
                                                <button className='delete'><i className="fa-regular fa-trash-can"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* <tr>
                                <td>1</td>
                                <td>Sản phẩm abc </td>
                                <td>sdfgsd</td>
                                <td>23.000.000 VND</td>
                                <td>Da bò thật</td>
                                <td>300x400x500 mm</td>

                            </tr> */}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}