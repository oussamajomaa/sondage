import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { Question9Service } from '../services/question9.service';
import { ManyResponseService } from '../services/many-response.service';
import { Question1Service } from '../services/question1.service';

@Component({
	selector: 'app-rubrique6',
	templateUrl: './rubrique6.component.html',
	styleUrls: ['./rubrique6.component.css']
})
export class Rubrique6Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = ["question28", "question29", "question30"]
	modules = []
	module: string
	isModule = false
	sum:number
	
	constructor(
		private question1Service: Question1Service,

	) { 
		this.question1Service.resetModule()		
	}

	question(nbr) {
		// if (this.select && this.questionNBR != nbr) this.resetModule()
		this.questionNBR = nbr
		this.isChart = true
		this.sum = null
		this.resetComment()
		if (this.questionNBR == "question1"){
			this.isModule = true
			this.modules = ["Referentiel", "Synthese", "Contextualisation", "Algorithmes", "Annales"]
			this.question1Service.question()
			this.bar = this.question1Service.bar
		}
	}

	resetComment(){
		this.comment.nativeElement.style.display = 'none'
		this.textarea.nativeElement.value = ""
	}
	
	addComment(){
		if (this.comment) {
			this.comment.nativeElement.style.display = 'block'
			this.textarea.nativeElement.focus()
		}
	}

	closeComment(){
		if (this.comment) {
			this.resetComment()
		}
	}
}
