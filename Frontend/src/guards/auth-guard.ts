import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const token = localStorage.getItem('token');

  if (!token) {
    alert('Login required ❌');
    return false;
  }

  return true;
};