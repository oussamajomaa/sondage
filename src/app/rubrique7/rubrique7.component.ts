import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { Question9Service } from '../services/question9.service';
import { ManyResponseService } from '../services/many-response.service';
import { Question1Service } from '../services/question1.service';

@Component({
	selector: 'app-rubrique7',
	templateUrl: './rubrique7.component.html',
	styleUrls: ['./rubrique7.component.css']
})
export class Rubrique7Component {
	@ViewChild('select') select: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = ["question31", "question32", "question33", "question34", "question35"]
	modules = []
	module: string
	isModule = false

	constructor(
		private question1Service: Question1Service,

	) {
		this.question1Service.resetModule()
	}

	question(nbr) {
		// if (this.select && this.questionNBR != nbr) this.resetModule()
		this.questionNBR = nbr
		this.isChart = true

		if (this.questionNBR == "question1") {
			this.isModule = true
			this.modules = ["Referentiel", "Synthese", "Contextualisation", "Algorithmes", "Annales"]
			this.question1Service.question()
			this.bar = this.question1Service.bar
		}
	}

	selectModule(e) {
		this.module = e.target.value
		console.log(this.module);
		console.log(this.questionNBR);


		if (this.questionNBR == "question1") {
			this.question1Service.selectModule(this.module)
			this.question(this.questionNBR)
		}
	}

	resetModule() {
		this.select.nativeElement.value = "Choisir un module"
		this.module = null
		this.bar = {}

		if (this.questionNBR == "question1") {
			this.question1Service.resetModule()
			this.question(this.questionNBR)
		}
	}
}
