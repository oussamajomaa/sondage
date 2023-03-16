import { Component, ElementRef, ViewChild } from '@angular/core';
import { Question2Service } from '../services/question2.service';
import { EChartsOption } from 'echarts';
import { Question3Service } from '../services/question3.service';
import { OneModuleService } from '../services/one-module.service';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
	selector: 'app-rubrique2',
	templateUrl: './rubrique2.component.html',
	styleUrls: ['./rubrique2.component.css'],
	animations: [
		trigger('fade', [ 
		  transition('void => *', [
			style({ opacity: 0 }), 
			animate(2000, style({opacity: 1}))
		  ]) 
		])
	  ]
})
export class Rubrique2Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;

	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = ["question2", "question3", "question4", "question5"]
	// questions = ["question2", "question4"]	
	
	
	modules = []
	module: string
	year:string
	isModule = false
	promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
	sum:number
	dataTitle = [
		// "Quelle est votre appréciation sur les divers types de ressources/supports ?",
		// "Quelle est votre appréciation?"
	]

	constructor(
		private question2Service: Question2Service,
		private question3Service: Question3Service,
		private oneModule: OneModuleService,

	) { 
		
	}

	question(nbr) {
		this.isChart = true
		this.sum = null
		if (this.select1 && this.questionNBR != nbr) this.resetModule()
		if (this.select2 && this.questionNBR != nbr) this.resetYear()
		
		if (this.questionNBR != nbr) {			
			this.bar = {}
		}
		this.questionNBR = nbr
		
		this.resetComment()
		
		if (this.questionNBR == "question2") {
			this.isModule = true
			this.modules = ["Ouvrages nationaux", "Polycopie local", "Roneo etudiants", "Diaporama du cours", "Video des cours", "Capsules"]
		}

		if (this.questionNBR == "question3") {
			this.isModule = true
			this.modules = [
				"Referentiel", "Polycopie enseignants", "Roneo etudiants", "Diaporama du cours",
				"Supports conférences privées", "Enregistrement des cours", "Capsules",
				"Notes personnelles ED", "Internet"
			]
			
		}
		if (this.questionNBR == "question4" || this.questionNBR == "question5"){
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
		}	
		
	}

	display = "none";
	openModal() {
		this.display = "block";
	}
	onCloseHandled() {
		this.display = "none";
	}

	selectModule(e) {
		this.resetComment()
		this.resetYear()
		this.module = e.target.value
		this.sum = null
		
		if (this.questionNBR == "question2") {
			this.question2Service.selectModule(this.module)
			this.question2Service.question()
			this.bar = this.question2Service.bar
			this.sum = this.question2Service.sum
		}
		if (this.questionNBR == "question3") {
			this.question3Service.selectModule(this.module)
			this.question3Service.question()
			this.bar = this.question3Service.bar
			this.sum = this.question3Service.sum
		}
	}

	selectYear(e) {
		this.resetComment()
		this.year = e.target.value
		this.sum = null

		if (this.questionNBR == "question2") {
			this.resetModule()
			this.question2Service.selectYear(this.year)
			this.question2Service.question()
			this.bar = this.question2Service.bar
			this.sum = this.question2Service.sum
		}
		if (this.questionNBR == "question3") {
			this.resetModule()
			this.question3Service.selectYear(this.year)
			this.question3Service.question()
			this.bar = this.question3Service.bar
			this.sum = this.question3Service.sum
		}

		if (this.questionNBR == "question4" || this.questionNBR == "question5"){
			this.oneModule.selectYear(this.year)
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
			if (this.year == "Toutes les promotions") this.sum = this.oneModule.sum
		}
	}

	resetModule() {
		this.select1.nativeElement.value = "Choisir une modalité"
		this.module = null
		this.bar = {}
		this.question2Service.resetModule()
		this.question3Service.resetModule()
	}

	resetYear() {
		this.select2.nativeElement.value = "Choisir une promotion"
		this.year = null
		this.bar = {}
		this.question2Service.resetYear()
		this.question3Service.resetYear()
		this.oneModule.resetYear()
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
