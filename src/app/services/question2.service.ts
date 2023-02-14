import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class Question2Service {
	bar: EChartsOption = {}
	module: string
	title = "Quelle est votre appréciation sur les divers types de ressources/supports ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = ["empty","Inutile","Secondaire","Utile","Parfait/Idéal","Non utilisé"]

	series: any
	data: any 			= []
	arr 				= []

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []


	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question2.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getQuestion(res = [],val: string) {
		this.arr = []

		if (this.module == "Ouvrages nationaux"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.ouvrages_nationaux == x && r.annee == val).length))
		}
		if (this.module == "Polycopie local"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.polycopie_local == x && r.annee == val).length))
		}
		if (this.module == "Roneo etudiants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.roneo_etudiants == x && r.annee == val).length))
		}
		if (this.module == "Diaporama du cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.diaporama_du_cours == x && r.annee == val).length))
		}
		if (this.module == "Video des cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.video_des_cours == x && r.annee == val).length))
		}
		if (this.module == "Capsules"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.capsules == x && r.annee == val).length))
		}
		
		return this.arr
	}

	question() {
		// this.DFASM1 = this.data.filter(r => r.annales == "Secondaire" && r.annee == "DFASM1")
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

