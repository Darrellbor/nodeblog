import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { BlogResolverService } from './guards/blogs-resolver.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { BlogDetailsComponent } from './components/blog-details/blog-details.component'
import { ProfileComponent } from './components/profile/profile.component'

const routes: Routes = [
   { path: '', component: HomeComponent, resolve: { blogs: BlogResolverService } },
   { path: 'dashboard', component: ProfileComponent, canActivate: [AuthGuard] },
   { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
   { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
   { path: 'blog/:id', component: BlogDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}