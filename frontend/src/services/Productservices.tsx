import axios from "axios";

export type Product = {
    _id: string|undefined;
    product_name: string;
    price: number;
    description: string;
    category_id: string;
    material: string;
    dimensions: string;
    stock_quantity: number;
    image_url: string;
    image: string
}
export type ProductType = {
    productData: [
        Product

    ]
};
export type CommenttType={
    comment: string
}
export type GetCommentType={
    _id:string,
    user_id:{
        _id:string,
        username: string
    },
    comment:string,
    createdAt: string
}
export type GetCommentResponse ={
    data: GetCommentType[]; 
  }
export type ProducDetail={
    productData:Product
}
export function getProduct() {
    return axios.get<ProductType>('/api/product/product-all')
}
export function newProduct() {
    return axios.get<ProductType>('/api/product/new')
}
export function sofaProduct() {
    return axios.get<ProductType>('/api/product/sofa')
}
export function cabinetProduct() {
    return axios.get<ProductType>('/api/product/cabinet ')
}
export function tablesProduct() {
    return axios.get<ProductType>('/api/product/tables ')
}
export function chairsProduct() {
    return axios.get<ProductType>('/api/product/chairs ')
}
export function getDetail(id: string | undefined) {
    return axios.get<ProducDetail>('/api/product/' + id)
}
export function fetchCommet(data:CommenttType) {
    return axios.post('/api/product/comment',data)
}
export function fetchGetCommet(product_id:string|undefined) {
    return axios.get<GetCommentResponse>('/api/product/comment/'+product_id)
}
