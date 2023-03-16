import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Question1Service } from '../services/question1.service';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
	selector: 'app-rubrique1',
	templateUrl: './rubrique1.component.html',
	styleUrls: ['./rubrique1.component.css'],
	animations: [
		trigger('fade', [ 
		  transition('void => *', [
			style({ opacity: 0 }), 
			animate(2000, style({opacity: 1}))
		  ]) 
		])
	  ]
})
export class Rubrique1Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;

	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = ["question1"]
	modules = ["Referentiel", "Synthese", "Contextualisation", "Algorithmes", "Annales"]
	module: string
	isModule = false
	promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
	sum: number
	display= "none"
	constructor(private question1Service: Question1Service) {
		this.question1Service.resetModule()
		
	}
	
	
	openModal() {
		this.display = "block";
	}
	onCloseHandled() {
		this.display = "none";
	}

	selectModule(e) {
		this.comment.nativeElement.style.display = 'none'
		this.textarea.nativeElement.value = ""
		this.isChart = true
		this.sum = null
		this.select2.nativeElement.value = "Choisir une promotion"
		this.question1Service.resetYear()
		this.question1Service.selectModule(e.target.value)
		this.question1Service.question()
		this.bar = this.question1Service.bar
		this.sum = this.question1Service.sum
	}

	selectYear(e) {
		this.comment.nativeElement.style.display = 'none'
		this.textarea.nativeElement.value = ""
		this.isChart = true
		this.sum = null
		this.select1.nativeElement.value = "Choisir une modalité"
		this.question1Service.resetModule()
		this.question1Service.selectYear(e.target.value)
		this.question1Service.question()
		this.bar = this.question1Service.bar
		this.sum = this.question1Service.sum
	}

	addComment() {
		if (this.comment) {
			this.comment.nativeElement.style.display = 'block'
			this.textarea.nativeElement.focus()
		}
	}

	closeComment() {
		if (this.comment) {
			this.comment.nativeElement.style.display = 'none'
			this.textarea.nativeElement.value = ""
		}
	}

	// resetModule() {
	// 	this.select.nativeElement.value = "Choisir un module"
	// 	this.module = null
	// 	this.bar = {}

	// 	if (this.questionNBR == "question1") {
	// 		this.question1Service.resetModule()
	// 		this.question(this.questionNBR)
	// 	}
	// }
}
