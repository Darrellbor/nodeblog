import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { BlogService } from '../services/blog.service';
import { Blog } from '../models/Blog';

@Injectable()
export class BlogResolverService {

    blogVariants:Blog[] = [];
    blogVariantsOut:Blog[] = [];

    getBlogs() {
        this.blogService.getAllBlogs("api/blogs?sort=-totalLikes&count=1")
               .subscribe((res) => {
                 this.blogVariants.push(res);
               });

        this.blogService.getAllBlogs("api/blogs?sort=-totalLikes&count=1&offset=1")
               .subscribe((res) => {
                 this.blogVariants.push(res);
               });

        this.blogService.getAllBlogs("api/blogs?count=1")
               .subscribe((res) => {
                 this.blogVariants.push(res);
               });

        this.blogService.getAllBlogs("api/blogs?offset=1")
               .subscribe((res) => {
                 this.blogVariants.push(res);
               });
    }

  constructor(private blogService: BlogService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    this.getBlogs();
    this.blogVariantsOut = this.blogVariants;
    this.blogVariants = [];
    return this.blogVariantsOut;
  }

}
