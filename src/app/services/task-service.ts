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

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  getTasks(): Observable<{ data: Task[] }> {
    return this.http.get<{ data: Task[] }>(this.apiUrl, {
      headers: this.getHeaders()
    })
  }

  addTask(label: string): Observable<{ data: Task }> {
    return this.http.post<{ data: Task }>(
      this.apiUrl,
      { label },
      { headers: this.getHeaders() }
    );
  }

  toggleTaskDone(id: number): Observable<{ data: Task }> {
    return this.http.put<{ data: Task }>(
      `${this.apiUrl}/${id}/done/user`,
      {},
      { headers: this.getHeaders() }
    );
  }

  updateTaskLabel(id: number, label: string): Observable<{ data: Task }> {
    return this.http.put<{ data: Task }>(
      `${this.apiUrl}/${id}/label/user`,
      { label },
      { headers: this.getHeaders() }
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}/user`,
      { headers: this.getHeaders() }
    );
  }


}
