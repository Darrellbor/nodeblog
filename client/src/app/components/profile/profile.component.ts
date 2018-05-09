import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(public authService:AuthService,
              private flashMessages:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe((res) => {
        this.user = res;
      }, (err) => {
        let val = JSON.parse(err._body);    
        this.flashMessages.show(val.message, {cssClass: 'alert-danger', timeout: 5000});  
        this.authService.logOut();
        this.router.navigate(['/login']);
      });
  }

}
