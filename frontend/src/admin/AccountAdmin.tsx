/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGetUser, UserType } from "../services/AuthAdminServices";
import Loading from '../component/Loading'
import { ErrorType } from "../services/Authservices";
import toast from "react-hot-toast";
export default function account() {
    const [user, setUser] = useState<UserType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getUser = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetUser()
            setUser(data.data)
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
    useEffect(()=>{
        getUser()
    },[])
    return (
        <div className="admin-right">
            <div className="admin-right-header">
                <div className="header-title">
                    <h2 className="title-text">Vũ Văn Trường <i className="fa-regular fa-bell"></i></h2>
                </div>
            </div>
            <div className="admin-right-body scrollable-content">
                {loading && <Loading />}
                <div className="admin-right-body-list">

                    <div className="list-table-new">
                        <div className="table-new-header">
                            <h1 className="title">Danh sách tài khoản</h1>
                        </div>
                        <div className="table-new-add">
                            <Link to={'/admin/add-account'}><button className="add-btn">Tạo tài khoản</button></Link>
                        </div>
                        <div className="table-new-body">
                            <table className="table-custom">
                                <thead className='table-thead'>
                                    <tr>
                                        <td>STT</td>
                                        <td>Username</td>
                                        <td>Email</td>
                                        <td>Password</td>
                                        <td>Address</td>
                                        <td>Phone</td>
                                        <td>Role</td>
                                        <td>Active</td>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {user
                                    .sort((a, b) => (b.role === 'admin' ? 1 : 0) - (a.role === 'admin' ? 1 : 0)) 
                                    .map((u, index) => (
                                        <tr key={u._id}>
                                            <td>{index+1}</td>
                                            <td>{u.username}</td>
                                            <td>{u.email}</td>
                                            <td>{u.password}</td>
                                            <td>{u.address && typeof u.address === 'string' && u.address.length > 0 ? u.address : 'N/AV'}</td>
                                            <td>{u.phone && typeof u.phone === 'string' && u.phone.length > 0 ? u.phone : 'N/AV'}</td>
                                            <td>{u.role}</td>
                                            <td className='active'>
                                                <Link className='edit' to={'#'}><i className="fa-regular fa-pen-to-square"></i></Link>
                                                {u.role!=='admin' && <button className='delete'><i className="fa-regular fa-trash-can"></i></button>}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}