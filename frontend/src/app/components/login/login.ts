import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ✨ מייבאים את כלי הניווט

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✨ מוסיפים את RouterModule לכאן כדי שהכפתור יעבוד!
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  
  constructor(private router: Router) {}

  // פונקציה חכמה שמדמה התחברות ומעבירה עמוד בצורה מאובטחת
  onLogin() {
    // שומרים משתמש פיקטיבי מקומי כדי שהשומר (Guard) של הראוטינג ייתן לנו להיכנס
    const mockUser = { email: 'chanishulevitz@gmail.com', isAdmin: true };
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // מטיסים את המשתמש לעמוד הקורסים
    this.router.navigate(['/courses']);
  }
}