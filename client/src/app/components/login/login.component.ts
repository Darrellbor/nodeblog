import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private flashMessages:FlashMessagesService,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  login({value, valid}) {
    if(!valid) {
      this.flashMessages.show('Invalid form submission!', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      this.authService.loginUser(value)
        .subscribe(res => {
            this.authService.storeUserToken(res.token);
            this.flashMessages.show('Login Successful', {cssClass: 'alert-success', timeout: 4000});
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
        },(err) => {
          let val = JSON.parse(err._body);
          this.flashMessages.show(val.message, {cssClass: 'alert-danger', timeout: 5000});
        });
    }
  }

}
