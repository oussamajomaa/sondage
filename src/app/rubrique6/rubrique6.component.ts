import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OnePromotionService } from '../services/one-promotion.service';
import { HttpClient } from '@angular/common/http';


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
	year:string
	isModule = false
	sum:number
	promotions = ["Toutes les promotions","DFGSM2","DFGSM3","DFASM1","DFASM2"]
	
	constructor(
		private onePromotion: OnePromotionService,

	) { 
			
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
		this.isModule = false

		if (this.questionNBR == "question28") {

		}
	}

	display = "none";
	openModal() {
		this.display = "block";
	}
	onCloseHandled() {
		this.display = "none";
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

	selectYear(e) {
		this.resetComment()
		this.year = e.target.value
		this.sum = null
		if (this.questionNBR == "question28" || this.questionNBR == "question29" || this.questionNBR == "question30") {
			this.onePromotion.selectYear(this.year)
			this.onePromotion.question(this.questionNBR)
			this.bar = this.onePromotion.bar
			this.sum = this.onePromotion.sum
			if (this.year == "Toutes les promotions") {
				this.sum = this.onePromotion.sumModule
				this.year = null
			}
		}

		
	}

	resetYear() {
		this.select2.nativeElement.value = "Choisir une promotion"
		this.year = null
		this.bar = {}
	}
}
