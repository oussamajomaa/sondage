import { Component, ElementRef, ViewChild } from '@angular/core';
import { Question2Service } from '../services/question2.service';
import { EChartsOption } from 'echarts';
import { Question3Service } from '../services/question3.service';
import { OneModuleService } from '../services/one-module.service';

@Component({
	selector: 'app-rubrique2',
	templateUrl: './rubrique2.component.html',
	styleUrls: ['./rubrique2.component.css']
})
export class Rubrique2Component {
	@ViewChild('select') select: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	// questions = ["question2", "question3", "question4", "question5"]
	questions = ["question5"]
	modules = []
	module: string
	isModule = false

	constructor(
		private question2Service: Question2Service,
		private question3Service: Question3Service,
		private oneModule: OneModuleService,

	) { 
		console.log(this.bar);
		this.question2Service.resetModule()
		this.question3Service.resetModule()
		
	}

	question(nbr) {
		if (this.select && this.questionNBR != nbr) this.resetModule()
		this.questionNBR = nbr
		this.isChart = true
		
		if (this.questionNBR == "question2") {
			this.isModule = true
			this.modules = ["Ouvrages nationaux", "Polycopie local", "Roneo etudiants", "Diaporama du cours", "Video des cours", "Capsules"]
			this.question2Service.question()
			this.bar = this.question2Service.bar
		}
		if (this.questionNBR == "question3") {
			this.isModule = true
			this.modules = [
				"Referentiel", "Polycopie enseignants", "Roneo etudiants", "Diaporama du cours",
				"Supports conférences privées", "Enregistrement des cours", "Capsules",
				"Notes personnelles ED", "Internet"
			]
			this.question3Service.question()
			this.bar = this.question3Service.bar
		}
		if (this.questionNBR == "question4" || this.questionNBR == "question5"){
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
		}	
	}

	selectModule(e) {
		this.module = e.target.value
		
		if (this.questionNBR == "question2") {
			this.question2Service.selectModule(this.module)
			this.question(this.questionNBR)
		}
		if (this.questionNBR == "question3") {
			this.question3Service.selectModule(this.module)
			this.question(this.questionNBR)
		}
	}

	resetModule() {
		this.select.nativeElement.value = "Choisir un module"
		this.module = null
		this.bar = {}
		
		if (this.questionNBR == "question2") {
			this.question2Service.resetModule()
			this.question(this.questionNBR)
		}
		if (this.questionNBR == "question3") {
			this.question3Service.resetModule()
			this.question(this.questionNBR)
		}
	}
}
