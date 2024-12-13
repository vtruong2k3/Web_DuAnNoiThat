import axios from "axios"

export type CategoryType={
    _id: string,
    category_name: string
}
export type CategoryTypeRespone={
    data:CategoryType[]
}

export function fetchGetCategoryAll(){
    return axios.get<CategoryTypeRespone>('/api/admin/category')
}
export function fetchAddCategory(data:CategoryType){
    return axios.post('/api/admin/add-category',data)
}