import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CategoryType, fetchGetCategoryAll } from "../services/CategoryAdminServices";


interface CategoryContextType {
  categoryContext: CategoryType[];
  setCategoryContext: (categories: CategoryType[]) => void;
}


const CategoryContext = createContext<CategoryContextType | undefined>(undefined);


export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryContext, setCategoryContext] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await fetchGetCategoryAll(); 
        setCategoryContext(data.data); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryContext, setCategoryContext }}>
      {children}
    </CategoryContext.Provider>
  );
};


export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};

