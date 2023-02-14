import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class Question1Service {
	bar: EChartsOption = {}
	module:string
	title = "Qu’attendez-vous globalement qu’un enseignement vous apporte ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = ["empty", "Sans avis", "Beaucoup", "Un peu", "Pas du tout"]

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	series: any
	data: any = []
	arr = []

	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question1.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getQuestion(res = [],val: string) {
		this.arr = []
		if (this.module == "Referentiel"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.referentiel == x && r.annee == val).length))
		}
		if (this.module == "Synthese"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.synthese == x && r.annee == val).length))
		}
		if (this.module == "Contextualisation"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.contextualisation == x && r.annee == val).length))
		}
		if (this.module == "Algorithmes"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.algorithmes == x && r.annee == val).length))
		}
		if (this.module == "Annales"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.annales == x && r.annee == val).length))
		}
		return this.arr
	}

	question() {
		// this.DFASM1 = this.data.filter(r => r.annales == "Beaucoup" && r.annee == "DFASM1")
		this.DFGSM2 = this.getQuestion(this.data, "DFGSM2")
		this.DFGSM3 = this.getQuestion(this.data, "DFGSM3")
		this.DFASM1 = this.getQuestion(this.data, "DFASM1")
		this.DFASM2 = this.getQuestion(this.data, "DFASM2")

		this.series = this.createSeries([
			{ name: "DFGSM2", data: this.DFGSM2 },
			{ name: "DFGSM3", data: this.DFGSM3 },
			{ name: "DFASM1", data: this.DFASM1 },
			{ name: "DFASM2", data: this.DFASM2 }
		])
		this.bar = this.chartService.bar(this.title,this.module, this.legend, this.xaxis, this.series)
	}

	selectModule(module){
		this.module = module
	}

	resetModule(){
		this.module = null
	}

	createSeries(arr: any[]) {
		let series = []
		arr.map(val => {
			series.push({
				name: val.name,
				type: 'bar',
				// label: {
				// 	show: true
				// },
				barGap: 0,
				data: val.data
			})
		})
		return series
	}
}
