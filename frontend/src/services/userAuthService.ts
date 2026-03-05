import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment";
import { UserAuthLoginRequest, UserAuthRegisterRequest, UserTokenResponse } from "../entities/userEntity";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../entities/jwtPayload";

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {

    private registerApiUrl = `${environment.apiUrl}/auth/register`
    private loginApiUrl = `${environment.apiUrl}/auth/login`;

    constructor(private http: HttpClient) { }

    registerUser(user: UserAuthRegisterRequest): Observable<UserTokenResponse> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<UserTokenResponse>(this.registerApiUrl, user, { headers });
    }

    loginUser(user: UserAuthLoginRequest): Observable<UserTokenResponse> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<UserTokenResponse>(this.loginApiUrl, user, { headers });
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    getUserEmailFromToken(token: string): string | null {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.sub;
    }
}