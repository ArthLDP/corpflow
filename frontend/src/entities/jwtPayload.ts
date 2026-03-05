export interface JwtPayload {
    sub: string;
    iss: string;
    exp: number;
}