import { CanMatchFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanMatchFn = (route, state) => {
  const svs = inject(AuthService);
  return svs.loggedIn$;
};
