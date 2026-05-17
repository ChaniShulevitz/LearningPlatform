import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { CoursesComponent } from './courses/courses';
import { AdminComponent } from './admin/admin';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: CoursesComponent }, // הדשבורד של המשתמש הרגיל
  { path: 'admin', component: AdminComponent },       
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];