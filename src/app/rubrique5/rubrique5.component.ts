import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { ManyResponseService } from '../services/many-response.service';

@Component({
	selector: 'app-rubrique5',
	templateUrl: './rubrique5.component.html',
	styleUrls: ['./rubrique5.component.css']
})
export class Rubrique5Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = ["question24", "question25", "question26", "question27"]
	// questions = ["question25", "question26"]
	modules = []
	module: string
	year:string
	isModule = false
	promotions = []
	sum:number

	textCommentaire: string
	display = "none";
	commentaire = "none"
	commentaires:any = []
	constructor(
		private oneModule: OneModuleService,
		private manyReponse: ManyResponseService,

	) { 
		this.oneModule.resetYear()	
		this.manyReponse.resetYear()	
	}

	question(nbr) {
		this.isChart = true
		this.sum = null
		if (this.select2 && this.questionNBR != nbr) this.resetYear()
		
		if (this.questionNBR != nbr) {			
			this.bar = {}
		}
		this.questionNBR = nbr
		
		this.resetComment()
		if (this.questionNBR == "question24" || this.questionNBR == "question25"){
			this.promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
		}
		
		if (this.questionNBR == "question26" || this.questionNBR == "question27") {
			this.promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
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

	selectYear(e) {
		this.resetComment()
		this.year = e.target.value
		this.sum = null

		if (this.questionNBR == "question24" || this.questionNBR == "question25"){
			this.oneModule.selectYear(this.year)
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
			if (this.year == "Toutes les promotions") this.sum = this.oneModule.sum
		}
		if (this.questionNBR == "question26" || this.questionNBR == "question27"){
			this.manyReponse.selectYear(this.year)
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
			if (this.year == "Toutes les promotions") this.sum = this.manyReponse.sum
		}
	}

	resetYear() {
		this.select2.nativeElement.value = "Choisir une promotion"
		this.year = null
		this.bar = {}
		this.oneModule.resetYear()
		this.manyReponse.resetYear()
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
