import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class ManyResponseService {
	bar: EChartsOption = {}
	pie: EChartsOption = {}
	module: string
	year: string
	title: string

	legend = []
	xaxis = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	props = []

	series: any
	data8: any = []
	data13: any = []
	data14: any = []
	data16: any = []
	data18: any = []
	data26: any = []
	data27: any = []
	data43: any = []

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	sumModule: number
	sumYear: number
	sum:number
	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		// Récupérer les données de toutes les questions à choix multiple et les stocker dans des listes
		this.http.get('./assets/data/question8.json').subscribe((res: any) => this.data8 = res)
		this.http.get('./assets/data/question13.json').subscribe((res: any) => this.data13 = res)
		this.http.get('./assets/data/question14.json').subscribe((res: any) => this.data14 = res)
		this.http.get('./assets/data/question16.json').subscribe((res: any) => this.data16 = res)
		this.http.get('./assets/data/question18.json').subscribe((res: any) => this.data18 = res)
		this.http.get('./assets/data/question26.json').subscribe((res: any) => this.data26 = res)
		this.http.get('./assets/data/question27.json').subscribe((res: any) => this.data27 = res)
		this.http.get('./assets/data/question43.json').subscribe((res: any) => this.data43 = res)
	}

	// Récupérer les réponses pour toutes les promotions et pour une seule promotion
	getByModuleYear(data: any, oneYear: any) {
		if (!this.year) {
			this.props.map(p => {
				this.DFGSM2.push(data.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(data.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(data.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(data.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
			this.props.map(l => this.sum += data.filter(r => r[l] != "").length)
		}
		else {
			this.props.map(p => {
				oneYear.push({name:p,value:data.filter((r: any) => r[p] !== "" && r.annee == this.year).length})
				this.sum += data.filter((r: any) => r[p] !== "" && r.annee == this.year).length
			})
		}
	}

	question(question: string) {
		this.sum = 0
		this.sumYear = 0
		this.series = []
		this.DFGSM2 = []
		this.DFGSM3 = []
		this.DFASM1 = []
		this.DFASM2 = []
		let oneYear = []
		// Affecter les titre et les propriétés de chaque question
		if (question === 'question8') {
			this.title = "Qu'attendez-vous des enseignements magistraux (en amphi) ? "
			this.legend = ["Points importants", "Cas cliniques", "Algorithmes", "annales", "Contenu du referentiel",]
			this.props = ["contenu_du_referentiel", "annales", "algorithmes", "cas_cliniques", "points_importants",]
			//  filtrer selon la promotion
			this.getByModuleYear(this.data8, oneYear)
		}

		if (question === 'question13') {
			this.title = "Que vous ont apporté les ED ?  "
			this.legend = ["Rien", "Complement\nde cours", "Acquisition\ndu raisonnement", "Contextualisation"]
			this.props = ["rien", "complement_de_cours", "acquisition_du_raisonnement", "contextualisation"]

			this.getByModuleYear(this.data13, oneYear)
		}

		if (question === 'question14') {
			this.title = "Qu'attendez-vous des ED ? "
			this.legend = ["Points importants\net explications", "Cas cliniques", "Questions interactives", "Algorithmes", "Entrainements\ndocimologiques"]
			this.props = ["points_importants_et_Explications", "cas_cliniques", "questions_interactives", "algorithmes", "entrainements_docimologiques"]

			this.getByModuleYear(this.data14, oneYear)
		}

		if (question === 'question16') {
			this.title = "Le maintien d'un enseignement magistral (en amphi) pour transmettre le savoir de la discipline"
			this.legend = ["Sans\njustification", "Discipline\ndependant", "Ressources\nexterieures\ndependant", "Auto-apprentissage\ndependant", "Enseignant\ndependant"]
			this.props = ["sans_justification", "discipline_dependant", "ressources_exterieures_dependant", "auto-apprentissage_dependant", "enseignant_dependant"]

			this.getByModuleYear(this.data16, oneYear)
		}

		if (question === 'question18') {
			this.title = "Selon vous, l'adoption d'un auto-apprentissage mettant à votre disposition des ressources en ligne (pédagogie inversée)"
			this.legend = ["Non souhaitable", "Discipline dependant", "Adaptable\ntoutes disciplines", "Ressources\ndependant", "Necessite seances\ninteractives"]
			this.props = ["non_souhaitable", "discipline_dependant", "adaptable_toutes_disciplines", "ressources_dependant", "necessite_seances_interactives"]

			this.getByModuleYear(this.data18, oneYear)
		}

		if (question === 'question26') {
			this.title = "Les questions des contrôles continus sont en général :"
			this.legend = ["Faciles", "Difficiles", "En adéquation\navec les ressources\ndisponibles", "Sans adequation\navecressources", "utiles", "Sans avis"]
			this.props = ["Faciles", "Difficiles", "adequation_avec_ressources", "sans_adequation_avec_ressources", "utiles", "Sans avis"]

			this.getByModuleYear(this.data26, oneYear)
		}

		if (question === 'question27') {
			this.title = "Les questions des contrôles continus sont en général :"
			this.legend = ["Près fin\nenseignement", "À distance\nenseignement", "Séance\nrévision avant", "Sans avis"]
			this.props = ["pres_fin_enseignement", "a_distance_enseignement", "séance_révision_avant", "sans_avis"]

			this.getByModuleYear(this.data27, oneYear)
		}

		if (question === 'question43') {
			this.title = "Quelle(s) discipline(s) souhaiteriez-vous exercer ? "
			this.legend = [
				"Allergologie",
				"Medecine_et_Sante_au_travail",
				"Sante_publique",
				"Médecine_legale_et_expertises_medicales",
				
				"Genetique_medicale",
				"Anatomie_et_cytologie_pathologiques",
				"Medecine_nucleaire",
				"Biologie_medicale",
				"Medecine_physique_et_de_réadaptation",
				"Medecine_vasculaire",
				"Chirurgie_orale",
				"Chirurgie_vasculaire",
				"Urologie",
				"Neurochirurgie",
				"Gériatrie",
				"Rhumatologie",
				"Chirurgie_plastique_reconstructrice_et_esthetique",
				"Chirurgie_thoracique_et_cardiovasculaire",
				"Chirurgie_viscerale_et_digestive",
				"Hematologie",
				"Chirurgie_maxillo_faciale",
				"Radiologie_et_imagerie_medicale",
				"Dermatologie_et_venereologie",
				"Ophtalmologie",
				"Psychiatrie",
				"Pneumologie",
				"Oncologie",
				"Chirurgie_orthopedique_et_traumatologique",
				"Gynecologie_medicale",
				"Nephrologie",
				"Medecine_interne_et_immunologie_clinique",
				"Neurologie",
				"Maladies_infectieuses_et_tropicales",
				"Medecine_cardiovasculaire",
				"Gynécologie_obstetrique",
				"Medecine_urgence",
				"Pediatrie",
				"Medecine_generale",
				"Oto_rhino_laryngologie_chirurgie_cervico_faciale",
				"Anesthesie_reanimation",
				"Endocrinologie_diabetologie_nutrition",
				"Hepato_gastro_enterologie",
				"Medecine_intensive_reanimation",
				"Chirurgie_pédiatrique",
			]
			this.props = [
				"Allergologie",
				"Medecine_et_Sante_au_travail",
				"Sante_publique",
				"Médecine_legale_et_expertises_medicales",
				
				"Genetique_medicale",
				"Anatomie_et_cytologie_pathologiques",
				"Medecine_nucleaire",
				"Biologie_medicale",
				"Medecine_physique_et_de_réadaptation",
				"Medecine_vasculaire",
				"Chirurgie_orale",
				"Chirurgie_vasculaire",
				"Urologie",
				"Neurochirurgie",
				"Gériatrie",
				"Rhumatologie",
				"Chirurgie_plastique_reconstructrice_et_esthetique",
				"Chirurgie_thoracique_et_cardiovasculaire",
				"Chirurgie_viscerale_et_digestive",
				"Hematologie",
				"Chirurgie_maxillo_faciale",
				"Radiologie_et_imagerie_medicale",
				"Dermatologie_et_venereologie",
				"Ophtalmologie",
				"Psychiatrie",
				"Pneumologie",
				"Oncologie",
				"Chirurgie_orthopedique_et_traumatologique",
				"Gynecologie_medicale",
				"Nephrologie",
				"Medecine_interne_et_immunologie_clinique",
				"Neurologie",
				"Maladies_infectieuses_et_tropicales",
				"Medecine_cardiovasculaire",
				"Gynécologie_obstetrique",
				"Medecine_urgence",
				"Pediatrie",
				"Medecine_generale",
				"Oto_rhino_laryngologie_chirurgie_cervico_faciale",
				"Anesthesie_reanimation",
				"Endocrinologie_diabetologie_nutrition",
				"Hepato_gastro_enterologie",
				"Medecine_intensive_reanimation",
				"Chirurgie_pédiatrique",
			]

			this.getByModuleYear(this.data43, oneYear)
		}

		// Construire le tableau series data du graphique
		if (!this.year) {
			this.xaxis = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
			this.series = this.createSeries([
				{ name: "DFGSM2", data: this.DFGSM2 },
				{ name: "DFGSM3", data: this.DFGSM3 },
				{ name: "DFASM1", data: this.DFASM1 },
				{ name: "DFASM2", data: this.DFASM2 }
			], 'total', '')
		}
		else {
			let color
			this.xaxis = [this.year]
			if (question == "question43") {
				oneYear = oneYear.sort((a,b)=> {
					if (a.value > b.value) return 1
					if (a.value < b.value) return -1
					return 0
				})
			}
			if (this.year == "DFGSM2") color = "#5C7BD9"
			if (this.year == "DFGSM3") color = "#9FE080"
			if (this.year == "DFASM1") color = "#FFDC60"
			if (this.year == "DFASM2") color = "#FF7070"
			this.series = this.createSeries([
				{ name: this.year, data: oneYear },
			], '', color)
		}

		// Construire le graphique
		if (question == 'question43') this.bar = this.chartService.barH(this.title, "", this.xaxis, this.legend, this.series, this.sum)
		else this.bar = this.chartService.bar(this.title, "", this.xaxis, this.legend, this.series, this.sum)
		
	}

	selectYear(year) {
		if (year == 'Toutes les promotions') year = null
		this.year = year
	}

	resetYear() {
		this.year = null
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
