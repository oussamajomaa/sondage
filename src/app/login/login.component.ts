import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	email: string
	password: string
	hide = true;
	token: string
	constructor(public auth: AuthService) {
	 }

	login() {
		const user = {
			email: this.email,
			password: this.password
		}
		this.auth.login(user)
	}
}
