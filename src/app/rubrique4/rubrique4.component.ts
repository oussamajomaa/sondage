import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { ManyResponseService } from '../services/many-response.service';
import { OnePromotionService } from '../services/one-promotion.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-rubrique4',
  templateUrl: './rubrique4.component.html',
  styleUrls: ['./rubrique4.component.css']
})
export class Rubrique4Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = [
		"question16", "question17", "question18", "question19",
		"question20", "question21", "question22", "question23"
	]
	// questions = [
	// 	"question16", "question17",
	// 	"question18", 
	// 	"question20", 
	// ]
	promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
	modules = []
	module: string
	year:string
	isModule = false
	isYear = false
	sum:number

	textCommentaire: string
	display = "none";
	commentaire = "none"
	commentaires:any = []

	
	constructor(
		private oneModule: OneModuleService,
		private manyReponse: ManyResponseService,
		private onePromotion: OnePromotionService,
		private http:HttpClient

	) { 
		this.oneModule.resetYear()	
		this.manyReponse.resetYear()
		http.get('assets/data/commentaire.json').subscribe(res => this.commentaires = res)

	}

	question(nbr) {
		this.isChart = true
		this.sum = null
		this.year = null
		if (this.select2 && this.questionNBR != nbr) this.resetYear()
		
		if (this.questionNBR != nbr) {			
			this.bar = {}
		}
		this.questionNBR = nbr
		this.resetComment()
		if (this.questionNBR == "question20" || this.questionNBR == "question21" || this.questionNBR == "question22" || this.questionNBR == "question23"){
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
			this.isYear = false
		}
		
		if (this.questionNBR == "question16" || this.questionNBR == "question18") {
			this.isModule = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
			this.isYear = false
		}

		if (this.questionNBR == "question17" || this.questionNBR == "question19"){
			this.isYear = true
			// this.isChart = false
			// this.isModule = false
			// this.onePromotion.question(this.questionNBR)
			// this.bar = this.manyReponse.bar

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
		let comments = []
		this.sum = null

		if (this.questionNBR == "question20" || this.questionNBR == "question21" || this.questionNBR == "question22" || this.questionNBR == "question23"){
			this.oneModule.selectYear(this.year)
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
			if (this.year == "Toutes les promotions") this.sum = this.oneModule.sum
		}

		if (this.questionNBR == "question17" || this.questionNBR == "question19"){
			this.onePromotion.selectYear(this.year)
			this.onePromotion.question(this.questionNBR)
			this.bar = this.onePromotion.bar
			this.sum = this.onePromotion.sum
			this.isYear = false
			if (this.year == "Toutes les promotions") this.sum = this.onePromotion.sum
		}

		if (this.questionNBR == "question16" || this.questionNBR == "question18"){
			this.manyReponse.selectYear(this.year)
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
			if (this.year == "Toutes les promotions") this.sum = this.manyReponse.sum
		}

		if (this.questionNBR == "question16" || this.questionNBR == "question18"){
			comments = this.commentaires.filter(item => item.question === this.questionNBR)[0].promotion
			comments.filter(com => {
				if (com.year === this.year) this.textCommentaire = com.text
			})
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
