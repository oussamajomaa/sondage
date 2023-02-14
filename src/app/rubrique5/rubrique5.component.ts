import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { Question9Service } from '../services/question9.service';
import { ManyResponseService } from '../services/many-response.service';

@Component({
	selector: 'app-rubrique5',
	templateUrl: './rubrique5.component.html',
	styleUrls: ['./rubrique5.component.css']
})
export class Rubrique5Component {
	@ViewChild('select') select: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	// questions = ["question24", "question25", "question26", "question27"]
	questions = ["question24"]
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
		// if (this.select && this.questionNBR != nbr) this.resetModule()
		this.questionNBR = nbr
		this.isChart = true
		
		if (this.questionNBR == "question24" || this.questionNBR == "question25"){
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
		}
		
		if (this.questionNBR == "question26" || this.questionNBR == "question27") {
			this.isModule = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
		}
	}

	// selectModule(e) {
	// 	this.module = e.target.value
	// 	console.log(this.module);
	// 	console.log(this.questionNBR);
		
		
	// 	if (this.questionNBR == "question9") {
	// 		this.question9Service.selectModule(this.module)
	// 		this.question(this.questionNBR)
	// 	}
	// }

	// resetModule() {
	// 	this.select.nativeElement.value = "Choisir un module"
	// 	this.module = null
	// 	this.bar = {}
		
	// 	if (this.questionNBR == "question9") {
	// 		this.question9Service.resetModule()
	// 		this.question(this.questionNBR)
	// 	}
	// }
}
