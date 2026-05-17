import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CoursesComponent implements OnInit {
  // רשימת נושאים מרכזיים מורחבת
  categories: any[] = [
    { id: '1', name: '💻 פיתוח תוכנה וטכנולוגיה' },
    { id: '2', name: '🛡️ סייבר ואבטחת מידע' },
    { id: '3', name: '🎨 עיצוב גרפי ו-UX/UI' },
    { id: '4', name: '📈 שיווק דיגיטלי ומסחר' },
    { id: '5', name: '💰 פיננסים ושוק ההון' },
    { id: '6', name: '💄 ביוטי ואיפור מקצועי' }
  ];

  // רשימת תתי-נושאים ממוקדים
  subCategories: any[] = [
    // פיתוח
    { id: '101', category_id: '1', name: 'Angular & Frontend' },
    { id: '102', category_id: '1', name: 'בינה מלאכותית ו-Python' },
    { id: '103', category_id: '1', name: 'Node.js & Backend' },
    // סייבר
    { id: '201', category_id: '2', name: 'בדיקות חוסן (Penetration Testing)' },
    { id: '202', category_id: '2', name: 'הגנת רשתות ומערכות הפעלה' },
    // עיצוב
    { id: '301', category_id: '3', name: 'עיצוב אפליקציות ב-Figma' },
    { id: '302', category_id: '3', name: 'מילון המותג ועיצוב גרפי' },
    // שיווק
    { id: '401', category_id: '4', name: 'ניהול קמפיינים ממומנים' },
    { id: '402', category_id: '4', name: 'שיווק באמצעות תוכן ו-AI' },
    // פיננסים
    { id: '501', category_id: '5', name: 'מבוא לניתוח טכני ומניות' },
    { id: '502', category_id: '5', name: 'יזמות וגיוס הון לסטארטאפים' },
    // איפור
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
    if (!this.userPrompt.trim()) {
      alert('אנא הקלד שאלה או נושא להסבר.');
      return;
    }

    this.isLoading = true;
    this.aiExplanation = '';
    
    setTimeout(() => {
      this.isLoading = false;
      const promptLower = this.userPrompt.toLowerCase();

      if (promptLower.includes('פייתון') || promptLower.includes('מחלקה') || this.selectedSubCategoryId === '102') {
        this.aiExplanation = `
        📌 מנוע ה-AI ניתח את השאלה שלך על פייתון: "${this.userPrompt}"

        📍 פרק 1: מהי מחלקה (Class) בפייתון?
        מחלקה היא למעשה "תבנית" או תוכנית עבודה ליצירת אובייקטים. היא מאפשרת לאסוף משתנים (תכונות) ופונקציות (פעולות) תחת קורת גג אחת, המייצגת ישות מהעולם האמיתי.

        📍 פרק 2: איך כותבים מחלקה בצורה נכונה?
        נשתמש במילת המפתח 'class'. בתוך המחלקה, נגדיר את פונקציית האתחול המיוחדת '__init__' שמקבלת תמיד את הפרמטר 'self' כדי לייצג את האובייקט הנוכחי שנוצר.

        📍 פרק 3: דוגמת קוד מעשית
        class Car:
            def __init__(self, brand):
                self.brand = brand
        
        my_car = Car("Tesla")

        🏁 סיכום: שימוש במחלקות משפר את ארגון הקוד, מונע שכפול קוד מיותר ומאפשר פיתוח מערכות מורכבות בקלות.
        `;
      } 
      else if (promptLower.includes('איפור') || promptLower.includes('ערב') || this.selectedCategoryId === '6') {
        this.aiExplanation = `
        📌 מנוע ה-AI ניתח את הדילמה המקצועית שלך: "${this.userPrompt}"

        📍 פרק 1: בסיס והכנת העור (Prepping)
        הסוד לאיפור ערב עמיד מתחיל בניקוי עמוק של העור והנחת סרומים מותאמים, ולאחר מכן פריימר ייחודי הסוגר נקבוביות ומאזן את הפרשת הסבום.

        📍 פרק 2: טכניקות הצללה ועמידות גבוהה
        בעבודה על איפור ערב, יש לבצע קיבוע אסטרטגי באמצעות פודרה בתפזורת (Loose Translucent Powder) בטכניקת Baking באזורים כמו מתחת לעיניים ובאזור ה-T.

        🏁 סיכום: שילוב נכון של הכנת העור וקיבוע מקצועי יבטיחו מראה זוהר, הרמוני ועמיד לאורך זמן.
        `;
      } 
      else {
        this.aiExplanation = `
        📌 ניתוח AI כללי עבור הנושא המבוקש: "${this.userPrompt}"
        
        הנושא שציינת דורש הבנה מעמיקה של עקרונות היסוד ואינטגרציה חלקה בין חלקי המערכת השונים כדי להגיע לתוצאה מקצועית ויציבה.
        `;
      }

      this.myHistory.unshift({
        prompt: this.userPrompt,
        response: this.aiExplanation,
        created_at: new Date()
      });

    }, 1200);
  }
}