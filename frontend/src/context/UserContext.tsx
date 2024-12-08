import { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu người dùng
interface User {
    id: string | undefined;
    username: string;
    email: string;
}
interface UserType {
    userData: User
}
// Định nghĩa kiểu cho context
interface UserContextType {
    user: UserType | null; // Có thể null khi chưa có dữ liệu
    setUser: (user: UserType) => void;
}

// Tạo context mặc định
const UserContext = createContext<UserContextType | undefined>(undefined);

// Tạo provider để bọc ứng dụng
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook để sử dụng context dễ dàng hơn
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext phải được sử dụng trong UserProvider');
    }
    return context;
};
