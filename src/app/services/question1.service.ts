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
	year:string
	title = "Qu'attendez-vous globalement qu'un enseignement vous apporte ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = ["Sans avis", "Beaucoup", "Un peu", "Pas du tout"]
	sum:number
	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	referentiel = []
	synthese = []
	contextualisation = []
	algorithmes = []
	annales = []


	series: any
	data: any = []
	arr = []
	sumModule:number
	sumYear:number

	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question1.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getByModule(res = [],val: string) {
		this.arr = []
		if (this.module == "Referentiel"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.referentiel == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.referentiel != "empty").length
		}
		if (this.module == "Synthese"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.synthese == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.synthese != "empty").length
		}
		if (this.module == "Contextualisation"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.contextualisation == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.contextualisation != "empty").length
		}
		if (this.module == "Algorithmes"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.algorithmes == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.algorithmes != "empty").length
		}
		if (this.module == "Annales"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.annales == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.annales != "empty").length
		}
		return this.arr
	}

	getByYear(res = [],val: string) {
		this.sumYear = 0
		this.legend = ["referentiel", "synthese", "contextualisation", "algorithmes", "annales"]
		this.arr = []
		
		this.xaxis.map(x => this.arr.push(res.filter(r => r[val] == x && r.annee == this.year).length))
		this.legend.map(l => this.sumYear += res.filter(r => r[l] != "empty" && r.annee == this.year).length)

		/// this.legend = ["referentiel", "synthese", "contextualisation", "algorithmes", "annales"]
		// this.xaxis = ["Sans avis", "Beaucoup", "Un peu", "Pas du tout"]
		// this.legend.map(lg => {
		// this.xaxis.map(x => this.arr.push(res.filter(r => r[lg] == x && r.annee == this.year).length))
		// })
		return this.arr
	}

	question() {		
		this.series = []
		this.DFGSM2 = this.getByModule(this.data, "DFGSM2")
		this.DFGSM3 = this.getByModule(this.data, "DFGSM3")
		this.DFASM1 = this.getByModule(this.data, "DFASM1")
		this.DFASM2 = this.getByModule(this.data, "DFASM2")

		this.referentiel = this.getByYear(this.data, "referentiel")
		this.synthese = this.getByYear(this.data, "synthese")
		this.contextualisation = this.getByYear(this.data, "contextualisation")
		this.algorithmes = this.getByYear(this.data, "algorithmes")
		this.annales = this.getByYear(this.data, "annales")

		// this.sans_avis = this.getByYear(this.data, "Sans avis")
		// this.beaucoup = this.getByYear(this.data, "Beaucoup")
		// this.un_peu = this.getByYear(this.data, "Un Peu")
		// this.pas_du_tout = this.getByYear(this.data, "Pas du tout")

		if (this.module){
			 
			this.series = this.createSeries([
				{ name: "DFGSM2", data: this.DFGSM2 },
				{ name: "DFGSM3", data: this.DFGSM3 },
				{ name: "DFASM1", data: this.DFASM1 },
				{ name: "DFASM2", data: this.DFASM2 }
			])
			this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
			this.bar = this.chartService.bar(this.title,this.module, this.legend, this.xaxis, this.series)
		}
		if (this.year){
			this.series = this.createSeries([
				{ name: "referentiel", data: this.referentiel },
				{ name: "synthese", data: this.synthese },
				{ name: "contextualisation", data: this.contextualisation },
				{ name: "algorithmes", data: this.algorithmes },
				{ name: "annales", data: this.annales }
			])

			// this.xaxis = ["referentiel", "synthese", "contextualisation", "algorithmes", "annales"]
			// this.legend = ["Sans avis", "Beaucoup", "Un peu", "Pas du tout"]
			// this.series = this.createSeries([
			// 	{ name: "Sans avis", data: this.sans_avis },
			// 	{ name: "Beaucoup", data: this.beaucoup },
			// 	{ name: "Un peu", data: this.un_peu },
			// 	{ name: "Pas du tout", data: this.pas_du_tout },
			// 	])
			this.legend = ["referentiel", "synthese", "contextualisation", "algorithmes", "annales"]
			this.bar = this.chartService.bar(this.title,this.year, this.legend, this.xaxis, this.series)
		}
	}

	selectModule(module){
		this.module = module
	}

	selectYear(year){
		this.year = year
	}

	resetModule(){
		this.module = null
	}

	resetYear(){
		this.year = null
	}

	createSeries(arr: any[]) {
		let series = []
		arr.map(val => {
			series.push({
				name: val.name,
				type: 'bar',
				stack: 'total',
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
