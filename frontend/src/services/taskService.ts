import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Task } from "../entities/taskEntity";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasksUrl = `${environment.apiUrl}/tasks`
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) {}

    getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.tasksUrl);
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.tasksUrl, task, { headers: this.headers });
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task, { headers: this.headers });
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.tasksUrl}/${id}`);
    }
}