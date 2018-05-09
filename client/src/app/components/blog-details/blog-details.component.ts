import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  id:string;
  blog:Blog;

  constructor(private blogService:BlogService,
              public authService:AuthService,
              private router:Router,
              private route:ActivatedRoute,
              private flashMessages:FlashMessagesService) { }

  ngOnInit() {
    this.route.params
      .subscribe((res) => {
        this.id = res.id;
        this.blogService.getBlogById(this.id)
          .subscribe((res) => {
            this.blog = res;
          }, (err) => {
            let val = JSON.parse(err._body);    
            this.flashMessages.show(val.message, {cssClass: 'alert-danger', timeout: 5000});
          });
      });
    
  }

  likeBlog() {
    this.blogService.likeBlog(this.id)
          .subscribe((res) => {
              this.blog.totalLikes = this.blog.totalLikes + 1;
          }, (err) => {
            let val = JSON.parse(err._body);    
            this.flashMessages.show(val.message, {cssClass: 'alert-danger', timeout: 5000});
          });
  }

}
