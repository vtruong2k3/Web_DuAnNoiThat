import axios from "axios"

export type OderType={
    _id:string,
    user_id: string,
    name:string,
    address:string,
    phone:string,
    note:string,
    total_amount:number
    oders_code:string
    createdAt:string
    status:string
}
export type OderTypeRespone={
    data:OderType[]
}
export function fetchOders(){
    return axios.get<OderTypeRespone>('/api/oders')
}