// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
// import { toast } from 'react-hot-toast';
// import { Cart, fetchCart } from '../services/Cartservices';
 
// import { ErrorType, getUser, UserType } from '../services/Authservices';

// interface CartContextType {
//   cart: Cart[];
//   totalAmount: number;
//   totalQuantity: number;
//   loading: boolean;
//   getAllCart: () => Promise<void>;
// }

// interface CartProviderGetProps {
//   children: ReactNode;  
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProviderGet: React.FC<CartProviderGetProps> = ({ children }) => {
//   const [cart, setCart] = useState<Cart[]>([]);
//   const [totalAmount, setTotalAmount] = useState<number>(0);
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [userData, setUserData] = useState<UserType | null>(null);
//   const token = localStorage.getItem('token')
//   const userGet = async () => {
//       try {
//           const { data } = await getUser()
//           setUserData(data)
         

//       } catch (error) {
//           console.log((error as ErrorType).message);
//           toast.error((error as ErrorType).message)
//       }
//   }
//   useEffect(() => {
//     if (token) {
//         userGet()
//     }
// }, [token])
//   const getAllCart = async () => {
//     try {
//       setLoading(true);
//       const { data } = await fetchCart(userData?.userData.id);  
//       setCart(data.data.cartItems);
//       setTotalAmount(data.totalAmount);
//       setTotalQuantity(data.totalQuantity);
//     } catch (error) {
//       console.log((error as Error).message);
//       toast.error((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userData?.userData?.id) {
//       return
//     }
//     const interval = setInterval(() => {
//       getAllCart(); 
//     }, 5000); 
  
//     return () => {
//       clearInterval(interval); 
//     };
//   }, [userData,cart]);

//   return (
//     <CartContext.Provider value={{ cart, totalAmount, totalQuantity, loading, getAllCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCartGet = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProviderGet');
//   }
//   return context;
// };
