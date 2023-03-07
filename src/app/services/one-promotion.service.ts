import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class OnePromotionService {

	bar: EChartsOption = {}
	module: string
	year: string
	title: string

	legend = []
	legend_17_19_DFASM1 = [
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
	legend_17_19_DFASM2 = [
		"Pédiatrie",
		"Oncologie",
		"Hématologie",
		"Médecine interne",
		"Néphrologie",
		"Endocrinologie",
		"Gériatrie",
		"Dermatologie",
		"Médecine générale",
		"Psychiatrie",
	]
	legend_17_19_DFGSM2 = [
		"Biologie",
		"Biophysique",
		"Génétique",
		"Immunologie",
		"Anglais médical",
		"EIA Cardio-vasculaire",
		"EIA Respiratoire",
		"EIA Hépato-gastro-entérologie",
		"EIA Neurologie-psychiatrie",
		"EIA Endocrinologie",
		"EIA Néphro-urologie",
		"EIA Locomoteur",
		"Sémiologie",
		"Psychiatrie",
		"Psychiatrie",
	]
	legend_17_19_DFGSM3 = [
		"Bactériologie",
		"Parasitologie",
		"Virologie",
		"ORL",
		"Ophtalmologie",
		"Chirurgie maxillo-faciale",
		"Dermatologie",
		"Pharmacologie",
		"Anatomo-pathologie",
		"Ethique",
		"Relation de soin",
		"Santé publique - LCA",
		"Neurologie",
		"Hépato-gastro-entérologie",
		"Cardiologie",
		"Pneumologie",
	]

	legend_28_29_30_DFASM1 = [
		"EIA Cardio-vasculaire",
		"EIA Respiratoire",
		"EIA Neuro-psychiatrie",
		"EIA Endocrino-métabolisme",
		"EIA Néphro-urologie",
		"EIA Hépato-gastro-entérologie",
		"EIA Locomoteur",
		"Sémiologie",
		"Génétique (DFGSM2)",
		"Biologie",
		"Biophysique",
		"Immunologie",
		"Anglais médical (DFGSM2)",
		"Cardiologie DFGSM3",
		"Pneumologie DFGSM3",
		"HGE DFGSM3",
		"Neurologie DFGSM3",
		"ORL",
		"OPH",
		"Chirurgie maxillo-faciale",
		"Dermatologie",
		"Santé publique LCA",
		"Bactériologie",
		"Virologie",
		"Parasitologie",
		"Anatomo-pathologie",
		"Pharmacologie",
		"Ethique",
		"Relation de soin (binome-jeux de rôle-Premed-Tere-Scoops)",
		"Urgences réanimation",
		"Rhumatologie",
		"Orthopédie",
		"Gynéco-obstétrique",
		"Urologie DFASM1",
		"Néphrologie DFASM1",
		"Endocrinologie",
		"Maladies infectieuses",
		"Handicap et dépendance",
		"Douleurs et soins palliatifs",
		"Médecine légale et travail",
		"Génétique appliquée à la médecine (DFASM1)",
		"C2i",
	]
	legend_28_29_30_DFASM2 = [
		"EIA Cardio-vasculaire",
		"EIA Respiratoire",
		"EIA Neuro-psychiatrie",
		"EIA Endocrino-métabolisme",
		"EIA Néphro-urologie",
		"EIA Hépato-gastro-entérologie",
		"EIA Locomoteur",
		"Sémiologie",
		"Génétique (DFGSM2)",
		"Biologie",
		"Biophysique",
		"Immunologie",
		"Anglais médical (DFGSM2)",
		"Cardiologie DFGSM3",
		"Pneumologie DFGSM3",
		"HGE DFGSM3",
		"Neurologie DFGSM3",
		"ORL",
		"OPH",
		"Chirurgie maxillo-faciale",
		"Dermatologie",
		"Santé publique LCA",
		"Bactériologie",
		"Virologie",
		"Parasitologie",
		"Anatomo-pathologie",
		"Pharmacologie",
		"Ethique",
		"Relation de soin (Binome-jeux de rôle-Premed-Tere-Scoops)",
		"Urgences réanimation",
		"Rhumatologie",
		"Orthopédie",
		"Gynéco-obstétrique",
		"Urologie DFASM1",
		"Néphrologie DFASM1",
		"Endocrinologie",
		"Maladies infectieuses",
		"Handicap et dépendance",
		"Douleurs et soins palliatifs",
		"Médecine légale et travail",
		"Génétique appliquée à la médecine (DFASM1)",
		"Pédiatrie",
		"Hématologie",
		"Oncologie",
		"Médecine interne",
		"Psychiatrie",
		"Gériatrie",
		"Médecine générale",
		"C2i",
	]
	legend_28_29_30_DFGSM2 = [
		"EIA Cardio-vasculaire",
		"EIA Respiratoire",
		"EIA Neuro-psychiatrie",
		"EIA Endocrino-métabolisme",
		"EIA Néphro-urologie",
		"EIA Hépato-gastro-entérologie",
		"EIA Locomoteur",
		"Sémiologie",
		"Génétique",
		"Biologie",
		"Biophysique",
		"Immunologie",
		"Anglais médical",
	]
	legend_28_29_30_DFGSM3 = [
		"EIA Cardio-vasculaire",
		"EIA Respiratoire",
		"EIA Neuro-psychiatrie",
		"EIA Endocrino-métabolisme",
		"EIA Néphro-urologie",
		"EIA Hépato-gastro-entérologie",
		"EIA Locomoteur",
		"Sémiologie",
		"Génétique (DFGSM2)",
		"Biologie",
		"Biophysique",
		"Immunologie",
		"Anglais médical (DFGSM2)",
		"Cardiologie DFGSM3",
		"Pneumologie DFGSM3",
		"HGE DFGSM3",
		"Neurologie DFGSM3",
		"ORL",
		"OPH",
		"Chirurgie maxillo-faciale",
		"Dermatologie",
		"Santé publique LCA",
		"Bactériologie",
		"Virologie",
		"Parasitologie",
		"Anatomo-pathologie",
		"Pharmacologie",
		"Ethique",
		"Relation de soin (Prémed-Tere-Scoops)"
	]
	xaxis = []
	props = []

	series: any

	data17_DFGSM2: any = []
	data17_DFGSM3: any = []
	data17_DFASM1: any = []
	data17_DFASM2: any = []

	data19_DFGSM2: any = []
	data19_DFGSM3: any = []
	data19_DFASM1: any = []
	data19_DFASM2: any = []

	data28_DFGSM2: any = []
	data28_DFGSM3: any = []
	data28_DFASM1: any = []
	data28_DFASM2: any = []

	data29_DFGSM2: any = []
	data29_DFGSM3: any = []
	data29_DFASM1: any = []
	data29_DFASM2: any = []

	data30_DFGSM2: any = []
	data30_DFGSM3: any = []
	data30_DFASM1: any = []
	data30_DFASM2: any = []


	sumModule: number
	sumYear: number
	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		// Récupérer les données de toutes les questions à choix multiple
		this.http.get('./assets/data/question17_DFGSM2.json').subscribe((res: any) => this.data17_DFGSM2 = res)
		this.http.get('./assets/data/question17_DFGSM3.json').subscribe((res: any) => this.data17_DFGSM3 = res)
		this.http.get('./assets/data/question17_DFASM1.json').subscribe((res: any) => this.data17_DFASM1 = res)
		this.http.get('./assets/data/question17_DFASM2.json').subscribe((res: any) => this.data17_DFASM2 = res)

		this.http.get('./assets/data/question19_DFGSM2.json').subscribe((res: any) => this.data19_DFGSM2 = res)
		this.http.get('./assets/data/question19_DFGSM3.json').subscribe((res: any) => this.data19_DFGSM3 = res)
		this.http.get('./assets/data/question19_DFASM1.json').subscribe((res: any) => this.data19_DFASM1 = res)
		this.http.get('./assets/data/question19_DFASM2.json').subscribe((res: any) => this.data19_DFASM2 = res)

		this.http.get('./assets/data/question28_DFGSM2.json').subscribe((res: any) => this.data28_DFGSM2 = res)
		this.http.get('./assets/data/question28_DFGSM3.json').subscribe((res: any) => this.data28_DFGSM3 = res)
		this.http.get('./assets/data/question28_DFASM1.json').subscribe((res: any) => this.data28_DFASM1 = res)
		this.http.get('./assets/data/question28_DFASM2.json').subscribe((res: any) => this.data28_DFASM2 = res)

		this.http.get('./assets/data/question29_DFGSM2.json').subscribe((res: any) => this.data29_DFGSM2 = res)
		this.http.get('./assets/data/question29_DFGSM3.json').subscribe((res: any) => this.data29_DFGSM3 = res)
		this.http.get('./assets/data/question29_DFASM1.json').subscribe((res: any) => this.data29_DFASM1 = res)
		this.http.get('./assets/data/question29_DFASM2.json').subscribe((res: any) => this.data29_DFASM2 = res)

		this.http.get('./assets/data/question30_DFGSM2.json').subscribe((res: any) => this.data30_DFGSM2 = res)
		this.http.get('./assets/data/question30_DFGSM3.json').subscribe((res: any) => this.data30_DFGSM3 = res)
		this.http.get('./assets/data/question30_DFASM1.json').subscribe((res: any) => this.data30_DFASM1 = res)
		this.http.get('./assets/data/question30_DFASM2.json').subscribe((res: any) => this.data30_DFASM2 = res)


		// this.http.get('./assets/data/question18.json').subscribe((res: any) => this.data18 = res)

	}

	getByModuleYear(data: any, oneYear: any) {
		this.legend.map(p => {
			oneYear.push(data.filter((r: any) => r[p] !== "").length)
			this.sumYear += data.filter((r: any) => r[p] !== "").length
		})
	}

	question(question: string) {
		this.sumModule = 0
		this.sumYear = 0
		this.series = []
		let oneYear = []
		let color
		// Affecter les titre et les propriétés de chaque question
		if (question === 'question17') {
			this.title = "Quelles sont les disciplines pour lesquelles l'enseignement magistral (en amphi) vous apporterait une plus-value ?"
			if (this.year == "DFASM1"){
				color = "#FFDC60"
				this.legend = this.legend_17_19_DFASM1
				this.getByModuleYear(this.data17_DFASM1, oneYear)
			}
			if (this.year == "DFASM2"){
				color = "#FF7070"
				this.legend = this.legend_17_19_DFASM2
				this.getByModuleYear(this.data17_DFASM2, oneYear)
			}

			if (this.year == "DFGSM2"){
				color = "#5C7BD9"
				this.legend = this.legend_17_19_DFGSM2
				this.getByModuleYear(this.data17_DFGSM2, oneYear)
			}

			if (this.year == "DFGSM3"){
				color = "#9FE080"
				this.legend = this.legend_17_19_DFGSM3
				this.getByModuleYear(this.data17_DFGSM3, oneYear)
			}
		}

		if (question === 'question19'){
			this.title = "Quelles sont les disciplines pour lesquelles un auto-apprentissage (pédagogie inversée) vous apporterait une plus-value ?"
			if (this.year == "DFASM1"){
				color = "#FFDC60"
				this.legend = this.legend_17_19_DFASM1
				this.getByModuleYear(this.data19_DFASM1, oneYear)
			}
			if (this.year == "DFASM2"){
				color = "#FF7070"
				this.legend = this.legend_17_19_DFASM2
				this.getByModuleYear(this.data19_DFASM2, oneYear)
			}

			if (this.year == "DFGSM2"){
				color = "#5C7BD9"
				this.legend = this.legend_17_19_DFGSM2
				this.getByModuleYear(this.data19_DFGSM2, oneYear)
			}

			if (this.year == "DFGSM3"){
				color = "#9FE080"
				this.legend = this.legend_17_19_DFGSM3
				this.getByModuleYear(this.data19_DFGSM3, oneYear)
			}
		}

		if (question === 'question28'){
			this.title = "Quelles sont les 3 disciplines que vous avez préférées en termes de contenu ?"
			if (this.year == "DFASM1"){
				color = "#FFDC60"
				this.legend = this.legend_28_29_30_DFASM1
				this.getByModuleYear(this.data28_DFASM1, oneYear)
			}
			if (this.year == "DFASM2"){
				color = "#FF7070"
				this.legend = this.legend_28_29_30_DFASM2
				this.getByModuleYear(this.data28_DFASM2, oneYear)
			}

			if (this.year == "DFGSM2"){
				color = "#5C7BD9"
				this.legend = this.legend_28_29_30_DFGSM2
				this.getByModuleYear(this.data28_DFGSM2, oneYear)
			}

			if (this.year == "DFGSM3"){
				color = "#9FE080"
				this.legend = this.legend_28_29_30_DFGSM3
				this.getByModuleYear(this.data28_DFGSM3, oneYear)
			}
		}

		if (question === 'question29'){
			this.title = "Quelles sont les 3 disciplines que vous avez préférées en termes de méthode pédagogique ?"
			if (this.year == "DFASM1"){
				color = "#FFDC60"
				this.legend = this.legend_28_29_30_DFASM1
				this.getByModuleYear(this.data29_DFASM1, oneYear)
			}
			if (this.year == "DFASM2"){
				color = "#FF7070"
				this.legend = this.legend_28_29_30_DFASM2
				this.getByModuleYear(this.data29_DFASM2, oneYear)
			}

			if (this.year == "DFGSM2"){
				color = "#5C7BD9"
				this.legend = this.legend_28_29_30_DFGSM2
				this.getByModuleYear(this.data29_DFGSM2, oneYear)
			}

			if (this.year == "DFGSM3"){
				color = "#9FE080"
				this.legend = this.legend_28_29_30_DFGSM3
				this.getByModuleYear(this.data29_DFGSM3, oneYear)
			}
		}

		if (question === 'question30'){
			this.title = "Quelles sont les 3 disciplines pour lesquelles vous avez le plus retenu d'informations / vous vous sentez le plus à l'aise ?"
			if (this.year == "DFASM1"){
				color = "#FFDC60"
				this.legend = this.legend_28_29_30_DFASM1
				this.getByModuleYear(this.data30_DFASM1, oneYear)
			}
			if (this.year == "DFASM2"){
				color = "#FF7070"
				this.legend = this.legend_28_29_30_DFASM2
				this.getByModuleYear(this.data30_DFASM2, oneYear)
			}

			if (this.year == "DFGSM2"){
				color = "#5C7BD9"
				this.legend = this.legend_28_29_30_DFGSM2
				this.getByModuleYear(this.data30_DFGSM2, oneYear)
			}

			if (this.year == "DFGSM3"){
				color = "#9FE080"
				this.legend = this.legend_28_29_30_DFGSM3
				this.getByModuleYear(this.data30_DFGSM3, oneYear)
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
