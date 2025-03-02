export interface User{
    login:string,
    password:string,
}
export interface UserRegister extends User{
    verifyPassword:string
}
