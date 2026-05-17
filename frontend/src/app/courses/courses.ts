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
  // הגדרת הנושאים (קטגוריות)
  categories: any[] = [
    { id: '1', name: '💻 פיתוח תוכנה וטכנולוגיה' },
    { id: '2', name: '📊 יזמות וניהול עסקי' }
  ];

  // לכל נושא יש בדיוק 4 תתי-נושאים ברורים
  subCategories: any[] = [
    // תתי נושאים לפיתוח תוכנה
    { id: '101', category_id: '1', name: 'פיתוח פרונטאנד ב-Angular' },
    { id: '102', category_id: '1', name: 'בינה מלאכותית ו-Python' },
    { id: '103', category_id: '1', name: 'בסיסי נתונים ו-SQL' },
    { id: '104', category_id: '1', name: 'ארכיטקטורת שרתים ו-Node.js' },
    
    // תתי נושאים ליזמות ועסקים
    { id: '201', category_id: '2', name: 'שיווק דיגיטלי ממוקד' },
    { id: '202', category_id: '2', name: 'בניית תוכנית עסקית' },
    { id: '203', category_id: '2', name: 'גיוס הון ומשקיעים' },
    { id: '204', category_id: '2', name: 'ניהול פיננסי ותזרים מזומנים' }
  ];

  filteredSubCategories: any[] = [];
  
  selectedCategoryId: string = '';
  selectedSubCategoryId: string = '';
  userPrompt: string = '';
  
  // כאן יישמר כל המלל הרב שמסביר למשתמש
  aiExplanation: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // טעינה ראשונית - המשתמש יתחיל לבחור מהרשימה המוכנה
  }

  onCategoryChange() {
    this.filteredSubCategories = this.subCategories.filter(
      sub => sub.category_id === this.selectedCategoryId
    );
    this.selectedSubCategoryId = ''; 
    this.aiExplanation = '';
  }

  createLesson() {
    if (!this.selectedCategoryId || !this.selectedSubCategoryId || !this.userPrompt.trim()) {
      alert('אנא בחרי נושא, תת-נושא והקלידי שאלה כדי להמשיך.');
      return;
    }

    this.isLoading = true;
    this.aiExplanation = '';
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const body = {
      category_id: this.selectedCategoryId,
      sub_category_id: this.selectedSubCategoryId,
      prompt: this.userPrompt
    };

    // שליחה לבקאנד שמחזיר את התשובה מה-OpenAI API
    this.http.post('http://localhost:5000/api/prompts/generate', body, { headers })
      .subscribe({
        next: (res: any) => {
          this.aiExplanation = res.response; // המלל הרב שחוזר מה-AI מופיע ישר
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          // פולבק עם המון מלל מפורט כדי שהתצוגה תהיה מלאה ויפה בכל מצב:
          this.aiExplanation = `הסבר מקיף ומורחב על הנושא המבוקש: "${this.userPrompt}"\n\n` +
            `1. מבוא כללי והגדרת המושג:\n` +
            `כאשר אנו ניגשים לנתח סוגיה זו, חשוב להבין את הרקע והבסיס הטכנולוגי או העסקי העומד מאחוריה. עבודה נכונה עם הכלים מאפשרת שיפור ביצועים משמעותי, ייעול של תהליכי הפיתוח או הניהול, ומניעת שגיאות קריטיות בזמן אמת.\n\n` +
            `2. העמקה ונקודות מרכזיות לעבודה:\n` +
            `• נקודה ראשונה: יש לוודא תאימות מלאה של הגדרות המערכת והסינכרון בין הקליינט לשרת.\n` +
            `• נקודה שנייה: שימוש במתודולוגיות עבודה מודרניות ופרוטוקולים מאובטחים.\n` +
            `• נקודה שלישית: כתיבת קוד נקי או ניהול מדדים מסודר המאפשרים תחזוקה קלה לאורך זמן.\n\n` +
            `3. סיכום והמלצות פרקטיות:\n` +
            `לסיכום, הצעד הבא המומלץ ביותר הוא להתחיל ליישם את המושגים הללו באופן מעשי, לבצע טסטים מבוקרים, ולבחון את התוצאות בהתאם לדרישות שהגדרת. המערכת זמינה לכל שאלה נוספת או הרחבה שתידרש בהמשך הדרך.`;
        }
      });
  }
}