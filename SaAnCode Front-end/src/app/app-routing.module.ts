import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { ProblemsListComponent } from './problems-list/problems-list.component';

const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path:'', component:SigninComponent},
  {path:'profile', component:ProfileComponent},
  {path:'post/question', component:PostQuestionComponent},
  {path:'problems',component:ProblemsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
