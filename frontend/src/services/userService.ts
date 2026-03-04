import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    createUser(user: User): Observable<User> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<User>(this.apiUrl, user, { headers });
    }
}