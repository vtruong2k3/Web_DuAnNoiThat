import axios from "axios";

export type ProductAdmin={
    _id: string|undefined;
    product_name: string;
    price: number;
    description: string;
    category_id: string;
    material: string;
    dimensions: string;
    stock_quantity: number;
    image_url: string;
}
export type ProductAdminRespone={
    data:ProductAdmin[]
}
export type CountType={
    totalAccounts:number
    totalProduct:number
    totalOders:number
}

export type OderType={
    _id:string,
    user_id: string,
    name: string,
    address: string, 
    phone: string,
    note: string,
    total_amount: number,
    oders_code: string
    createdAt:string
}
export type OderTypeRespone={
    data:OderType[]
}
export function fetchGetPoductNew(){
    return axios.get<ProductAdminRespone>('/api/admin/product-new')
}
export function fetchGetPoductAll(){
    return axios.get<ProductAdminRespone>('/api/admin/product')
}
export function fetchCountAll(){
    return axios.get<CountType>('/api/admin/count')
}
export function fetchGetOderAll(){
    return axios.get<OderTypeRespone>('/api/admin/oder')
}
export function fetchAddProduct(data:FormData){
   return axios.post('api/admin/add-product',data,{
    headers: {
        "Content-Type": "multipart/form-data",
    },
})
}
export function fetchDeleteProduct(product_id:string|undefined){
    return axios.delete(`/api/admin/product/delete/${product_id}`)
}