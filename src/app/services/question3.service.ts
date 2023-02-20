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
	year:string
	title = "À quelle fréquence utilisez-vous les ressources suivantes ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = [ "Jamais", "Rarement", "Souvent", "Systématiquement"]

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	referentiel = []
	polycopie_enseignants = []
	roneo_etudiants = []
	diaporama_du_cours = []
	supports_conferences_privees = []
	enregistrement_des_cours = []
	capsules = []
	notes_personnelles_ED = []
	internet = []

	series: any
	data: any = []
	arr = []
	sumModule:number
	sumYear:number


	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question3.json')
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
		if (this.module == "Polycopie enseignants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.polycopie_enseignants == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.polycopie_enseignants != "empty").length
		}
		if (this.module == "Roneo etudiants"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.roneo_etudiants == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.roneo_etudiants != "empty").length
		}
		if (this.module == "Diaporama du cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.diaporama_du_cours == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.diaporama_du_cours != "empty").length
		}
		if (this.module == "Supports conférences privées"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.supports_conferences_privees == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.supports_conferences_privees != "empty").length
		}
		if (this.module == "Enregistrement des cours"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.enregistrement_des_cours == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.enregistrement_des_cours != "empty").length
		}
		if (this.module == "Capsules"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.capsules == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.capsules != "empty").length
		}
		if (this.module == "Notes personnelles ED"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.notes_personnelles_ED == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.notes_personnelles_ED != "empty").length
		}

		if (this.module == "Internet"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.internet == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.internet != "empty").length
		}
		return this.arr
	}

	getByYear(res = [],val: string) {
		this.sumYear = 0
		this.legend = ["referentiel", "polycopie_enseignants", "roneo_etudiants", "diaporama_du_cours", "supports_conferences_privees", "enregistrement_des_cours", "capsules", "notes_personnelles_ED", "internet"]
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
		this.DFGSM2 = this.getByModule(this.data, "DFGSM2")
		this.DFGSM3 = this.getByModule(this.data, "DFGSM3")
		this.DFASM1 = this.getByModule(this.data, "DFASM1")
		this.DFASM2 = this.getByModule(this.data, "DFASM2")

		this.referentiel = this.getByYear(this.data, "referentiel")
		this.polycopie_enseignants = this.getByYear(this.data, "polycopie_enseignants")
		this.roneo_etudiants = this.getByYear(this.data, "roneo_etudiants")
		this.diaporama_du_cours = this.getByYear(this.data, "diaporama_du_cours")
		this.supports_conferences_privees = this.getByYear(this.data, "supports_conferences_privees")
		this.enregistrement_des_cours = this.getByYear(this.data, "enregistrement_des_cours")
		this.capsules = this.getByYear(this.data, "capsules")
		this.notes_personnelles_ED = this.getByYear(this.data, "notes_personnelles_ED")
		this.internet = this.getByYear(this.data, "internet")

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
				{ name: "polycopie enseignants", data: this.polycopie_enseignants },
				{ name: "roneo étudiants", data: this.roneo_etudiants },
				{ name: "diaporama du cours", data: this.diaporama_du_cours },
				{ name: "supports conférences privées", data: this.supports_conferences_privees },
				{ name: "enregistrement des cours", data: this.enregistrement_des_cours },
				{ name: "capsules", data: this.capsules },
				{ name: "notes personnelles ED", data: this.notes_personnelles_ED },
				{ name: "internet", data: this.internet }
			])
			this.legend = ["referentiel", "polycopie enseignants", "roneo étudiants", "diaporama du cours", "supports conférences privées", "enregistrement des cours", "capsules", "notes personnelles ED", "internet"]
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
				// 	show: true,
					
				// },
				barGap: 0,
				data: val.data
			})
		})
		return series
	}
}
