import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../services/register-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private registerService = inject(RegisterService);
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';
  username = '';
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  register() {
    if (!this.email || !this.password || !this.username || this.password !== this.confirmPassword) {
      this.errorMessage.set('Veuillez remplir tous les champs correctement.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.registerService.register(this.email, this.password, this.username).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set('Compte créé avec succès ! Vous pouvez vous connecter.');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Erreur lors de la création du compte.');
      }
    });
  }
}
