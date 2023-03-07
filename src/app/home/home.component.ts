import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	questionNBR: string
	questions = [
		"Contexte et objectifs du sondage", 
		"Présentation du questionnaire", 
		"Déroulé du sondage", 
		"Analyse & Méthodes"
	]

	question(q){
		this.questionNBR = q
	}

}
