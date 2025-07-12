import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service/auth-service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { Tasks } from "../tasks/tasks";

@Component({
  selector: 'app-dashboard',
  imports: [JsonPipe, CommonModule, Tasks],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  isLoggedIn = this.authService.isLoggedIn;
  data: any = null;

  logout() {
    this.authService.logout();
  }

  loadData() {
    this.http.get('https://todof.woopear.fr/api/v1/user/profil').subscribe({
      next: (response) => this.data = response,
      error: (error) => console.error('Erreur:', error)
    });
  }
}
