import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://todof.woopear.fr/api/v1/user';

  register(email: string, password: string, username: string): Observable<any> {
    const credentials: RegisterCredentials = {
      email,
      password,
      username,
      role: 'user'
    };
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }
}
