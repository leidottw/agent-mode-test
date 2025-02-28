import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public authService: AuthService) {}

  quickActions = [
    { icon: 'analytics', label: 'HOME.VIEW_REPORTS', link: '/reports' },
    { icon: 'database', label: 'HOME.MANAGE_DATA', link: '/data' },
    { icon: 'monitor_heart', label: 'HOME.SYSTEM_STATUS', link: '/status' }
  ];
}
