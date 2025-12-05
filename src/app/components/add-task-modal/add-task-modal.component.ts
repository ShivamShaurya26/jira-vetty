import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColumnId, Task } from '../../models/task.model';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
        
        <div class="flex justify-between items-center p-4 border-b border-gray-100 dark:border-zinc-800">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Task to <span class="text-blue-600">{{ columnTitle }}</span></h2>
          <button (click)="onClose.emit()" class="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md text-gray-500 transition-colors">
            <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>
          </button>
        </div>

        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="p-4 space-y-4">
          <div class="space-y-2">
            <label for="taskId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Task ID</label>
            <input
              id="taskId"
              type="text"
              formControlName="id"
              class="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100"
              placeholder="e.g. TASK-001"
            />
            <div *ngIf="taskForm.get('id')?.invalid && (taskForm.get('id')?.dirty || taskForm.get('id')?.touched)" class="text-red-500 text-xs">
              Task ID is required.
            </div>
          </div>

          <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              id="title"
              type="text"
              formControlName="title"
              class="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100"
              placeholder="Task title"
            />
            <div *ngIf="taskForm.get('title')?.invalid && (taskForm.get('title')?.dirty || taskForm.get('title')?.touched)" class="text-red-500 text-xs">
               Title is required.
            </div>
          </div>

          <div class="space-y-2">
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              formControlName="description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Task description..."
            ></textarea>
            <div *ngIf="taskForm.get('description')?.invalid && (taskForm.get('description')?.dirty || taskForm.get('description')?.touched)" class="text-red-500 text-xs">
               Description is required.
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button type="button" (click)="onClose.emit()" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``
})
export class AddTaskModalComponent {
  @Input() isOpen = false;
  @Input() columnId: ColumnId | null = null;
  @Input() columnTitle = '';
  @Output() onClose = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<Task>();
  
  readonly X = X;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid && this.columnId) {
      const task: Task = {
        ...this.taskForm.value,
        status: this.columnId
      };
      this.onAdd.emit(task);
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
