import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('tasty-cookies');
    // URL, для которых не требуется токен
    const excludedUrls = ['/login', '/register'];

    // Проверяем, содержит ли URL исключенные пути
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
  if (token) {
    req = req.clone({

      setHeaders: {'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
