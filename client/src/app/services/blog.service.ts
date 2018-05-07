import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Blog } from '../models/Blog';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  constructor(private http:Http) { }

  url:string = "http://localhost:3000/";

  getAllBlogs(url) {
    return this.http.get(this.url+url)
      .map(res => res.json());
  }

}
