import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { ManyResponseService } from '../services/many-response.service';

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
	// questions = [
	// 	"question16", "question17", "question18", "question19",
	// 	"question20", "question21", "question22", "question23"
	// ]
	questions = [
		"question18", 
		"question20", 
	]
	promotions = []
	modules = []
	module: string
	year:string
	isModule = false
	sum:number
	
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
		this.year = null
		if (this.select2 && this.questionNBR != nbr) this.resetYear()
		
		if (this.questionNBR != nbr) {			
			this.bar = {}
		}
		this.questionNBR = nbr
		this.resetComment()
		if (this.questionNBR == "question20" || this.questionNBR == "question21" || this.questionNBR == "question22" || this.questionNBR == "question23"){
			this.promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sumModule
		}
		
		if (this.questionNBR == "question16" || this.questionNBR == "question18") {
			this.promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
			this.isModule = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sumModule
		}
	}

	// selectModule(e) {
	// 	this.resetComment()
	// 	this.resetYear()
	// 	this.module = e.target.value
	// 	this.sum = null
		
	// 	if (this.questionNBR == "question2") {
	// 		this.question2Service.selectModule(this.module)
	// 		this.question2Service.question()
	// 		this.bar = this.question2Service.bar
	// 		this.sum = this.question2Service.sumModule
	// 	}
	// 	if (this.questionNBR == "question3") {
	// 		this.question3Service.selectModule(this.module)
	// 		this.question3Service.question()
	// 		this.bar = this.question3Service.bar
	// 		this.sum = this.question3Service.sumModule
	// 	}
	// }

	selectYear(e) {
		this.resetComment()
		this.year = e.target.value
		this.sum = null

		if (this.questionNBR == "question20" || this.questionNBR == "question21" || this.questionNBR == "question22" || this.questionNBR == "question23"){
			this.oneModule.selectYear(this.year)
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sumYear
			if (this.year == "Toutes les promotions") this.sum = this.oneModule.sumModule
		}

		if (this.questionNBR == "question16" || this.questionNBR == "question18"){
			this.manyReponse.selectYear(this.year)
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sumYear
			if (this.year == "Toutes les promotions") this.sum = this.manyReponse.sumModule
		}
	}

	// resetModule() {
	// 	this.select1.nativeElement.value = "Choisir une modalité"
	// 	this.module = null
	// 	this.bar = {}
	// 	this.question2Service.resetModule()
	// 	this.question3Service.resetModule()
	// }

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
