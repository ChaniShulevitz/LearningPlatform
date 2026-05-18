import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CoursesComponent implements OnInit {
  categories: any[] = [
    { id: '1', name: '💻 פיתוח תוכנה וטכנולוגיה' },
    { id: '2', name: '🛡️ סייבר ואבטחת מידע' },
    { id: '3', name: '🎨 עיצוב גרפי ו-UX/UI' },
    { id: '4', name: '📈 שיווק דיגיטלי ומסחר' },
    { id: '5', name: '💰 פיננסים ושוק ההון' },
    { id: '6', name: '💄 ביוטי ואיפור מקצועי' }
  ];

  subCategories: any[] = [
    { id: '101', category_id: '1', name: 'Angular & Frontend' },
    { id: '102', category_id: '1', name: 'בינה מלאכותית ו-Python' },
    { id: '103', category_id: '1', name: 'Node.js & Backend' },
    { id: '201', category_id: '2', name: 'בדיקות חוסן (Penetration Testing)' },
    { id: '202', category_id: '2', name: 'הגנת רשתות ומערכות הפעלה' },
    { id: '301', category_id: '3', name: 'עיצוב אפליקציות ב-Figma' },
    { id: '302', category_id: '3', name: 'מילון המותג ועיצוב גרפי' },
    { id: '401', category_id: '4', name: 'ניהול קמפיינים ממומנים' },
    { id: '402', category_id: '4', name: 'שיווק באמצעות תוכן ו-AI' },
    { id: '501', category_id: '5', name: 'מבוא לניתוח טכני ומניות' },
    { id: '502', category_id: '5', name: 'יזמות וגיוס הון לסטארטאפים' },
    { id: '601', category_id: '6', name: 'איפור ערב וכלות מקצועי' },
    { id: '602', category_id: '6', name: 'טכניקות פיסול והצללת פנים' }
  ];

  filteredSubCategories: any[] = [];
  selectedCategoryId: string = '';
  selectedSubCategoryId: string = '';
  userPrompt: string = '';
  aiExplanation: string = '';
  isLoading: boolean = false;
  myHistory: any[] = []; 

  private apiUrl = 'http://localhost:5000/api/prompts'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMyHistory();
  }

  loadMyHistory() {
    this.myHistory = [
      { prompt: 'איך כותבים מחלקה בפייתון?', response: 'כדי לכתוב מחלקה בפייתון נשתמש במילת המפתח class...', created_at: new Date() },
      { prompt: 'טכניקת בייקינג באיפור ערב', response: 'טכניקת Baking מיועדת לקבע את הקונסילר בצורה מקצועית...', created_at: new Date() }
    ];
  }

  onCategoryChange() {
    this.filteredSubCategories = this.subCategories.filter(
      sub => sub.category_id === this.selectedCategoryId
    );
    this.selectedSubCategoryId = ''; 
    this.aiExplanation = '';
  }

  createLesson() {
    if (!this.userPrompt || !this.userPrompt.trim() || !this.selectedCategoryId) {
      alert('אנא ודאי שבחרת קטגוריה והקלדת שאלה.');
      return;
    }

    this.isLoading = true;
    this.aiExplanation = '';

    // 1. שליפת טוקן ה-JWT שנשמר במערכת בזמן ה-Login/Register
    // בדרך כלל הוא נשמר תחת השם 'token' או 'user' ב-localStorage
    const token = localStorage.getItem('token'); 

    // 2. יצירת כותרת אבטחה (Headers) עם ה-Bearer Token עבור השרת
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // 3. בניית אובייקט הנתונים
    const requestBody = {
      category_id: this.selectedCategoryId,
      sub_category_id: this.selectedSubCategoryId || undefined, 
      prompt: this.userPrompt
    };

    // 4. שליחת הבקשה ל-Backend יחד עם ה-Headers המאובטחים
    this.http.post<any>(this.apiUrl, requestBody, { headers }).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // חילוץ התשובה האמיתית שחזרה מה-AI בשרת
        this.aiExplanation = response.aiResponse || response.explanation || response.text || (response.data ? response.data.text : '') || JSON.stringify(response);

        this.myHistory.unshift({
          prompt: this.userPrompt,
          response: this.aiExplanation,
          created_at: new Date()
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('API Error details:', err);
        alert('אופס! השרת החזיר שגיאה. בדקי את הטרמינל של ה-Backend לראות את הודעת הקריסה המדויקת של OpenAI.');
      }
    });
  }
}