
import './App.css';
// import Swal from 'sweetalert2';
import {useRoutes} from "react-router-dom";
import Clientlayout from './layout/Clientlayout'
import Home from './pages/Home'
import Products from './pages/Products'
import Productdetail from './pages/Productdetail'
import Cart from './pages/Cart'
import Oders from './pages/Oders'
import { Toaster } from 'react-hot-toast';

import Bill from './pages/ShowBill'
import Admin from './layout/Adminlayout'
import HomeAdmin from './admin/HomeAdmin'
import ProductAdmin from './admin/ProductAdmin'
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
            {path:"product/product-detail/:id", element:<Productdetail/>},
            {path:"product/cart", element:<Cart/>},
            {path:"product/oders", element:<Oders/>},
           
            {path:"bill/:oder_id", element:<Bill/>},
        ]
      },
      
      {path:"/admin", element:<Admin/>,
        children:[
          {path:"", element:<HomeAdmin/>},
          {path:"product", element:<ProductAdmin/>}
        ]
      }
      
  ])

  return(
    <div>
      {router}
      <Toaster/>
    </div>

  )
}

export default App;
