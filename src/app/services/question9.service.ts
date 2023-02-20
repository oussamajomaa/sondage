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
	year:string
	title = "Quelles sont, selon vous, les raisons de la faible participation aux enseignements magistraux ?"

	xaxis = ['Pas du tout','Très peu','Modérément','Totalement']
	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]

	series: any
	data: any 			= []
	arr 				= []

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

	sumModule:number
	sumYear:number

	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		this.http.get('./assets/data/question9.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getByModule(res = [],val: string) {
		this.arr = []

		if (this.module == "Nombre heures trop important"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.nombre_heures_trop_important == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.nombre_heures_trop_important != "empty").length
		}
		if (this.module == "Faible valeur ajoutée"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.faible_valeur_ajoutee == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.faible_valeur_ajoutee != "empty").length
		}
		if (this.module == "Perte temps transports"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.perte_temps_transports == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.perte_temps_transports != "empty").length
		}
		if (this.module == "Accès ressources internet"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.acces_ressources_internet == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.acces_ressources_internet != "empty").length
		}
		if (this.module == "Rester concentre plus 2 heures"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.rester_concentre_plus_2_heures == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.rester_concentre_plus_2_heures != "empty").length
		}
		if (this.module == "Stage journée complète"){
			this.xaxis.map(x => this.arr.push(res.filter(r => r.stage_journee_complete == x && r.annee == val).length))
			this.sumModule = res.filter(r => r.stage_journee_complete != "empty").length
		}
		
		return this.arr
	}

	getByYear(res = [],val: string) {
		this.sumYear = 0
		this.legend = ["nombre_heures_trop_important", "faible_valeur_ajoutee", "perte_temps_transports", "acces_ressources_internet", "rester_concentre_plus_2_heures", "stage_journee_complete"]
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

		this.nombre_heures_trop_important = this.getByYear(this.data, "nombre_heures_trop_important")
		this.faible_valeur_ajoutee = this.getByYear(this.data, "faible_valeur_ajoutee")
		this.perte_temps_transports = this.getByYear(this.data, "perte_temps_transports")
		this.acces_ressources_internet = this.getByYear(this.data, "acces_ressources_internet")
		this.rester_concentre_plus_2_heures = this.getByYear(this.data, "rester_concentre_plus_2_heures")
		this.stage_journee_complete = this.getByYear(this.data, "stage_journee_complete")

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
				{ name: "nombre heures trop important", data: this.nombre_heures_trop_important },
				{ name: "faible valeur ajoutée", data: this.faible_valeur_ajoutee },
				{ name: "perte temps transports", data: this.perte_temps_transports },
				{ name: "accès ressources internet", data: this.acces_ressources_internet },
				{ name: "rester concentre plus 2 heures", data: this.rester_concentre_plus_2_heures },
				{ name: "stage journée complète", data: this.stage_journee_complete }
			])
			this.legend = [
				"nombre heures trop important", 
				"faible valeur ajoutée", 
				"perte temps transports", 
				"accès ressources internet", 
				"rester concentre plus 2 heures", 
				"stage journée complète"]
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
