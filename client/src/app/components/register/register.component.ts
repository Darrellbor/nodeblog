import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  }
  constructor(private flashMessages:FlashMessagesService,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  register({value, valid}) {
    if(!valid) {
      this.flashMessages.show('Invalid form submission!', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      this.authService.registerUser(value)
        .subscribe(res => {
            this.flashMessages.show('Your account was succesfully created, please sign in to continue', {cssClass: 'alert-success', timeout: 8000});
            this.router.navigate(['/login']);
        },(err) => {
          let val = JSON.parse(err._body);
          this.flashMessages.show(val.message, {cssClass: 'alert-danger', timeout: 5000});
        });
    }
  }

}
