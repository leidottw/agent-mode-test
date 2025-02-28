import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: '儀表板', icon: 'dashboard', link: '/dashboard' },
    { label: '用戶管理', icon: 'people', link: '/dashboard/users' },
    { label: '設定', icon: 'settings', link: '/dashboard/settings' }
  ];
}
