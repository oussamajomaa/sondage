import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class Question3Service {
	bar: EChartsOption = {}
	module: string
	title = "A quelle fréquence utilisez-vous les ressources suivantes ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = ["empty", "Jamais", "Rarement", "Souvent", "Systématiquement"]

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
		this.http.get('./assets/data/question3.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getQuestion(res = [],val: string) {
		this.arr = []
		if (this.module == "Referentiel"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.referentiel == x && r.annee == val).length))
		}
		if (this.module == "Polycopie enseignants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.polycopie_enseignants == x && r.annee == val).length))
		}
		if (this.module == "Roneo etudiants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.roneo_etudiants == x && r.annee == val).length))
		}
		if (this.module == "Diaporama du cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.diaporama_du_cours == x && r.annee == val).length))
		}
		if (this.module == "Supports conférences privées"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.supports_conferences_privees == x && r.annee == val).length))
		}
		if (this.module == "Enregistrement des cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.enregistrement_des_cours == x && r.annee == val).length))
		}
		if (this.module == "Capsules"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.capsules == x && r.annee == val).length))
		}
		if (this.module == "Notes personnelles ED"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.notes_personnelles_ED == x && r.annee == val).length))
		}

		if (this.module == "Internet"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.internet == x && r.annee == val).length))
		}
		return this.arr
	}

	question() {
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
				// 	show: true,
					
				// },
				barGap: 0,
				data: val.data
			})
		})
		return series
	}
}
