import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div class="container">
    <div class="card">

      <h2>{{isLogin ? 'Login' : 'Register'}}</h2>

      <input [(ngModel)]="username" placeholder="Username" />
      <input [(ngModel)]="password" type="password" placeholder="Password" />

      <button (click)="submit()">
        {{isLogin ? 'Login' : 'Register'}}
      </button>

      <p (click)="toggle()" class="toggle">
        {{isLogin ? 'Create account' : 'Already have account? Login'}}
      </p>

    </div>
  </div>
  `,
  styles: [`
    .container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      width: 300px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }

    input {
      width: 100%;
      margin: 10px 0;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    button {
      width: 100%;
      padding: 10px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .toggle {
      margin-top: 10px;
      color: #667eea;
      cursor: pointer;
    }
  `]
})
export class LoginComponent {

  username = '';
  password = '';
  isLogin = true;

  constructor(private auth: AuthService, private router: Router) {}

  toggle() {
    this.isLogin = !this.isLogin;
  }

  submit() {
  if (this.isLogin) {

    console.log('Login clicked');

    // ✅ Clear old token (IMPORTANT)
    localStorage.removeItem('token');

    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('LOGIN RESPONSE:', res);

        const token = res.token || res.data?.token;

        if (!token) {
          alert('Login failed ❌ No token received');
          return;
        }

        // ✅ Save new token
        this.auth.saveToken(token);

        console.log('New token saved');

        // ✅ Navigate + reload to update role/navbar
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/home']);
});
      },

      error: (err) => {
        console.error('LOGIN ERROR:', err);
        alert('Login failed ❌ API error');
      }
    });

  } else {

    this.auth.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Registered ✅ Please login');
        this.isLogin = true;
      },
      error: () => {
        alert('Registration failed ❌');
      }
    });

  }
}
}