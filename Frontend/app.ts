import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar" *ngIf="isLoggedIn()">

  <!-- 👤 USER MENU -->
  <ng-container *ngIf="!isAdmin">
    <a routerLink="/home">Home</a>
    <a routerLink="/cart">Cart</a>
  </ng-container>

  <!-- 👨‍💼 ADMIN MENU -->
  <ng-container *ngIf="isAdmin">
    <a routerLink="/admin/category">Category</a>
    <a routerLink="/admin/brand">Brand</a>
    <a routerLink="/admin/product">Product</a>
    <a routerLink="/admin/inventory">Inventory</a>
  </ng-container>

  <button (click)="logout()">Logout</button>

</nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      background: #333;
      padding: 10px;
      display: flex;
      gap: 15px;
      color: white;
    }

    a {
      color: white;
      text-decoration: none;
    }

    button {
      margin-left: auto;
      background: red;
      color: white;
      border: none;
      padding: 5px 10px;
    }
  `]
})
export class App {

  isAdmin = false;

  constructor(private auth: AuthService) {
    this.isAdmin = this.auth.getRole() === 'Admin';
  }

  isLoggedIn() {
    return !!this.auth.getToken();
  }

  logout() {
  localStorage.removeItem('token');

  // ✅ redirect to login page
  window.location.href = '/';
}
}