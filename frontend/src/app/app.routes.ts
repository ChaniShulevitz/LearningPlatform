import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { CoursesComponent } from './components/courses/courses';
import { AdminComponent } from './components/admin/admin'; 

const adminGuard = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user && user.isAdmin === true) {
    return true; 
  }
  
  alert('אין לך הרשאות מנהל לגשת לאזור זה!');
  router.navigate(['/courses']);
  return false;
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];