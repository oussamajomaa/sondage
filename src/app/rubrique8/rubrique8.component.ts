import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { ManyResponseService } from '../services/many-response.service';

@Component({
  selector: 'app-rubrique8',
  templateUrl: './rubrique8.component.html',
  styleUrls: ['./rubrique8.component.css']
})
export class Rubrique8Component {
	@ViewChild('select1') select1: ElementRef;
	@ViewChild('select2') select2: ElementRef;
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;
	bar: EChartsOption = {}
	isChart = false
	questionNBR: string
	questions = ["question36", "question37", "question38", "question39", "question40", "question41", "question42", "question43"]
	// questions = ["question36", "question37", "question38","question42", "question43"]
	// questions = ["question36", "question44"]
	promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
	year:string
	sum:number
	isModule = false


	constructor(private oneModule: OneModuleService, private manyReponse: ManyResponseService,) {
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
		if (this.questionNBR == "question36" || this.questionNBR == "question37" || this.questionNBR == "question39" || this.questionNBR == "question40" || this.questionNBR == "question41" || this.questionNBR == "question42") {
			this.isModule = false
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
		}
		if (this.questionNBR == "question43") {
			this.isModule = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
		}
		// if (this.questionNBR == "question45") {
		// 	this.manyReponse.question(this.questionNBR)
		// 	this.bar = this.manyReponse.bar
		// }
	}

	display = "none";
	openModal() {
		this.display = "block";
	}
	onCloseHandled() {
		this.display = "none";
	}
	
	selectYear(e) {
		this.resetComment()
		this.year = e.target.value
		this.sum = null

		if (this.questionNBR == "question36" || this.questionNBR == "question37" || this.questionNBR == "question38" || this.questionNBR == "question39" || this.questionNBR == "question40" || this.questionNBR == "question41" || this.questionNBR == "question42"){
			this.oneModule.selectYear(this.year)
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.sum = this.oneModule.sum
			if (this.year == "Toutes les promotions") this.sum = this.oneModule.sum
		}

		if (this.questionNBR == "question38" &&  this.year == "Toutes les promotions") {
			this.bar = {}
			this.sum = null
		}
		if (this.questionNBR == "question43"){
			this.manyReponse.selectYear(this.year)
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.sum = this.manyReponse.sum
			if (this.year == "Toutes les promotions") this.sum = this.manyReponse.sum
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
