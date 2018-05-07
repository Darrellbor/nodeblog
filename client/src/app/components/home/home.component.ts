import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/Blog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs:Blog[];

  constructor(private blogService:BlogService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.blogs = res.blogs;
        console.log(this.blogs);
        
      });
  }

}
