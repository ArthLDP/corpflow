import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}
}