/* eslint-disable react-hooks/rules-of-hooks */
import c1 from '../assets/img/category/icon-web-01-600x360.webp'
import c2 from '../assets/img/category/icon-web-02-600x360.webp'
import c3 from '../assets/img/category/icon-web-03-600x360.webp'
import c4 from '../assets/img/category/icon-web-04-600x360.webp'
import c5 from '../assets/img/category/icon-web-05-600x360.webp'
import c6 from '../assets/img/category/icon-web-06-600x360.webp'
import p1 from '../assets/img/project-home/Rectangle 4.png'
import p2 from '../assets/img/project-home/Rectangle 5.png'
import p3 from '../assets/img/project-home/Rectangle 6.png'
import p4 from '../assets/img/project-home/Rectangle 7.png'
import n1 from '../assets/img/product/new_1.png'
import n2 from '../assets/img/product/new_2.png'
import n3 from '../assets/img/product/new_3.png'
import n4 from '../assets/img/product/new_4.png'
import cabinet from '../assets/img/icon/cabinet.png'
import table from '../assets/img/icon/table.png'
import m1 from '../assets/img/banner/m1.jpeg'
import m2 from '../assets/img/banner/m2.jpg'
import t1 from '../assets/img/news/t1.webp'
import t2 from '../assets/img/news/t2.webp'
import t3 from '../assets/img/news/t3.webp'
import t4 from '../assets/img/news/t4.webp'
import { Link } from 'react-router-dom'
import Banner from '../component/Banner'
import { useEffect, useState } from 'react'
import { newProduct, ProductType } from '../services/Productservices'
import Loading from '../component/Loading'
import { ErrorType } from '../services/Authservices'
import toast from 'react-hot-toast'
export default function homePage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [newProducts, setNewProducts] = useState<ProductType>()

    const productNew = async () => {
        try {
            setLoading(true)
            const { data } = await newProduct()
           


            setNewProducts(data)
        } catch (error) {
            console.log((error as ErrorType).message);
            toast.error((error as ErrorType).message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        productNew()
    }, [])
    const formatPrice=(price:number):string=>{
        return price.toLocaleString('vi-VN') + 'VND'
    }
    return (
        <div className="container-home">
            <Banner />

            <div className="container">
                {loading && <Loading />}
                <div className="category">
                    <div className="category-item">
                        <img src={c1} alt="" className='category-item-img' />
                        <h4 className='category-item-title'>Ghế sofa</h4>
                    </div>
                    <div className="category-item">
                        <img src={c2} alt="" className='category-item-img' />
                        <h4 className='category-item-title'>Bàn trà</h4>
                    </div>
                    <div className="category-item">
                        <img src={c3} alt="" className='category-item-img' />
                        <h4 className='category-item-title'>Ghế sofa thư giãn</h4>
                    </div>
                    <div className="category-item">
                        <img src={c4} alt="" className='category-item-img' />
                        <h4 className='category-item-title'>Bàn ăn</h4>
                    </div>
                    <div className="category-item">
                        <img src={c5} alt="" className='category-item-img' />
                        <h4 className='category-item-title'>Ghế ăn</h4>
                    </div>
                    <div className="category-item">
                        <img src={c6} alt="" className='category-item-img' />
                        <h4 className='category-item-title'>Giường ngủ</h4>
                    </div>
                </div>

                <div className="project-home">
                    <h1 className="text-center project-home-heading title-all">Dự án</h1>

                    <div className="project-home-list">
                        <div className="project-home-item">
                            <img src={p1} alt="" className="project-home-img" />
                            <h4 className="project-home-title">Nội thất Phòng khách</h4>
                        </div>
                        <div className="project-home-item">
                            <img src={p2} alt="" className="project-home-img" />
                            <h4 className="project-home-title">Nội thất Phòng ngủ</h4>
                        </div>
                        <div className="project-home-item">
                            <img src={p3} alt="" className="project-home-img" />
                            <h4 className="project-home-title">Nội thất Phòng bếp</h4>
                        </div>
                        <div className="project-home-item">
                            <img src={p4} alt="" className="project-home-img" />
                            <h4 className="project-home-title">Nội thất Phòng làm việc</h4>
                        </div>
                    </div>
                </div>
                <div className="product-new">
                    <h1 className="text-center product-new-title title-all">Sản phẩm mới</h1>
                    <div className="product-new-list">
                        {newProducts && newProducts.productData && newProducts.productData.length > 0 ? (
                            newProducts.productData.map(product => (
                                <div className="product-new-item" key={product._id}>
                                    <Link to={`/product/product-detail/${product._id}`}>
                                        <img src={`http://localhost:5000/uploads/${product.image_url}`} alt="" className="product-new-img" />
                                    </Link>
                                    <div className="product-box-new"><p>New</p></div>
                                    <div className="product-new-body">
                                        <h3 className="product-new-body-title">{product.product_name}</h3>
                                        <div className="product-rating">
                                            <span className="star">★</span>
                                            <span className="star">★</span>
                                            <span className="star">★</span>
                                            <span className="star">★</span>
                                            <span className="star">★</span>
                                        </div>
                                        <div className="product-new-money">
                                            <p className='money-sale'>{formatPrice(product.price)}</p>
                                            <p className='money'>5.000.000 VND</p> {/* Giá cố định, có thể thay bằng giá gốc nếu có */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No new products available</p>
                        )}


                        {/* <div className="product-new-item">
                            <img src={n2} alt="" className="product-new-img" />
                            <div className="product-box-new"><p>New</p></div>
                            <div className="product-new-body">
                                <h3 className="product-new-body-title">Sofa Zara</h3>
                                <div className="product-rating">
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                </div>

                                <div className="product-new-money">
                                    <p className='money-sale'>3.200.000 VND</p>
                                    <p className='money'>5.000.000 VND</p>
                                </div>

                            </div>
                        </div>
                        <div className="product-new-item">
                            <img src={n3} alt="" className="product-new-img" />
                            <div className="product-box-new"><p>New</p></div>
                            <div className="product-new-body">
                                <h3 className="product-new-body-title">Sofa Zara</h3>
                                <div className="product-rating">
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                </div>

                                <div className="product-new-money">
                                    <p className='money-sale'>3.200.000 VND</p>
                                    <p className='money'>5.000.000 VND</p>
                                </div>

                            </div>
                        </div>
                        <div className="product-new-item">
                            <img src={n4} alt="" className="product-new-img" />
                            <div className="product-box-new"><p>New</p></div>
                            <div className="product-new-body">
                                <h3 className="product-new-body-title">Sofa Zara</h3>
                                <div className="product-rating">
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                    <span className="star">★</span>
                                </div>

                                <div className="product-new-money">
                                    <p className='money-sale'>3.200.000 VND</p>
                                    <p className='money'>5.000.000 VND</p>
                                </div>

                            </div>
                        </div> */}

                    </div>
                </div>


                <div className="product-new product-custom">
                    <h1 className="text-center product-new-title product-new-title-custom title-all">Sản phẩm chính</h1>

                    <div className="product-custom-list">
                        <div className="product-custom-list-heading">
                            <h4>Sofa <span><i className="fa-solid fa-couch"></i></span></h4>
                        </div>
                        <div className="product-new-list">
                            <div className="product-new-item">
                                <img src={n1} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara gsdfgsdfgsdfgsdfghsdfgsdf</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n2} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n3} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n4} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="product-custom-list">
                        <div className="product-custom-list-heading">
                            <h4>Cabinet <span><img src={cabinet} alt="" /></span></h4>
                        </div>
                        <div className="product-new-list">
                            <div className="product-new-item">
                                <img src={n1} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n2} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n3} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n4} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="product-custom-list">
                        <div className="product-custom-list-heading">
                            <h4>Chairs <span><i className="fa-solid fa-chair"></i></span></h4>
                        </div>
                        <div className="product-new-list">
                            <div className="product-new-item">
                                <img src={n1} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n2} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n3} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n4} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="product-custom-list">
                        <div className="product-custom-list-heading">
                            <h4>Tables <span><img src={table} alt="" /></span></h4>
                        </div>
                        <div className="product-new-list">
                            <div className="product-new-item">
                                <img src={n1} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n2} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n3} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>
                            <div className="product-new-item">
                                <img src={n4} alt="" className="product-new-img" />

                                <div className="product-new-body">
                                    <h3 className="product-new-body-title">Sofa Zara</h3>
                                    <div className="product-rating">
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                        <span className="star">★</span>
                                    </div>

                                    <div className="product-new-money">
                                        <p className='money-sale'>3.200.000 VND</p>
                                        <p className='money'>5.000.000 VND</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="product-custom-btn">
                        <button>Xem thêm</button>
                    </div>
                </div>
            </div>
            <div className="design">
                <img src={m1} alt="" className="design-img-left" />
                <div className="design-content">
                    <div className="design-item-left">
                        <h1>Mẫu thiết kế phòng khách</h1>
                        <p>Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình...</p>
                        <Link className='l1' to={'/'}>Mẫu phòng khách <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>


                    <div className="design-item-right">
                        <h1>Đồ trang trí</h1>
                        <p>Mang lại những nguồn cảm hứng và nét sinh động cho không gian...</p>
                        <Link className='l1' to={'/'}>khám phá<i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                </div>

                <img src={m2} alt="" className='design-img-right' />
            </div>

            <div className="latest-news">
                <h1 className="text-center latest-news-custom title-all">Tin tức</h1>
                <div className="latest-news-list">
                    <div className="latest-news-item">
                        <div className="latest-news-wraper">
                            <img src={t1} alt="" className='latest-news-img' />
                        </div>
                        <h1 className="latest-news-title">New collection – dreamy art</h1>
                        <p className="latest-news-text">Nghệ thuật của những giấc mơ là BST mới thiết
                            kế đặc biệt bởi Jenhouse.
                        </p>
                    </div>
                    <div className="latest-news-item">
                        <div className="latest-news-wraper">
                            <img src={t2} alt="" className='latest-news-img' />
                        </div>
                        <h1 className="latest-news-title">New collection – dreamy art</h1>
                        <p className="latest-news-text">Nghệ thuật của những giấc mơ là BST mới thiết
                            kế đặc biệt bởi Jenhouse.
                        </p>
                    </div>
                    <div className="latest-news-item">
                        <div className="latest-news-wraper">
                            <img src={t3} alt="" className='latest-news-img' />
                        </div>
                        <h1 className="latest-news-title">New collection – dreamy art</h1>
                        <p className="latest-news-text">Nghệ thuật của những giấc mơ là BST mới thiết
                            kế đặc biệt bởi Jenhouse.
                        </p>
                    </div>
                    <div className="latest-news-item">
                        <div className="latest-news-wraper">
                            <img src={t4} alt="" className='latest-news-img' />
                        </div>
                        <h1 className="latest-news-title">New collection – dreamy art</h1>
                        <p className="latest-news-text">Nghệ thuật của những giấc mơ là BST mới thiết
                            kế đặc biệt bởi Jenhouse.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}