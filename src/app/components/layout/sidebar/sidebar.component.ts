import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'COMMON.DASHBOARD' },
    { path: '/dashboard/home', icon: 'home', label: 'COMMON.HOME' },
    { path: '/dashboard/settings', icon: 'settings', label: 'COMMON.SETTINGS' }
  ];

  constructor(public themeService: ThemeService) {}
}
