import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const token = cookieService.get('tasty-cookies'); // Имя куки с токеном

  if (token) {
    return true; // Доступ разрешен
  } else {
    router.navigate(['/login']); // Если нет токена, отправляем на логин
    return false;
  }
};
