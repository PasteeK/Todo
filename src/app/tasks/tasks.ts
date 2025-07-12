import { Component, inject, signal } from '@angular/core';
import { Task, TaskService } from '../services/task-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  newTaskLabel = '';
  error = signal('');

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks.set(data),
      error: () => this.error.set('Une erreur est survenue lors de la chargement des taches.')
    })
  }

  createTask() {
    console.log('yo')
    if (!this.newTaskLabel.trim()) return;

    this.taskService.createTask(this.newTaskLabel).subscribe({
      next: (task) => {
        this.tasks.update(tasks => [...tasks, task]);
        this.newTaskLabel = '';
      }
    })
  }

  toggleTask(task: Task) {
    this.taskService.updateTaskDone(task.id, !task.done).subscribe({
      next: (updated) => {
        this.tasks.update(t => t.map(tsk => tsk.id === task.id ? updated : tsk))
      }
    })
  }

  editLabel(task: Task, newLabel: string) {
    if (!newLabel.trim()) return;

    this.taskService.updateTaskLabel(task.id, newLabel).subscribe({
      next: (updated) => {
        this.tasks.update(t => t.map(tsk => tsk.id === task.id ? updated : tsk))
      }
    })
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks.update(t => t.filter(tsk => tsk.id !== id))
    })
  }
}
