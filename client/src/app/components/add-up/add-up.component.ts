import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-up',
  templateUrl: './add-up.component.html',
  styleUrls: ['./add-up.component.css']
})
export class AddUpComponent implements OnInit {

  blog = {
    title: '',
    preview: '',
    categories: '',
    content: ''
  };

  constructor(public blogService:BlogService,
              private flashMessages:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
  }

  createBlog({value, valid}) {
    console.log(valid);
    
    if(!valid) {
      this.flashMessages.show('Invalid form submission!', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      this.blogService.postBlog(value)
        .subscribe(res => {
            this.flashMessages.show('Blog successfully created!', {cssClass: 'alert-success', timeout: 4000});
            this.blog = {
              title: '',
              preview: '',
              categories: '',
              content: ''
            };
        },(err) => {
          let val = JSON.parse(err._body);
          this.flashMessages.show(val.message, {cssClass: 'alert-danger', timeout: 5000});
        });
    }
  }

}
