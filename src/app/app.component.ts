import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
// import {TooltipPosition} from '@angular/material/tooltip';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'sondage';
	isMenuCollapsed = true
	constructor(public auth:AuthService){}
}
