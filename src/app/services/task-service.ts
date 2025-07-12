import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  label: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'https://todof.woopear.fr/api/v1/task';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders()});
  }

  createTask(label: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { label }, { headers: this.getHeaders() });
  }

  updateTaskLabel(id: number, label: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, { label }, { headers: this.getHeaders() });
  }

  updateTaskDone(id: number, done: boolean): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, { done }, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
