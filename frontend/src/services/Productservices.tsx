import axios from "axios";
import mongoose from 'mongoose'
import { ErrorType } from "./Authservices";
export type Product = {
    _id: string|undefined;
    product_name: string;
    price: number;
    description: string;
    category_id: string;
    meterial: string;
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
export type ProducDetail={
    productData:Product
}
export type CartType={

  
    user_id: mongoose.Types.ObjectId;
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    message?: string|undefined
}


export interface Cart {
    product_id: string;
    product_name: string;
    price: number;
    image_url: string;
    quantity:number
    totalPrice: number
}


export interface CartData {
    cartItems: Cart[];
   
}


export interface CartResponse {
    data: CartData;
    totalAmount: number;
}
export function newProduct() {
    return axios.get<ProductType>('/api/product/new')
}
export function getDetail(id: string | undefined) {
    return axios.get<ProducDetail>('/api/product/' + id)
}

export function postCart(producData:CartType){
    return axios.post<ErrorType>('/api/product/add-to-cart',producData)
}
export function fetchCart(user_id:string|undefined): Promise<{data:CartResponse}>{
    return axios.get(`/api/product/get-cart/${user_id}`)
}