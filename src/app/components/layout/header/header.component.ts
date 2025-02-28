import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ];

  currentLang: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    public themeService: ThemeService,
    private translationService: TranslationService
  ) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  getCurrentLang(): string {
    return this.translationService.getCurrentLang();
  }
}
