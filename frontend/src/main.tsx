import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { configAxios } from './config/Axiosconfig.ts';
import { CartProvider } from './context/CartContext.tsx'
import { UserProvider } from './context/UserContext.tsx';
import {CategoryProvider} from './context/CategoryContext.tsx'



configAxios()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <UserProvider>

        <CartProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </CartProvider>

      </UserProvider>

    </BrowserRouter>
  </StrictMode>
);
