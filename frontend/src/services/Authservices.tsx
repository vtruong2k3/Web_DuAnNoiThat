import axios from "axios"


export type RegisterType = {
    username?: string,
    email: string,
    password: string
}
export type User={
    id: string|undefined,
    username: string,
    email: string,
}
export type UserType = {
    userData: User
}
export type TokenType = {
    token: string
    message: string
}
export interface ErrorType {
    error: string,
    message: string
   
    response?: {
        data?: {
            message: string;
        };
    };
}
export function userRegister(data: RegisterType) {
    return axios.post('/auth/register', data)
}
export function userLogin(data: RegisterType) {
    return axios.post<TokenType>('/auth/login', data)
}
export function getUser() {
    return axios.get<UserType>('/auth/get-user')
}