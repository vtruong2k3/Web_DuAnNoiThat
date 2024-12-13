import { createContext, useContext, useState, ReactNode } from 'react';


interface User {
    id: string | undefined;
    username: string;
    email: string;
}
interface UserType {
    userData: User
}

interface UserContextType {
    user: UserType | null; 
    setUser: (user: UserType) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext phải được sử dụng trong UserProvider');
    }
    return context;
};
