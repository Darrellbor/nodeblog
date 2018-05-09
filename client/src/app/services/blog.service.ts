import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Blog } from '../models/Blog';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  constructor(private http:Http,
              private authService:AuthService) { }

  url:string = "http://localhost:3000/";

  getAllBlogs(url) {
    return this.http.get(this.url+url)
      .map(res => res.json());
  }

  postBlog(blog) {
    this.authService.createHeaders();
    return this.http.post(this.url+'api/blogs', blog, this.authService.options)
      .map(res => res.json());
  }

  getBlogById(id) {
    return this.http.get(this.url+'api/blog/'+id)
      .map(res => res.json());
  }

  likeBlog(id) {
    this.authService.createHeaders();
    return this.http.put(this.url+'api/blog/'+id, {"like": 1}, this.authService.options)
      .map(res => res.json());
  }

}
