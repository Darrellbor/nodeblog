import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  url:string = 'http://localhost:3000/';
  authToken;
  options;

  createHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+this.authToken
      })
    });
  }

  constructor(private http:Http) { }

  registerUser(user) {
    this.createHeaders();
    return this.http.post(this.url+'api/user/register', user, this.options)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  loginUser(user) {
    this.createHeaders();
    return this.http.post(this.url+'api/user/login', user, this.options)
      .map(res => res.json());
  }

  getProfile() {
    this.createHeaders();
    return this.http.get(this.url+'api/user/profile', this.options)
      .map(res => res.json());
  }

  logOut() {
    this.authToken = null;
    localStorage.removeItem('token');
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  storeUserToken(token) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  notAuthorized() {
    this.loadToken();
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(this.authToken);
    return isExpired;
  }

  decodedJwt() {
    this.loadToken();
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(this.authToken);
    const expirationDate = helper.getTokenExpirationDate(this.authToken);
    
    return decodedToken;
  }

  /*private handleError(error: any) { 
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }*/

}
