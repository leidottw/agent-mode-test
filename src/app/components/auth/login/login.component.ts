import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLoading = false;
  error = '';
  currentLang: string;

  languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService,
    private translationService: TranslationService
  ) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  ngOnInit() {
    // Initialize current language
    this.currentLang = this.translationService.getCurrentLang();
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'AUTH.REQUIRED_FIELDS';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'AUTH.LOGIN_ERROR';
        this.isLoading = false;
      }
    });
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  getCurrentLang(): string {
    return this.translationService.getCurrentLang();
  }
}
