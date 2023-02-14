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
	title = "Quelles sont, selon vous, les raisons de la faible participation aux enseignements magistraux ?"

	xaxis = ['empty','Pas du tout','Très peu','Modérément','Totalement']
	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]

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
		this.http.get('./assets/data/question9.json')
			.subscribe((res: any) => {
				this.data = res
			})
	}

	getQuestion(res = [],val: string) {
		this.arr = []
		if (this.module == "Nombre heures trop important"){
			let arr1 = res.filter(r => r.nombre_heures_trop_important == "empty" && r.annee == val)
			let arr2 = res.filter(r => r.nombre_heures_trop_important == "Pas du tout" && r.annee == val)
			let arr3 = res.filter(r => r.nombre_heures_trop_important == "Très peu" && r.annee == val)
			let arr4 = res.filter(r => r.nombre_heures_trop_important == "Modérément"  && r.annee == val)
			let arr5 = res.filter(r => r.nombre_heures_trop_important == "Totalement" && r.annee == val)
			this.arr.push(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length)
		}
		if (this.module == "Faible valeur ajoutée"){
			let arr1 = res.filter(r => r.faible_valeur_ajoutee == "empty" && r.annee == val)
			let arr2 = res.filter(r => r.faible_valeur_ajoutee == "Pas du tout" && r.annee == val)
			let arr3 = res.filter(r => r.faible_valeur_ajoutee == "Très peu" && r.annee == val)
			let arr4 = res.filter(r => r.faible_valeur_ajoutee == "Modérément"  && r.annee == val)
			let arr5 = res.filter(r => r.faible_valeur_ajoutee == "Totalement" && r.annee == val)
			this.arr.push(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length)
		}
		if (this.module == "Perte temps transports"){
			let arr1 = res.filter(r => r.perte_temps_transports == "empty" && r.annee == val)
			let arr2 = res.filter(r => r.perte_temps_transports == "Pas du tout" && r.annee == val)
			let arr3 = res.filter(r => r.perte_temps_transports == "Très peu" && r.annee == val)
			let arr4 = res.filter(r => r.perte_temps_transports == "Modérément"  && r.annee == val)
			let arr5 = res.filter(r => r.perte_temps_transports == "Totalement" && r.annee == val)
			this.arr.push(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length)
		}
		if (this.module == "Accès ressources internet"){
			let arr1 = res.filter(r => r.acces_ressources_internet == "empty" && r.annee == val)
			let arr2 = res.filter(r => r.acces_ressources_internet == "Pas du tout" && r.annee == val)
			let arr3 = res.filter(r => r.acces_ressources_internet == "Très peu" && r.annee == val)
			let arr4 = res.filter(r => r.acces_ressources_internet == "Modérément"  && r.annee == val)
			let arr5 = res.filter(r => r.acces_ressources_internet == "Totalement" && r.annee == val)
			this.arr.push(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length)
		}
		if (this.module == "Rester concentre plus 2 heures"){
			let arr1 = res.filter(r => r.rester_concentre_plus_2_heures == "empty" && r.annee == val)
			let arr2 = res.filter(r => r.rester_concentre_plus_2_heures == "Pas du tout" && r.annee == val)
			let arr3 = res.filter(r => r.rester_concentre_plus_2_heures == "Très peu" && r.annee == val)
			let arr4 = res.filter(r => r.rester_concentre_plus_2_heures == "Modérément"  && r.annee == val)
			let arr5 = res.filter(r => r.rester_concentre_plus_2_heures == "Totalement" && r.annee == val)
			this.arr.push(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length)
		}
		if (this.module == "Stage journée complète"){
			let arr1 = res.filter(r => r.stage_journee_complete == "empty" && r.annee == val)
			let arr2 = res.filter(r => r.stage_journee_complete == "Pas du tout" && r.annee == val)
			let arr3 = res.filter(r => r.stage_journee_complete == "Très peu" && r.annee == val)
			let arr4 = res.filter(r => r.stage_journee_complete == "Modérément"  && r.annee == val)
			let arr5 = res.filter(r => r.stage_journee_complete == "Totalement" && r.annee == val)
			this.arr.push(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length)
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
				// 	show: true
				// },
				barGap: 0,
				data: val.data
			})
		})
		return series
	}
}
