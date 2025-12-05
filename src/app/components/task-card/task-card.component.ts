import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-zinc-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-zinc-700 hover:shadow-md transition-shadow cursor-pointer group">
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-mono text-gray-500 dark:text-gray-400">#{{ task.id.slice(0, 4) }}</span>
      </div>
      <h3 class="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{{ task.title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{{ task.description }}</p>
    </div>
  `,
  styles: ``
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
}
