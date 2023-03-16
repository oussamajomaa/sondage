import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class Question9Service {
	bar: EChartsOption = {}
	module: string
	year: string
	title = "Quelles sont, selon vous, les raisons de la faible participation aux enseignements magistraux ?"

	xaxis = ['Pas du tout', 'Très peu', 'Modérément', 'Totalement']
	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]

	series: any
	data: any = []
	arr = []

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	nombre_heures_trop_important = []
	faible_valeur_ajoutee = []
	perte_temps_transports = []
	acces_ressources_internet = []
	rester_concentre_plus_2_heures = []
	stage_journee_complete = []

	pas_du_tout = []
	tres_peu = []
	moderement = []
	totalement = []
	sum:number

	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question9.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getByModule(res = [], val: string) {
		this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
		this.xaxis = ['Pas du tout', 'Très peu', 'Modérément', 'Totalement']
		this.sum = 0
		this.arr = []
		if (this.module == "Nombre heures trop important") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.nombre_heures_trop_important == x && r.annee == val).length))
			this.sum = res.filter(r => r.nombre_heures_trop_important != "empty").length			
		}
		if (this.module == "Faible valeur ajoutée") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.faible_valeur_ajoutee == x && r.annee == val).length))
			this.sum = res.filter(r => r.faible_valeur_ajoutee != "empty").length
		}
		if (this.module == "Perte temps transports") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.perte_temps_transports == x && r.annee == val).length))
			this.sum = res.filter(r => r.perte_temps_transports != "empty").length
		}
		if (this.module == "Accès ressources internet") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.acces_ressources_internet == x && r.annee == val).length))
			this.sum = res.filter(r => r.acces_ressources_internet != "empty").length
		}
		if (this.module == "Rester concentre plus 2 heures") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.rester_concentre_plus_2_heures == x && r.annee == val).length))
			this.sum = res.filter(r => r.rester_concentre_plus_2_heures != "empty").length
		}
		if (this.module == "Stage journée complète") {
			this.xaxis.map(x => this.arr.push(res.filter(r => r.stage_journee_complete == x && r.annee == val).length))
			this.sum = res.filter(r => r.stage_journee_complete != "empty").length
		}
		return this.arr
	}

	getByYear(res = [], val: string) {
		this.sum = 0
		this.xaxis = ["nombre_heures_trop_important", "faible_valeur_ajoutee", "perte_temps_transports", "acces_ressources_internet", "rester_concentre_plus_2_heures", "stage_journee_complete"]
		this.legend = ['Pas du tout', 'Très peu', 'Modérément', 'Totalement']
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
			this.xaxis = ['Pas du tout', 'Très peu', 'Modérément', 'Totalement']

			this.series = this.createSeries([
				{ name: "DFGSM2", data: this.DFGSM2 },
				{ name: "DFGSM3", data: this.DFGSM3 },
				{ name: "DFASM1", data: this.DFASM1 },
				{ name: "DFASM2", data: this.DFASM2 }
			])
			this.bar = this.chartService.bar(this.title, this.module, this.legend, this.xaxis, this.series, this.sum)
		}

		if (this.year) {
			this.pas_du_tout = this.getByYear(this.data, "Pas du tout")
			this.tres_peu = this.getByYear(this.data, "Très peu")
			this.moderement = this.getByYear(this.data, "Modérément")
			this.totalement = this.getByYear(this.data, "Totalement")
			this.xaxis = [
				"Faible\nvaleur ajoutée",
				"Stage\njournée complète",
				"Nombre heures\ntrop important",
				"Accès\nessources internet",
				"Rester concentre\nplus 2 heures",
				"Perte\ntemps transports",
			]
			this.legend = ['Totalement','Modérément','Très peu','Pas du tout' ]

			this.series = this.createSeries([
				{ name: "Totalement", data: this.totalement },
				{ name: "Modérément", data: this.moderement },
				{ name: "Très peu", data: this.tres_peu },
				{ name: "Pas du tout", data: this.pas_du_tout },
			])
			
			this.bar = this.chartService.bar(this.title, this.year, this.legend, this.xaxis, this.series, this.sum)
			if (this.year == "Toutes les promotions") {
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
				// 	show: true
				// },
				barGap: 0,
				data: val.data
			})
		})
		return series
	}
}
