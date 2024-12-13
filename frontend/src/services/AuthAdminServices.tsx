import axios from "axios"

export type LoginType={
    email: string
    password: string
    
}
export type TokenType={
    token: string
    message?:string
}
export type UserType={
    _id:string,
    username: string,
    email:string,
    password:string,
    avatar?:string
    address: string,
    phone: string,
    role: string

}
export type UserTypeRepone={
    data:UserType[]
}
export function fetchLoginAdmin(data:LoginType){
     return axios.post<TokenType>('/api/admin/login',data)
}
export function fetchGetUser(){
    return axios.get<UserTypeRepone>('/api/admin/get-account')
}

export const fetchAddUser =  (data: FormData) => {
    return  axios.post("/api/admin/add-account", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};