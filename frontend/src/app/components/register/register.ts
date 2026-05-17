import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  message = '';
  isSuccess = false;

  constructor(private http: HttpClient) {}

  onRegister() {
    this.http.post('http://localhost:5000/api/users/register', this.userData)
      .subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.message = ' נרשמת בהצלחה רבה!';
          this.userData = { name: '', email: '', password: '', phone: '' };
        },
        error: (err) => {
          this.isSuccess = false;
          this.message = err.error?.message || ' אופס, משהו השתבש';
        }
      });
  }
}