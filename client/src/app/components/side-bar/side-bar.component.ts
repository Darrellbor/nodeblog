import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private flashMessages:FlashMessagesService) { }

  ngOnInit() {
  }

  logOut() {
    let r = confirm("Logging out, click ok to continue.");

    if(r) {
      this.authService.logOut();
      this.flashMessages.show('Logged out successfully', {cssClass: 'alert-info', timeout: 5000});
      this.router.navigate(['/login']);
    }
  }

}
