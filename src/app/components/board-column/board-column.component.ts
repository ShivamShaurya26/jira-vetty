import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDragDrop, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { Column, Task, ColumnId } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { LucideAngularModule, Plus, Circle, Clock, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [
    CommonModule, 
    CdkDropList, 
    CdkDrag, 
    CdkDragPlaceholder, 
    TaskCardComponent, 
    LucideAngularModule
  ],
  template: `
    <div class="flex flex-col h-full min-w-[280px] w-full max-w-[320px] bg-gray-50 dark:bg-zinc-900/50 rounded-xl border border-gray-100 dark:border-zinc-800/50">
      <div class="p-3 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-white/50 dark:bg-zinc-900/50 rounded-t-xl backdrop-blur-sm">
        <div class="flex items-center gap-2">
           <div class="p-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
             <ng-container [ngSwitch]="column.id">
               <lucide-icon *ngSwitchCase="'todo'" [img]="Circle" class="w-4 h-4"></lucide-icon>
               <lucide-icon *ngSwitchCase="'inprogress'" [img]="Clock" class="w-4 h-4 text-blue-500"></lucide-icon>
               <lucide-icon *ngSwitchCase="'review'" [img]="CheckCircle" class="w-4 h-4 text-orange-500"></lucide-icon>
               <lucide-icon *ngSwitchCase="'done'" [img]="CheckCircle" class="w-4 h-4 text-green-500"></lucide-icon>
             </ng-container>
           </div>
           <h2 class="font-semibold text-sm text-gray-700 dark:text-gray-200">{{ column.title }}</h2>
           <span class="text-xs text-gray-400 font-mono bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">{{ tasks.length }}</span>
        </div>
        
        <button (click)="onAddTask.emit(column.id)" class="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md text-gray-500 transition-colors">
          <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
        </button>
      </div>

      <div
        cdkDropList
        [cdkDropListData]="column.id"
        class="flex-1 p-3 flex flex-col gap-3 overflow-y-auto min-h-[200px]"
        (cdkDropListDropped)="onDrop.emit($event)"> <!-- Drop handled by parent group -->
        
        <app-task-card 
          *ngFor="let task of tasks" 
          [task]="task"
          cdkDrag
          [cdkDragData]="task">
          
          <div *cdkDragPlaceholder class="bg-gray-100 dark:bg-zinc-800 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-lg h-[100px] w-full"></div>
        </app-task-card>

      </div>
    </div>
  `,
  styles: ``
})
export class BoardColumnComponent {
  @Input({ required: true }) column!: Column;
  @Input({ required: true }) tasks: Task[] = [];
  @Output() onAddTask = new EventEmitter<ColumnId>();
  @Output() onDrop = new EventEmitter<CdkDragDrop<any>>();
  
  readonly Plus = Plus;
  readonly Circle = Circle;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;
}
