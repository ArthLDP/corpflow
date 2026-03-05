import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment";

export interface UserAuthRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserAuthLoginRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserTokenResponse {
    name: string;
    token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

    private registerApiUrl = `${environment.apiUrl}/auth/register`
    private loginApiUrl = `${environment.apiUrl}/auth/login`;

    constructor(private http: HttpClient) {}

    registerUser(user: UserAuthRegisterRequest): Observable<UserTokenResponse> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<UserTokenResponse>(this.registerApiUrl, user, { headers });
    }

    loginUser(user: UserAuthLoginRequest): Observable<UserTokenResponse> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<UserTokenResponse>(this.loginApiUrl, user, { headers });
    }
}