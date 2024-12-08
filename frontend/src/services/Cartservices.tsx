import axios from "axios"
import mongoose from 'mongoose'
import { ErrorType } from "./Authservices";
export type CartType = {


    user_id: mongoose.Types.ObjectId;
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    message?: string | undefined
}


export interface Cart {
    product_id: string;
    product_name: string;
    price: number;
    image_url: string;
    quantity: number
    totalPrice: number

}


export interface CartData {
    cartItems: Cart[];

}


export interface CartResponse {
    data: CartData;
    totalAmount: number;
    totalQuantity: number
}
export interface CartResType {
    user_id: mongoose.Types.ObjectId;
    name: string;
    address: string;
    phone: string;
    note: string
    totalAmount: number,
    total_amount?:number
    oders_code?: string
    createdAt?:string
}
export interface CartResBillType{
    data:CartResType
}
export function postCart(producData: CartType) {
    return axios.post<ErrorType>('/api/product/add-to-cart', producData)
}
export function updateCart(producData: CartType) {
    return axios.put<ErrorType>('/api/product/update-quantity', producData)
}
export function fetchCart(user_id: string | undefined): Promise<{ data: CartResponse }> {
    return axios.get(`/api/product/get-cart/${user_id}`)
}

export function fetchDeleteCart(product_id: string) {
    return axios.delete(`/api/product/delete-product-cart/${product_id}`)
}

export function fetchCheckOut(dataCartItem: CartResType) {
    return axios.post('/api/product/check-out', dataCartItem)
}
export function fetchGetBill(oder_id: string | undefined): Promise<{ data: CartResBillType }> {
    return axios.get(`/api/product/bill/${oder_id}`)
}
