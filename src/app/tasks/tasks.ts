import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../services/task-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  error = signal('');

  newTaskLabel = signal('');

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        console.log('Réponse :', response);
        this.tasks.set(response.data);
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.error.set('Une erreur est survenue lors du chargement des tâches.');
      }
    });
  }
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTaskLabel.set(input.value);
  }

  onLabelChange(event: Event, task: Task) {
    const input = event.target as HTMLInputElement;
    const newLabel = input.value;
    this.editLabel(task, newLabel);
  }

  addTask() {
    const label = this.newTaskLabel().trim();
    if (!label) return;

    this.taskService.addTask(label).subscribe({
      next: (response) => {
        const task = response.data;
        this.tasks.update(current => [...current, task]);
        this.newTaskLabel.set('');
      },
      error: (err) => {
        console.error('Erreur ajout tâche :', err);
        this.error.set("Impossible d'ajouter la tâche.");
      }
    });
  }


  toggleDone(task: Task) {
    this.taskService.toggleTaskDone(task.id).subscribe({
      next: (response) => {
        const updated = response.data;
        this.tasks.update(tasks =>
          tasks.map(t => t.id === updated.id ? updated : t)
        );
      },
      error: (err) => {
        console.error('Erreur changement état :', err);
        this.error.set("Impossible de modifier la tâche.");
      }
    });
  }

  editLabel(task: Task, newLabel: string) {
    const label = newLabel.trim();
    if (!label || label === task.label) return;

    this.taskService.updateTaskLabel(task.id, label).subscribe({
      next: (response) => {
        const updated = response.data;
        this.tasks.update(tasks =>
          tasks.map(t => t.id === updated.id ? updated : t)
        );
      },
      error: (err) => {
        console.error('Erreur mise à jour label :', err);
        this.error.set("Impossible de modifier le label.");
      }
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
      },
      error: (err) => {
        console.error("Erreur suppression tâche :", err);
        this.error.set("Impossible de supprimer la tâche.");
      }
    });
  }



}
