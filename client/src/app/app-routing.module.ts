import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { BlogResolverService } from './guards/blogs-resolver.service';
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
   { path: '', component: HomeComponent, resolve: { blogs: BlogResolverService } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}