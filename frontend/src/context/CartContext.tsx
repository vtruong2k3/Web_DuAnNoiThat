import  { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
interface CartContextType {
  totalQuantity: number;
  setTotalQuantity: (quantity: number) => void;
}

// Tạo context với giá trị mặc định
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider để bọc ứng dụng
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  return (
    <CartContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return context;
};
