import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AuthService } from '../../services/auth.service';
import { BoardService } from '../../services/board.service';
import { Task, ColumnId } from '../../models/task.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BoardColumnComponent } from '../../components/board-column/board-column.component';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';
import { LucideAngularModule, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule, 
    CdkDropListGroup, 
    SidebarComponent, 
    BoardColumnComponent, 
    AddTaskModalComponent,
    LucideAngularModule
  ],
  template: `
    <div class="h-screen w-full flex bg-white dark:bg-zinc-950">
      <app-sidebar (onLogout)="logout()"></app-sidebar>
      
      <main class="flex-1 flex flex-col h-screen overflow-hidden">
        <header class="h-16 border-b border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm flex items-center justify-between px-6 flex-shrink-0">
          <div class="flex items-center gap-2">
             <lucide-icon [img]="Sparkles" class="w-5 h-5 text-yellow-500"></lucide-icon>
             <h1 class="font-bold text-gray-900 dark:text-gray-100">Jira board (Vetty)</h1>
             <lucide-icon [img]="Sparkles" class="w-5 h-5 text-yellow-500"></lucide-icon>
          </div>
          <!-- Mobile menu button could go here -->
        </header>

        <div class="flex-1 overflow-x-auto overflow-y-hidden p-6" cdkDropListGroup>
           <div class="flex h-full gap-6 min-w-max">
             <app-board-column
               *ngFor="let colId of board().columnOrder"
               [column]="getColumn(colId)"
               [tasks]="getTasksByColumn(colId)"
               (onAddTask)="openAddTask($event)"
               (onDrop)="handleDrop($event)">
             </app-board-column>
           </div>
        </div>
      </main>

      <app-add-task-modal
        [isOpen]="isModalOpen"
        [columnId]="activeColumnId"
        [columnTitle]="activeColumnTitle"
        (onClose)="closeModal()"
        (onAdd)="createTask($event)">
      </app-add-task-modal>
    </div>
  `,
  styles: ``
})
export class BoardComponent {
  private authService = inject(AuthService);
  private boardService = inject(BoardService);
  private router = inject(Router);

  board = this.boardService.board;
  isModalOpen = false;
  activeColumnId: ColumnId | null = null;
  readonly Sparkles = Sparkles;
  
  constructor() {}


  get activeColumnTitle(): string {
    if (this.activeColumnId && this.board().columns[this.activeColumnId]) {
      return this.board().columns[this.activeColumnId].title;
    }
    return '';
  }

  getColumn(columnId: ColumnId) {
    return this.board().columns[columnId];
  }

  getTasksByColumn(columnId: ColumnId): Task[] {
    const col = this.board().columns[columnId];
    return col.taskIds.map((id: string) => this.board().tasks[id]).filter((t: Task) => !!t);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openAddTask(columnId: ColumnId) {
    this.activeColumnId = columnId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.activeColumnId = null;
  }

  createTask(task: Task) {
    if (this.activeColumnId) {
      this.boardService.addTask(this.activeColumnId, task);
      this.closeModal();
    }
  }

  handleDrop(event: CdkDragDrop<any>) {
    // cdkDropListGroup handles connection, we just need to pass data to service
    // event.previousContainer.data -> source column id
    // event.container.data -> dest column id
    // But wait, my BoardColumnComponent sets [cdkDropListData]="column.id"
    
    if (event.previousContainer === event.container) {
      this.boardService.moveTask(
        event.item.data.id,
        event.container.data as ColumnId,
        event.container.data as ColumnId,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.boardService.moveTask(
        event.item.data.id,
        event.previousContainer.data as ColumnId,
        event.container.data as ColumnId,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
