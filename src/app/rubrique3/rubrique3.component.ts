import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { Question9Service } from '../services/question9.service';
import { ManyResponseService } from '../services/many-response.service';

@Component({
	selector: 'app-rubrique3',
	templateUrl: './rubrique3.component.html',
	styleUrls: ['./rubrique3.component.css']
})
export class Rubrique3Component {
	@ViewChild('select') select: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	// questions = [
	// 	"question6", "question7", "question8", "question9", "question10",
	// 	"question11", "question12", "question13", "question14", "question15"
	// ]
	questions = [
		"question8"
	]
	modules = []
	module: string
	isModule = false

	constructor(
		private question9Service: Question9Service,
		private oneModule: OneModuleService,
		private manyReponse: ManyResponseService,

	) { 
		this.question9Service.resetModule()		
	}

	question(nbr) {
		if (this.select && this.questionNBR != nbr) this.resetModule()
		this.questionNBR = nbr
		this.isChart = true
		
		if (this.questionNBR == "question9") {
			this.isModule = true
			this.modules = [
				"Nombre heures trop important", "Faible valeur ajoutée", "Perte temps transports", "Accès ressources internet",
				"Rester concentre plus 2 heures", "Stage journée complète",
			]
			this.question9Service.question()
			this.bar = this.question9Service.bar
		}
		
		if (this.questionNBR == "question6" || this.questionNBR == "question7" || this.questionNBR == "question10" || this.questionNBR == "question11" || this.questionNBR == "question12" || this.questionNBR == "question15"){
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
		}
		
		if (this.questionNBR == "question8" || this.questionNBR == "question13" || this.questionNBR == "question14") {
			this.isModule = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
		}
	}

	selectModule(e) {
		this.module = e.target.value
		console.log(this.module);
		console.log(this.questionNBR);
		
		
		if (this.questionNBR == "question9") {
			this.question9Service.selectModule(this.module)
			this.question(this.questionNBR)
		}
	}

	resetModule() {
		this.select.nativeElement.value = "Choisir un module"
		this.module = null
		this.bar = {}
		
		if (this.questionNBR == "question9") {
			this.question9Service.resetModule()
			this.question(this.questionNBR)
		}
	}
}
