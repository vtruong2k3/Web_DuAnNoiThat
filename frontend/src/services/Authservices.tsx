import axios from "axios"

export type RegisterType = {
    username?: string,
    email: string,
    password: string
}
export type UserType = {
    userData: {
        id: string|undefined,
        username: string,
        email: string,
    }
}
export type TokenType = {
    token: string
    message: string
}
export interface ErrorType {
    error: string,
    message: string
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