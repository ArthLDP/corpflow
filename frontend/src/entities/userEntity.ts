export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface UserAuthRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface UserAuthLoginRequest {
    email: string;
    password: string;
}

export interface UserTokenResponse {
    name: string;
    token: string
}
