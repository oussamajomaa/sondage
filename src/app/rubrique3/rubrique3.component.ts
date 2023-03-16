import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { Question9Service } from '../services/question9.service';
import { ManyResponseService } from '../services/many-response.service';
import { HttpClient } from '@angular/common/http';
import {trigger, style, animate, transition} from '@angular/animations';


@Component({
	selector: 'app-rubrique3',
	templateUrl: './rubrique3.component.html',
	styleUrls: ['./rubrique3.component.css'],
	animations: [
		trigger('fade', [ 
		  transition('void => *', [
			style({ opacity: 0 }), 
			animate(2000, style({opacity: 1}))
		  ]) 
		])
	  ]
})
export class Rubrique3Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;

	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = [
		"question6", "question7", "question8", "question9", "question10",
		"question11", "question12", "question13", "question14", "question15"
	]
	// questions = [
	// 	"question7", "question8", "question9", 
	// ]
	modules = []
	module: string
	year: string
	isModule = false
	promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
	sum: number

	textCommentaire: string
	display = "none";
	commentaire = "none"
	commentaires:any = []
	constructor(
		private question9Service: Question9Service,
		private oneModule: OneModuleService,
		private manyReponse: ManyResponseService,
		private http:HttpClient,
	) {
		this.oneModule.resetYear()
		this.http.get('assets/data/commentaire.json').subscribe(res => this.commentaires = res)
		
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

		if (this.questionNBR == "question9") {
			this.isModule = true
			this.modules = [
				"Nombre heures trop important", "Faible valeur ajoutée", "Perte temps transports", "Accès ressources internet",
				"Rester concentre plus 2 heures", "Stage journée complète",
			]
		}

		if (this.questionNBR == "question6" || this.questionNBR == "question7" || this.questionNBR == "question10" || this.questionNBR == "question11" || this.questionNBR == "question12" || this.questionNBR == "question15") {
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
		}

		if (this.questionNBR == "question8" || this.questionNBR == "question13" || this.questionNBR == "question14") {
			this.isModule = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
		}
	}

	
	openModal() {
		this.display = "block";
	}
	onCloseHandled() {
		this.display = "none";
	}

	onComment() {
		this.commentaire = "block";
	}

	onCloseComment() {
		this.commentaire = "none";
	}

	selectModule(e) {
		this.resetComment()
		this.resetYear()
		this.module = e.target.value
		// this.sum = null

		if (this.questionNBR == "question9") {
			this.question9Service.selectModule(this.module)
			this.question9Service.question()
			this.bar = this.question9Service.bar
			this.sum = this.question9Service.sum			
		}
	}

	selectYear(e) {
		this.resetComment()
		this.year = e.target.value
		let comments = []
		// this.sum = null

		if (this.questionNBR == "question9") {
			this.resetModule()
			this.question9Service.selectYear(this.year)
			this.question9Service.question()
			this.bar = this.question9Service.bar
			this.sum = this.question9Service.sum
		}

		if (this.questionNBR == "question6" || this.questionNBR == "question7" || this.questionNBR == "question10" || this.questionNBR == "question11" || this.questionNBR == "question12" || this.questionNBR == "question15") {
			this.oneModule.selectYear(this.year)
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
			if (this.year == "Toutes les promotions") this.sum = this.oneModule.sum
		}

		if (this.questionNBR == "question8" || this.questionNBR == "question13" || this.questionNBR == "question14") {
			this.manyReponse.selectYear(this.year)
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
			if (this.year == "Toutes les promotions") this.sum = this.manyReponse.sum
		}

		if (this.questionNBR == "question8" || this.questionNBR == "question13" || this.questionNBR == "question14"){
			comments = this.commentaires.filter(item => item.question === this.questionNBR)[0].promotion
			comments.filter(com => {
				if (com.year === this.year) this.textCommentaire = com.text
			})
		}
	}

	resetModule() {
		this.select1.nativeElement.value = "Choisir une modalité"
		this.module = null
		this.bar = {}
		this.question9Service.resetModule()
	}

	resetYear() {
		this.select2.nativeElement.value = "Choisir une promotion"
		this.year = null
		this.bar = {}
		this.question9Service.resetYear()
		this.oneModule.resetYear()
		this.manyReponse.resetYear()
	}

	resetComment() {
		this.comment.nativeElement.style.display = 'none'
		this.textarea.nativeElement.value = ""
	}

	addComment() {
		if (this.comment) {
			this.comment.nativeElement.style.display = 'block'
			this.textarea.nativeElement.focus()
		}
	}

	closeComment() {
		if (this.comment) {
			this.resetComment()
		}
	}
}
