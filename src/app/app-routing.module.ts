import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { OpenQuestionComponent } from './open-question/open-question.component';
import { Rubrique1Component } from './rubrique1/rubrique1.component';
import { Rubrique2Component } from './rubrique2/rubrique2.component';
import { Rubrique3Component } from './rubrique3/rubrique3.component';
import { Rubrique4Component } from './rubrique4/rubrique4.component';
import { Rubrique5Component } from './rubrique5/rubrique5.component';
import { Rubrique6Component } from './rubrique6/rubrique6.component';
import { Rubrique7Component } from './rubrique7/rubrique7.component';
import { Rubrique8Component } from './rubrique8/rubrique8.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'open', component:OpenQuestionComponent},
  // {path:'many-reponse', component:ManyReponseComponent},
  // {path:'many-module', component:ManyModuleComponent},
  // {path:'one-module', component:OneModuleComponent},
  {path:'rubrique1', component:Rubrique1Component},
  {path:'rubrique2', component:Rubrique2Component},
  {path:'rubrique3', component:Rubrique3Component},
  {path:'rubrique4', component:Rubrique4Component},
  {path:'rubrique5', component:Rubrique5Component},
  {path:'rubrique6', component:Rubrique6Component},
  {path:'rubrique7', component:Rubrique7Component},
  {path:'rubrique8', component:Rubrique8Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
