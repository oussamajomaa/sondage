import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from '../services/chart.service';
import { EChartsOption } from 'echarts';

@Component({
	selector: 'app-rubrique7',
	templateUrl: './rubrique7.component.html',
	styleUrls: ['./rubrique7.component.css']
})
export class Rubrique7Component {
	@ViewChild('comment') comment: ElementRef;
	@ViewChild('textarea') textarea: ElementRef;
	positif1:any = [] 
	negatif1:any = []
	positif2:any = []
	negatif2:any = []
	positif3:any = []
	negatif3:any = []
	positif4:any = []
	negatif4:any = []
	positif5:any = []
	negatif5:any = []
	positif6:any = []
	negatif6:any = []
	isChart = false
	legend = ["Positive","Negative"]
	scatter: EChartsOption = {}
	

	constructor(
		private http:HttpClient,
		private chartService:ChartService
	){}

	ngOnInit(){		
		this.http.get('./assets/data/question_ouverte.json')
		.subscribe((res:any) => {
			res.map((r:any) => {
				this.positif1.push([r.rep1, (Math.log2((r.rep1+1)/(r.p1+1)))])
				this.negatif1.push([r.rep1, (Math.log2((r.rep1+1)/(r.n1+1)))])
				this.positif2.push([r.rep2, (Math.log2((r.rep2+1)/(r.p2+1)))])
				this.negatif2.push([r.rep2, (Math.log2((r.rep2+1)/(r.n2+1)))])
				this.positif3.push([r.rep3, (Math.log2((r.rep3+1)/(r.p3+1)))])
				this.negatif3.push([r.rep3, (Math.log2((r.rep3+1)/(r.n3+1)))])
				this.positif4.push([r.rep4, (Math.log2((r.rep4+1)/(r.p4+1)))])
				this.negatif4.push([r.rep4, (Math.log2((r.rep4+1)/(r.n4+1)))])
				this.positif5.push([r.rep5, (Math.log2((r.rep5+1)/(r.p5+1)))])
				this.negatif5.push([r.rep5, (Math.log2((r.rep5+1)/(r.n5+1)))])
				this.positif6.push([r.rep6, (Math.log2((r.rep6+1)/(r.p6+1)))])
				this.negatif6.push([r.rep6, (Math.log2((r.rep6+1)/(r.n6+1)))])
			})
		})
	}
	title:string
	openQuestion(title:string,legend=[],p:[],n:[]){
		this.resetComment()
		this.title = title
		this.isChart = true
		this.scatter = this.chartService.scatter(title,legend,p,n)
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
