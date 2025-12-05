import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut, LayoutDashboard, Settings } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <aside class="w-64 h-screen bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 flex flex-col hidden md:flex">
      <div class="p-6 border-b border-gray-200 dark:border-zinc-800">
        <div class="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-gray-100">
          <div class="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
            V
          </div>
          Vetty
        </div>
      </div>
      
      <nav class="flex-1 p-4 space-y-1">
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 font-medium">
          <lucide-icon [img]="LayoutDashboard" class="w-5 h-5"></lucide-icon>
          Board
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:text-gray-100 transition-colors">
          <lucide-icon [img]="Settings" class="w-5 h-5"></lucide-icon>
          Settings
        </a>
      </nav>

      <div class="p-4 border-t border-gray-200 dark:border-zinc-800">
        <button (click)="onLogout.emit()" class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
          <lucide-icon [img]="LogOut" class="w-5 h-5"></lucide-icon>
          Log out
        </button>
      </div>
    </aside>
  `,
  styles: ``
})
export class SidebarComponent {
  @Output() onLogout = new EventEmitter<void>();
  readonly LogOut = LogOut;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Settings = Settings;
}
