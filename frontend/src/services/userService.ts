import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment";
import { User, UserAuthLoginRequest, UserAuthRegisterRequest, UserTokenResponse } from "../entities/userEntity";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../entities/jwtPayload";
import { Router } from "@angular/router";
import { SsrCookieService } from "ngx-cookie-service-ssr";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private registerApiUrl = `${environment.apiUrl}/auth/register`
    private loginApiUrl = `${environment.apiUrl}/auth/login`;
    private usersUrl = `${environment.apiUrl}/users`;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    currentUserSignal = signal<User | undefined | null>(undefined);

    constructor(private http: HttpClient, private router: Router, private cookieService: SsrCookieService) {}

    registerUser(user: UserAuthRegisterRequest): Observable<UserTokenResponse> {
        return this.http.post<UserTokenResponse>(this.registerApiUrl, user, { headers: this.headers });
    }

    loginUser(user: UserAuthLoginRequest): Observable<UserTokenResponse> {
        return this.http.post<UserTokenResponse>(this.loginApiUrl, user, { headers: this.headers });
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    getUserByEmail(email: string): Observable<User> {
        const params = new HttpParams()
        .set('email', email)

        return this.http.get<User>(this.usersUrl, { params });
    }

    saveToken(token: string) {
        this.cookieService.set('token', token);
        this.router.navigate(['/']);
    }

    getToken(): string | null {
        return this.cookieService.get('token');
    }

    logout() {
        this.cookieService.delete('token');
        this.currentUserSignal.set(null);
        this.router.navigate(['/']);
    }

    getUserEmailFromToken(token: string): string {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.sub;
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const decodedToken: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp > currentTime;
    }
}