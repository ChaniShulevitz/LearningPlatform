import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.isAdmin === true;
  }
  logout() {
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}