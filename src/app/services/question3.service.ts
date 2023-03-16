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
	year: string
	title = "À quelle fréquence utilisez-vous les ressources suivantes ?"

	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = ["Jamais", "Rarement", "Souvent", "Systématiquement"]

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

	jamais = []
	rarement = []
	souvent = []
	systematiquement = []

	series: any
	data: any = []
	arr = []
	sumModule: number
	sumYear: number

	sum:number
	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question3.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getByModule(res = [], val: string) {
		this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
		this.xaxis = ["Jamais", "Rarement", "Souvent", "Systématiquement"]

		this.arr = []
		if (this.module == "Referentiel") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.referentiel == x && r.annee == val).length))
			this.sum = res.filter(r => r.referentiel != "empty").length
		}
		if (this.module == "Polycopie enseignants") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.polycopie_enseignants == x && r.annee == val).length))
			this.sum = res.filter(r => r.polycopie_enseignants != "empty").length
		}
		if (this.module == "Roneo etudiants") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.roneo_etudiants == x && r.annee == val).length))
			this.sum = res.filter(r => r.roneo_etudiants != "empty").length
		}
		if (this.module == "Diaporama du cours") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.diaporama_du_cours == x && r.annee == val).length))
			this.sum = res.filter(r => r.diaporama_du_cours != "empty").length
		}
		if (this.module == "Supports conférences privées") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.supports_conferences_privees == x && r.annee == val).length))
			this.sum = res.filter(r => r.supports_conferences_privees != "empty").length
		}
		if (this.module == "Enregistrement des cours") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.enregistrement_des_cours == x && r.annee == val).length))
			this.sum = res.filter(r => r.enregistrement_des_cours != "empty").length
		}
		if (this.module == "Capsules") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.capsules == x && r.annee == val).length))
			this.sum = res.filter(r => r.capsules != "empty").length
		}
		if (this.module == "Notes personnelles ED") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.notes_personnelles_ED == x && r.annee == val).length))
			this.sum = res.filter(r => r.notes_personnelles_ED != "empty").length
		}

		if (this.module == "Internet") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.internet == x && r.annee == val).length))
			this.sum = res.filter(r => r.internet != "empty").length
		}
		return this.arr
	}

	getByYear(res = [], val: string) {
		this.sum = 0
		this.xaxis = ["referentiel", "polycopie_enseignants", "roneo_etudiants", "diaporama_du_cours", "supports_conferences_privees", "enregistrement_des_cours", "capsules", "notes_personnelles_ED", "internet"]
		this.legend = ["Jamais", "Rarement", "Souvent", "Systématiquement"]
		this.arr = []

		this.xaxis.map(x => this.arr.push(res.filter(r => r[x] == val && r.annee == this.year).length))
		this.xaxis.map(l => this.sum += res.filter(r => r[l] != "empty" && r.annee == this.year).length)

		return this.arr
	}

	question() {
		if (this.module) {
			this.DFGSM2 = this.getByModule(this.data, "DFGSM2")
			this.DFGSM3 = this.getByModule(this.data, "DFGSM3")
			this.DFASM1 = this.getByModule(this.data, "DFASM1")
			this.DFASM2 = this.getByModule(this.data, "DFASM2")
	
			this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
			this.xaxis = ["Jamais", "Rarement", "Souvent", "Systématiquement"]
			
			this.series = this.createSeries([
				{ name: "DFGSM2", data: this.DFGSM2 },
				{ name: "DFGSM3", data: this.DFGSM3 },
				{ name: "DFASM1", data: this.DFASM1 },
				{ name: "DFASM2", data: this.DFASM2 }
			])
			this.bar = this.chartService.bar(this.title, this.module, this.legend, this.xaxis, this.series, this.sum)
		}
		
		if (this.year) {
			this.jamais = this.getByYear(this.data, "Jamais")
			this.rarement = this.getByYear(this.data, "Rarement")
			this.souvent = this.getByYear(this.data, "Souvent")
			this.systematiquement = this.getByYear(this.data, "Systématiquement")
			this.xaxis = ["supports\nconferences\nprivees",  "diaporama\ndu cours",  "Polycopie\nenseignants", "Notes\npersonnelles ED", "Internet","Capsules", "Roneo\nétudiants","Enregistrement\ndes cours", "Référentiel"]
			this.legend = ["Systématiquement","Souvent","Rarement","Jamais"   ]
			
			this.series = this.createSeries([
				{ name: "Systématiquement", data: this.systematiquement },
				{ name: "Souvent", data: this.souvent },
				{ name: "Rarement", data: this.rarement },
				{ name: "Jamais", data: this.jamais },
			])
			this.bar = this.chartService.bar(this.title, this.year, this.legend, this.xaxis, this.series, this.sum)
			if (this.year == "Toutes les promotions"){
				this.bar = {}
			}
		}
	}

	selectModule(module) {
		this.module = module
	}

	selectYear(year) {
		this.year = year
	}

	resetModule() {
		this.module = null
	}

	resetYear() {
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
