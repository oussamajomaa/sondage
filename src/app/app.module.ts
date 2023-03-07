import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpenQuestionComponent } from './open-question/open-question.component';
import { HomeComponent } from './home/home.component';
import { Rubrique2Component } from './rubrique2/rubrique2.component';
import { Rubrique3Component } from './rubrique3/rubrique3.component';
import { Rubrique4Component } from './rubrique4/rubrique4.component';
import { Rubrique5Component } from './rubrique5/rubrique5.component';
import { Rubrique6Component } from './rubrique6/rubrique6.component';
import { Rubrique7Component } from './rubrique7/rubrique7.component';
import { Rubrique8Component } from './rubrique8/rubrique8.component';
import { Rubrique1Component } from './rubrique1/rubrique1.component';
import { LoginComponent } from './login/login.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalComponent } from './modal/modal.component';
import { CommentComponent } from './comment/comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	declarations: [
		AppComponent,
		OpenQuestionComponent,
		HomeComponent,
		Rubrique2Component,
		Rubrique3Component,
		Rubrique4Component,
		Rubrique5Component,
		Rubrique6Component,
		Rubrique7Component,
		Rubrique8Component,
		Rubrique1Component,
		LoginComponent,
  ModalComponent,
  CommentComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		MatTooltipModule,
		NgxEchartsModule.forRoot({
			echarts: () => import('echarts'),
		}),
		NgbModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
