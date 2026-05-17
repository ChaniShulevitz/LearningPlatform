import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  allUsers: any[] = [];
  allHistory: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 1. שליפת כל המשתמשים הרשומים במערכת
    this.http.get('http://localhost:5000/api/admin/users', { headers }).subscribe({
      next: (data: any) => this.allUsers = data,
      error: () => {
        // נתונים זמניים למקרה שהבקאנד לא החזיר תשובה, כדי שהדף לא יהיה ריק
        this.allUsers = [
          { id: 1, name: 'חני שולביץ', phone: '050-1234567' },
          { id: 2, name: 'ישראל ישראלי', phone: '052-7654321' }
        ];
      }
    });

    // 2. המנהל רואה את כל היסטוריית השאלות והתשובות של המערכת!
    this.http.get('http://localhost:5000/api/admin/prompts-history', { headers }).subscribe({
      next: (data: any) => this.allHistory = data,
      error: () => {
        this.allHistory = [
          { user_id: 1, prompt: 'כמה סוגי AI יש זמינים בעברית?', response: 'קיימים מספר מודלים מובילים...', created_at: new Date() },
          { user_id: 2, prompt: 'תסביר לי מערכים באנגולר', response: 'מערך באנגולר הוא...', created_at: new Date() }
        ];
      }
    });
  }
}