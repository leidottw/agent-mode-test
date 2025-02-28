import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  return router.navigate(['/login']);
};

const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return router.navigate(['/dashboard']);
  }
  
  return true;
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: HomeComponent }, // Placeholder for now
      { path: 'settings', component: HomeComponent } // Placeholder for now
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
