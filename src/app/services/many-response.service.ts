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
	title:string

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
	data44: any = []
	data45: any = []

	DFGSM2 = []
	DFGSM3 = []
	DFASM1 = []
	DFASM2 = []

	constructor(
		private http: HttpClient,
		private chartService: ChartService
	) {
		// Récupérer les données de toutes les questions à choix multiple
		this.http.get('./assets/data/question8.json').subscribe((res: any) => this.data8 = res)
		this.http.get('./assets/data/question13.json').subscribe((res: any) => this.data13 = res)
		this.http.get('./assets/data/question14.json').subscribe((res: any) => this.data14 = res)
		this.http.get('./assets/data/question16.json').subscribe((res: any) => this.data16 = res)
		this.http.get('./assets/data/question18.json').subscribe((res: any) => this.data18 = res)
		this.http.get('./assets/data/question26.json').subscribe((res: any) => this.data26 = res)
		this.http.get('./assets/data/question27.json').subscribe((res: any) => this.data27 = res)
		this.http.get('./assets/data/question44.json').subscribe((res: any) => this.data44 = res)
		this.http.get('./assets/data/question45.json').subscribe((res: any) => this.data45 = res)
	}

	question(question:string) {
		this.series = []
		this.DFGSM2 = []
		this.DFGSM3 = []
		this.DFASM1 = []
		this.DFASM2 = []
		// Affecter les titre et les propriétés de chaque question
		if (question === 'question8'){
			this.title = "Qu’attendez-vous des enseignements magistraux (en amphi) ? (Plusieurs réponses possibles)"
			this.legend = ["Contenu du referentiel","annales", "Algorithmes","Cas cliniques","Points importants",]
			this.props = ["contenu_du_referentiel", "annales","algorithmes","cas_cliniques","points_importants",]
			//  filtrer selon la promotion
			this.props.map(p => {
				this.DFGSM2.push(this.data8.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data8.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data8.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data8.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}
		if (question === 'question13'){
			this.title = "Que vous ont apporté les ED ? (Plusieurs réponses possibles) "
			this.legend = ["Rien", "Complement de cours", "Acquisition du raisonnement", "Contextualisation"]
			this.props = ["rien", "complement_de_cours", "acquisition_du_raisonnement", "contextualisation"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data13.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data13.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data13.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data13.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}
		if (question === 'question14'){
			this.title = "Qu’attendez-vous des ED ? (Plusieurs réponses possibles)"
			this.legend = ["Points importants et explications", "Cas cliniques", "Questions interactives", "Algorithmes","Entrainements docimologiques"]
			this.props = ["points_importants_et_Explications", "cas_cliniques", "questions_interactives", "algorithmes","entrainements_docimologiques"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data14.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data14.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data14.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data14.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}
		if (question === 'question16'){
			this.title = "Le maintien d’un enseignement magistral (en amphi) pour transmettre le savoir de la discipline : (Plusieurs réponses possibles)"
			this.legend = ["Sans\njustification", "Discipline\ndependant", "Ressources\nexterieures\ndependant", "Auto-apprentissage\ndependant", "Enseignant\ndependant"]
			this.props = ["sans_justification", "discipline_dependant", "ressources_exterieures_dependant", "auto-apprentissage_dependant", "enseignant_dependant"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data16.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data16.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data16.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data16.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}
		if (question === 'question18'){
			this.title = "Selon vous, l’adoption d'un auto-apprentissage mettant à votre disposition des ressources en ligne (pédagogie inversée) : (Plusieurs réponses possibles)"
			this.legend = ["Non souhaitable", "Discipline dependant", "Adaptable\ntoutes disciplines", "Ressources dependant", "Necessite seances\ninteractives"]
			this.props = ["non_souhaitable", "discipline_dependant", "adaptable_toutes_disciplines", "ressources_dependant", "necessite_seances_interactives"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data18.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data18.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data18.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data18.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}

		if (question === 'question26'){
			this.title = "Les questions des contrôles continus sont en général :"
			this.legend = ["Faciles", "Difficiles", "En adéquation\navec les ressources\ndisponibles", "Sans adequation\navecressources", "utiles", "Sans avis"]
			this.props = ["Faciles", "Difficiles", "adequation_avec_ressources", "sans_adequation_avec_ressources", "utiles", "Sans avis"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data26.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data26.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data26.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data26.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}

		if (question === 'question27'){
			this.title = "Les questions des contrôles continus sont en général :"
			this.legend = ["Près fin\nenseignement", "À distance\nenseignement", "Séance\nrévision avant", "Sans avis"]
			this.props = ["pres_fin_enseignement", "a_distance_enseignement", "séance_révision_avant", "sans_avis"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data27.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data27.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data27.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data27.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}
		let seriePie = []
		if (question === 'question44'){
			this.title = "Quelle(s) discipline(s) souhaiteriez-vous exercer ? (Plusieurs réponses possibles)"
			this.legend = [
				"Chirurgie_maxillo_faciale",
				"Chirurgie_orale",
				"Chirurgie_orthopedique_et_traumatologique",
				"Chirurgie_pédiatrique",
				"Chirurgie_plastique_reconstructrice_et_esthetique",
				"Chirurgie_thoracique_et_cardiovasculaire",
				"Chirurgie_vasculaire",
				"Chirurgie_viscerale_et_digestive",
				"Gynécologie_obstetrique",
				"Neurochirurgie",
				"Ophtalmologie",
				"Oto_rhino_laryngologie_chirurgie_cervico_faciale",
				"Urologie",
				"Allergologie",
				"Anatomie_et_cytologie_pathologiques",
				"Anesthesie_reanimation",
				"Dermatologie_et_venereologie",
				"Endocrinologie_diabetologie_nutrition",
				"Genetique_medicale",
				"Gériatrie",
				"Gynecologie_medicale",
				"Hematologie",
				"Hepato_gastro_enterologie",
				"Maladies_infectieuses_et_tropicales",
				"Medecine_cardiovasculaire",
				"Medecine_urgence",
				"Medecine_et_Sante_au_travail",
				"Medecine_generale",
				"Medecine_intensive_reanimation",
				"Medecine_interne_et_immunologie_clinique",
				"Médecine_legale_et_expertises_medicales",
				"Medecine_nucleaire",
				"Medecine_physique_et_de_réadaptation",
				"Medecine_vasculaire",
				"Nephrologie",
				"Neurologie",
				"Oncologie",
				"Pediatrie",
				"Pneumologie",
				"Psychiatrie",
				"Radiologie_et_imagerie_medicale",
				"Rhumatologie",
				"Sante_publique",
				"Biologie_medicale",
			]
			this.props = [
				"Chirurgie_maxillo_faciale",
				"Chirurgie_orale",
				"Chirurgie_orthopedique_et_traumatologique",
				"Chirurgie_pédiatrique",
				"Chirurgie_plastique_reconstructrice_et_esthetique",
				"Chirurgie_thoracique_et_cardiovasculaire",
				"Chirurgie_vasculaire",
				"Chirurgie_viscerale_et_digestive",
				"Gynécologie_obstetrique",
				"Neurochirurgie",
				"Ophtalmologie",
				"Oto_rhino_laryngologie_chirurgie_cervico_faciale",
				"Urologie",
				"Allergologie",
				"Anatomie_et_cytologie_pathologiques",
				"Anesthesie_reanimation",
				"Dermatologie_et_venereologie",
				"Endocrinologie_diabetologie_nutrition",
				"Genetique_medicale",
				"Gériatrie",
				"Gynecologie_medicale",
				"Hematologie",
				"Hepato_gastro_enterologie",
				"Maladies_infectieuses_et_tropicales",
				"Medecine_cardiovasculaire",
				"Medecine_urgence",
				"Medecine_et_Sante_au_travail",
				"Medecine_generale",
				"Medecine_intensive_reanimation",
				"Medecine_interne_et_immunologie_clinique",
				"Médecine_legale_et_expertises_medicales",
				"Medecine_nucleaire",
				"Medecine_physique_et_de_réadaptation",
				"Medecine_vasculaire",
				"Nephrologie",
				"Neurologie",
				"Oncologie",
				"Pediatrie",
				"Pneumologie",
				"Psychiatrie",
				"Radiologie_et_imagerie_medicale",
				"Rhumatologie",
				"Sante_publique",
				"Biologie_medicale",
			]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data44.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data44.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data44.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data44.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
				// Une solutione alternative pour la question 44
				seriePie.push({name:p, value: this.data44.filter((r: any) => r[p] !== "").length})
			})
		}

		if (question === 'question45'){
			this.title = "Commentaires libres :"
			this.legend = ["Commentaires libres"]
			this.props = ["commentaires_libres"]
			
			this.props.map(p => {
				this.DFGSM2.push(this.data45.filter((r: any) => r[p] !== "" && r.annee == "DFGSM2").length)
				this.DFGSM3.push(this.data45.filter((r: any) => r[p] !== "" && r.annee == "DFGSM3").length)
				this.DFASM1.push(this.data45.filter((r: any) => r[p] !== "" && r.annee == "DFASM1").length)
				this.DFASM2.push(this.data45.filter((r: any) => r[p] !== "" && r.annee == "DFASM2").length)
			})
		}

		// Construire le tableau series data du graphique
		this.series = this.createSeries([
			{ name: "DFGSM2", data: this.DFGSM2 },
			{ name: "DFGSM3", data: this.DFGSM3 },
			{ name: "DFASM1", data: this.DFASM1 },
			{ name: "DFASM2", data: this.DFASM2 }
		])
		if (question === 'question45'){
			this.series = this.series.sort((a,b) => {
				if (a.data[0] > b.data[0]) return -1
				if (a.data[0] < b.data[0]) return 1
				return 0
			})
		} 
		console.log(this.series);
		
		// Construire le graphique
		this.bar = this.chartService.bar(this.title, "", this.xaxis, this.legend, this.series)
		this.pie = this.chartService.pie("", this.title, "", seriePie)
	}

	// Méthode pour construire le graphique
	createSeries(arr: any[]) {
		let series = []
		arr.map(val => {
			series.push({
				name: val.name,
				type: 'bar',
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
