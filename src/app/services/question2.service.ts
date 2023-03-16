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

	inutile = []
	secondaire = []
	utile = []
	parfait_ideal = []
	non_utilise = []
	sumModule:number
	sumYear:number
	sum:number

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
		this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
		this.xaxis = ["Inutile","Secondaire","Utile","Parfait/Idéal","Non utilisé"]

		this.arr = []
		if (this.module == "Ouvrages nationaux"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.ouvrages_nationaux == x && r.annee == val).length))
			this.sum = res.filter(r => r.ouvrages_nationaux != "empty").length
		}
		if (this.module == "Polycopie local"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.polycopie_local == x && r.annee == val).length))
			this.sum = res.filter(r => r.polycopie_local != "empty").length
		}
		if (this.module == "Roneo etudiants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.roneo_etudiants == x && r.annee == val).length))
			this.sum = res.filter(r => r.roneo_etudiants != "empty").length
		}
		if (this.module == "Diaporama du cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.diaporama_du_cours == x && r.annee == val).length))
			this.sum = res.filter(r => r.diaporama_du_cours != "empty").length
		}
		if (this.module == "Video des cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.video_des_cours == x && r.annee == val).length))
			this.sum = res.filter(r => r.video_des_cours != "empty").length
		}
		if (this.module == "Capsules"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.capsules == x && r.annee == val).length))
			this.sum = res.filter(r => r.capsules != "empty").length
		}
		return this.arr
	}

	getByYear(res = [],val: string) {
		this.sum = 0
		this.xaxis = ["ouvrages_nationaux", "polycopie_local", "roneo_etudiants", "diaporama_du_cours", "video_des_cours", "capsules"]
		this.legend = ["Inutile","Secondaire","Utile","Parfait/Idéal","Non utilisé"]
		this.arr = []

		this.xaxis.map(x => this.arr.push(res.filter(r => r[x] == val && r.annee == this.year).length))
		this.xaxis.map(l => this.sum += res.filter(r => r[l] != "empty" && r.annee == this.year).length)
		
		return this.arr
	}

	question() {
		if (this.module){
			this.DFGSM2 = this.getByModule(this.data, "DFGSM2")
			this.DFGSM3 = this.getByModule(this.data, "DFGSM3")
			this.DFASM1 = this.getByModule(this.data, "DFASM1")
			this.DFASM2 = this.getByModule(this.data, "DFASM2")
			this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
			this.xaxis = ["Inutile","Secondaire","Utile","Parfait/Idéal","Non utilisé"]
			
			this.series = this.createSeries([
				{ name: "DFGSM2", data: this.DFGSM2 },
				{ name: "DFGSM3", data: this.DFGSM3 },
				{ name: "DFASM1", data: this.DFASM1 },
				{ name: "DFASM2", data: this.DFASM2 }
			])
			this.bar = this.chartService.bar(this.title,this.module, this.legend, this.xaxis, this.series, this.sum)
		}

		if (this.year){
			this.inutile = this.getByYear(this.data, "Inutile")
			this.secondaire = this.getByYear(this.data, "Secondaire")
			this.utile = this.getByYear(this.data, "Utile")
			this.parfait_ideal = this.getByYear(this.data, "Parfait/Idéal")
			this.non_utilise = this.getByYear(this.data, "Non utilisé")
			this.xaxis = [  "Diaporama\ndu cours","Polycopie\nlocal", "Roneo\nétudiants", "Capsules","Video\ndes cours","Ouvrages\nnationaux", ]
			this.legend = ["Parfait/Idéal","Utile","Secondaire","Inutile","Non utilisé"]
			
			this.series = this.createSeries([
				{ name: "Parfait/Idéal", data: this.parfait_ideal },
				{ name: "Utile", data: this.utile },
				{ name: "Secondaire", data: this.secondaire },
				{ name: "Inutile", data: this.inutile },
				{ name: "Non utilisé", data: this.non_utilise },
			])
			this.bar = this.chartService.bar(this.title,this.year, this.legend, this.xaxis, this.series, this.sum)
			if (this.year == "Toutes les promotions"){
				this.bar = {}
			}
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

