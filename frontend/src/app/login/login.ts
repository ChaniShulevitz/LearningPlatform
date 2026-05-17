import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  message = '';
  isSuccess = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('http://localhost:5000/api/users/login', this.loginData)
      .subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.message = '🔓 התחברת בהצלחה! מנתב לדף המתאים...';
          
          // שמירת הנתונים ב-LocalStorage
          localStorage.setItem('token', response.token);
          
          // אם הבקאנד לא מחזיר role, נניח לפי האימייל למשל לצורך הבדיקה (או נשתמש במה שחוזר מהשרת)
          const userRole = response.role || (this.loginData.email.includes('admin') ? 'admin' : 'user');
          localStorage.setItem('role', userRole);

          // ניתוב חכם לפי סוג המשתמש
          setTimeout(() => {
            if (userRole === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }, 1000);
        },
        error: (err) => {
          this.isSuccess = false;
          this.message = err.error?.message || '❌ אימייל או סיסמה שגויים';
        }
      });
  }
}