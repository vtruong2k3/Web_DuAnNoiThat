import logo from '../assets/img/logo/logo 1.png'
export default function footerClient() {
    return (

        <footer className="footer bg-dark text-light py-5 mt-5">
            <div className="container">
                <div className="row">

                    <div className="col-md-3">
                        <div className="footer-logo mb-3">
                            <img src={logo} alt="Company Logo" />
                        </div>

                        <ul className="list-unstyled">
                            <li><i className="bi bi-telephone"></i> 0947.225.188</li>
                            <li><i className="bi bi-envelope"></i> House1996ft@gmail.com</li>
                            <li><i className="bi bi-geo-alt"></i> Số 10, đường Cầu Giấy, Hà Nội</li>
                        </ul>
                        <h6 className="mt-4">Follow me!</h6>
                        <div className="footer-social">
                            <a href="#"><i className="fa-brands fa-facebook"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>


                    <div className="col-md-3">
                        <h5>Chi nhánh</h5>
                        <ul className="list-unstyled">
                            <li>Hà Nội</li>
                            <li>Tp. Hồ Chí Minh</li>
                            <li>Hải Phòng</li>
                            <li>Thanh Hóa</li>
                            <li>Đà Nẵng</li>
                        </ul>
                    </div>


                    <div className="col-md-3">
                        <h5>Chính sách</h5>
                        <ul className="list-unstyled">
                            <li>Đổi trả</li>
                            <li>Thanh toán</li>
                            <li>Kiếu nại</li>
                            <li>Trả góp</li>
                        </ul>
                    </div>


                    <div className="col-md-3">
                        <h5>Hỏi đáp</h5>
                        <ul className="list-unstyled">
                            <li>Sản phẩm</li>
                            <li>Đơn hàng</li>
                            <li>Chất lượng</li>
                            <li>Chính sách</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container text-center mt-4">
                <p>@ 2024 & Design by Vũ Trường</p>
            </div>
        </footer>

    )
}