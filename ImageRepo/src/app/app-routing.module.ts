import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddImageComponent } from './components/add-image/add-image.component';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { LoggedinGuard } from './guards/loggedin.guard';
import { LoggedoutGuard } from './guards/loggedout.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-image', component: AddImageComponent, canActivate: [LoggedinGuard] },
  { path: 'image/:id', component: ImageComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedoutGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedoutGuard] },
  { path: 'user', component: UserComponent, canActivate: [LoggedinGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
