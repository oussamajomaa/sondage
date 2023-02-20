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
	year:string
	title = "Quelle est votre appréciation sur les divers types de ressources/supports ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = ["Inutile","Secondaire","Utile","Parfait/Idéal","Non utilisé"]

	series: any
	data: any 			= []
	arr 				= []

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	ouvrages_nationaux = []
	polycopie_local = []
	roneo_etudiants = []
	diaporama_du_cours = []
	video_des_cours = []
	capsules = []
	sumModule:number
	sumYear:number

	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question2.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getByModule(res = [],val: string) {
		this.arr = []
		if (this.module == "Ouvrages nationaux"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.ouvrages_nationaux == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.ouvrages_nationaux != "empty").length
		}
		if (this.module == "Polycopie local"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.polycopie_local == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.polycopie_local != "empty").length
		}
		if (this.module == "Roneo etudiants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.roneo_etudiants == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.roneo_etudiants != "empty").length
		}
		if (this.module == "Diaporama du cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.diaporama_du_cours == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.diaporama_du_cours != "empty").length
		}
		if (this.module == "Video des cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.video_des_cours == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.video_des_cours != "empty").length
		}
		if (this.module == "Capsules"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.capsules == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.capsules != "empty").length
		}
		
		return this.arr
	}

	getByYear(res = [],val: string) {
		this.sumYear = 0
		this.legend = ["ouvrages_nationaux", "polycopie_local", "roneo_etudiants", "diaporama_du_cours", "video_des_cours", "capsules"]
		this.arr = []
		if (this.year == "DFGSM2"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r[val] == x && r.annee == "DFGSM2").length))
			this.legend.map(l => this.sumYear += res.filter(r => r[l] != "empty" && r.annee == "DFGSM2").length)
		}
		if (this.year == "DFGSM3"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r[val] == x && r.annee == "DFGSM3").length))
			this.legend.map(l => this.sumYear += res.filter(r => r[l] != "empty" && r.annee == "DFGSM3").length)
		}
		if (this.year == "DFASM1"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r[val] == x && r.annee == "DFASM1").length))
			this.legend.map(l => this.sumYear += res.filter(r => r[l] != "empty" && r.annee == "DFASM1").length)
		}
		if (this.year == "DFASM2"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r[val] == x && r.annee == "DFASM2").length))
			this.legend.map(l => this.sumYear += res.filter(r => r[l] != "empty" && r.annee == "DFASM2").length)
		}
		
		return this.arr
	}

	question() {
		// this.DFASM1 = this.data.filter(r => r.annales == "Secondaire" && r.annee == "DFASM1")
		this.DFGSM2 = this.getByModule(this.data, "DFGSM2")
		this.DFGSM3 = this.getByModule(this.data, "DFGSM3")
		this.DFASM1 = this.getByModule(this.data, "DFASM1")
		this.DFASM2 = this.getByModule(this.data, "DFASM2")

		this.ouvrages_nationaux = this.getByYear(this.data, "ouvrages_nationaux")
		this.polycopie_local = this.getByYear(this.data, "polycopie_local")
		this.roneo_etudiants = this.getByYear(this.data, "roneo_etudiants")
		this.diaporama_du_cours = this.getByYear(this.data, "diaporama_du_cours")
		this.video_des_cours = this.getByYear(this.data, "video_des_cours")
		this.capsules = this.getByYear(this.data, "capsules")

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
				{ name: "ouvrages nationaux", data: this.ouvrages_nationaux },
				{ name: "polycopie local", data: this.polycopie_local },
				{ name: "roneo etudiants", data: this.roneo_etudiants },
				{ name: "diaporama du cours", data: this.diaporama_du_cours },
				{ name: "video des cours", data: this.video_des_cours },
				{ name: "capsules", data: this.capsules }
			])
			this.legend = ["ouvrages nationaux", "polycopie local", "roneo etudiants", "diaporama du cours", "video des cours", "capsules"]
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

