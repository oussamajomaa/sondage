import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class DFASM1Service {

	bar: EChartsOption = {}
	module: string
	year: string
	title: string

	legend = [
		"Maladies infectieuses",
		"Médecine du travail et médecine légale",
		"Handicap",
		"Douleurs et soins palliatifs",
		"Génétique appliquée à la médecine",
		"Dermatologie",
		"Endocrinologie-nutrition",
		"Relation de soin",
		"Urgences-réanimation",
		"Rhumatologie",
		"Orthopédie",
		"Gynéco-obstétrique",
		"Urologie",
		"Néphrologie",
		"C2i",
	]

	xaxis = []
	series: any
	data17: any = []
	sumYear: number
	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		// Récupérer les données de toutes les questions à choix multiple
		this.http.get('./assets/data/question17_DFASM1.json').subscribe((res: any) => this.data17 = res)

		// this.http.get('./assets/data/question18.json').subscribe((res: any) => this.data18 = res)

	}

	getByModuleYear(data: any, oneYear: any) {
		this.legend.map(p => {
			oneYear.push(data.filter((r: any) => r[p] !== "").length)
			this.sumYear += data.filter((r: any) => r[p] !== "").length
		})
	}

	question(question: string) {
		this.sumYear = 0
		this.series = []
		let oneYear = []
		let color
		// Affecter les titre et les propriétés de chaque question
		if (question === 'question17') {
			this.title = "Quelles sont les disciplines pour lesquelles l'enseignement magistral (en amphi) vous apporterait une plus-value ?"
			if (this.year == "DFASM1"){
				color = "#FFDC60"
				this.getByModuleYear(this.data17, oneYear)
			}
			
		}

		// Construire le tableau series data du graphique
		this.xaxis = [this.year]
		
		// oneYear = oneYear.sort()
		this.series = this.createSeries([
			{ name: this.year, data: oneYear },
		], '', color)


		this.bar = this.chartService.barH(this.title, "", this.xaxis, this.legend, this.series)
		if (this.year == "Toutes les promotions"){
			this.bar = {}
		}
	}

	selectYear(year) {
		this.year = year
	}

	// Méthode pour construire le graphique
	createSeries(arr: any[], stack: string, color: string) {
		let series = []
		arr.map(val => {
			series.push({
				name: val.name,
				type: 'bar',
				stack: stack,
				// label: {
				// 	show: true,
				// },
				barGap: 0,
				data: val.data,
				itemStyle: {
					color: color
				}
			})
		})
		return series
	}
}
