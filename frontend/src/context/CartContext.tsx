import  { createContext, useContext, useState, ReactNode } from "react";


interface CartContextType {
  totalQuantity: number;
  setTotalQuantity: (quantity: number) => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  return (
    <CartContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return context;
};
