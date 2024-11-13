
import './App.css';
// import Swal from 'sweetalert2';
import {useRoutes} from "react-router-dom";
import Clientlayout from './layout/Clientlayout'
import Home from './pages/Home'
import Products from './pages/Products'
import Productdetail from './pages/Productdetail'
function App() {
  // Swal.fire({
  //   icon: 'error',                // Icon hiển thị (success, error, warning, info, question)
  //   title: 'Thành công',            // Tiêu đề của thông báo
  //   text: 'Đặt hàng thành công',    // Nội dung của thông báo
  //   confirmButtonText: 'OK',        // Nút xác nhận
  //   showCloseButton: true,          // Nút đóng
  //   timer: 3000,                    // Tự động đóng sau 3 giây
  //   timerProgressBar: true,         // Hiển thị thanh tiến trình
  // });
  const router=useRoutes([
      {path:"/", element:<Clientlayout/>,
        children:[
            {path:"", element:<Home/>},
            {path:"product", element:<Products/>},
            {path:"product/product-detail", element:<Productdetail/>},
        ]
      }
  ])

  return(
    <div>{router}</div>
  )
}

export default App;
