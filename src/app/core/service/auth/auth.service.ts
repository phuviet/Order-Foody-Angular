import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  private logger = new Subject<boolean>();
  referralRoute: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router
  ) {}

  authenticator(): Observable<boolean> {
    return this.logger.asObservable();
  }

  login(data: any) {
    //localStorage.setItem('token', jwt);
    this.storeUserInformation(data);
    this.logger.next(true);
    let info = this.getUserInfo();
    this.redirectToPrevStep();
  }

  logout() {
    //localStorage.removeItem('token');
    this.destroyUserInformation();
    this.logger.next(false);
    this.redirectToLogin();
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    let isAuthenticated: boolean;
    if (this.isTokenInvalid() || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
    return isAuthenticated;
  }

  storeUserInformation(data: any) {
    if (data) {
      localStorage.setItem('token', data.access_token);
    } else {
      this.logger.next(false);
    }
  }

  destroyUserInformation() {
    localStorage.removeItem('token');
  }

  getUserInfo() {
    let token = localStorage.getItem('token');
    let userInfo: any = {};
    if (token) {
      userInfo = this.jwtHelper.decodeToken(token);
    }
    return userInfo.user || {};
  }

  getUserPermission() {
    return JSON.parse(localStorage.getItem('permissions') || '[]');
  }

  getUserOrganization() {
    return JSON.parse(localStorage.getItem('organizations') || '{}');
  }

  isTokenInvalid() {
    let token = localStorage.getItem('token');
    if (!token) {
      return true
    } else {
      let parts = token.split('.');
      if (parts.length !== 3) {
        return true
      }
    }
    return false;
  }

  /**
   * Helper method for set up referral route, enable useful redirect after login
   * @method setRoute
   * @param  {string} route Route as defined in app.routes, eg. /user/1
   */
  setRoute(route: string): void {
    this.referralRoute = route;
  }

  redirectToPrevStep() {
    // let route = this.referralRoute ? this.referralRoute : '/homepage';
    this.router.navigateByUrl('/homepage');
  }

  redirectToLogin(current: string = '/') {
    // Store current url as referral and use latter for login redirection
    // this.setRoute(current);
    this.router.navigate(['/auth/login']);
  }

  redirectTo(path: string = '') {
    // Store current url as referral and use latter for login redirection
    this.router.navigate([path]);
  }

}
