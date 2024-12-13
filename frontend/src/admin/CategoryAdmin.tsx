/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { CategoryType, fetchGetCategoryAll } from "../services/CategoryAdminServices"
import Loading from '../component/Loading'
import { ErrorType } from "../services/Authservices"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

export default function categoryAdmin() {
    const [category, setCategory] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
  
    const getCategoryAll = async () => {
        try {
            setLoading(true)
            const { data } = await fetchGetCategoryAll()
            setCategory(data.data)
           
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
        getCategoryAll()
    },[])
    return (
        <div className="admin-right">
            <div className="admin-right-header">
                <div className="header-title">
                    <h2 className="title-text">Vũ Văn Trường <i className="fa-regular fa-bell"></i></h2>
                </div>
            </div>
            <div className="admin-right-body scrollable-content">

                <div className="admin-right-body-list">
                    {loading && <Loading />}
                    <div className="list-table-new">

                        <div className="table-new-header">
                            <h1 className="title">Danh sách danh mục</h1>
                        </div>
                        <div className="table-new-add">
                            <Link to={'/admin/add-category'}><button className="add-btn">Thêm danh mục</button></Link>
                        </div>
                        <div className="table-new-body">
                            <table className="table-custom">
                                <thead className='table-thead'>
                                    <tr>
                                        <td>STT</td>
                                        <td>Tên danh mục</td>
                                        <td>Active</td>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {category.map((c, index) => (
                                        <tr key={c._id}>
                                            <td>{index + 1}</td>
                                            <td>{c.category_name}</td>
                                            
                                            <td className='active'>
                                                <Link className='edit' to={'#'}><i className="fa-regular fa-pen-to-square"></i></Link>
                                                <button className='delete'><i className="fa-regular fa-trash-can"></i></button>
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