import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './chart.service';
import { Axis, EChartsOption } from 'echarts';

@Injectable({
	providedIn: 'root'
})
export class OneModuleService {
	bar: EChartsOption = {}
	title: string
	subtitle: string
	legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
	xaxis = []
	xaxis1 = []
	series: any
	data4: any = []
	data5: any = []
	data6: any = []
	data7: any = []
	data10: any = []
	data11: any = []
	data12: any = []
	data15: any = []
	data20: any = []
	data21: any = []
	data22: any = []
	data23: any = []
	data24: any = []
	data25: any = []
	data36: any = []
	data37: any = []
	data38_DFASM1: any = []
	data38_DFASM2: any = []
	data38_DFGSM2: any = []
	data38_DFGSM3: any = []
	data39: any = []
	data40: any = []
	data41: any = []
	data42: any = []

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
		this.http.get(`./assets/data/question4.json`).subscribe((res: any) => this.data4 = res)
		this.http.get(`./assets/data/question5.json`).subscribe((res: any) => this.data5 = res)
		this.http.get(`./assets/data/question6.json`).subscribe((res: any) => this.data6 = res)
		this.http.get(`./assets/data/question7.json`).subscribe((res: any) => this.data7 = res)
		this.http.get(`./assets/data/question10.json`).subscribe((res: any) => this.data10 = res)
		this.http.get(`./assets/data/question11.json`).subscribe((res: any) => this.data11 = res)
		this.http.get(`./assets/data/question12.json`).subscribe((res: any) => this.data12 = res)
		this.http.get(`./assets/data/question15.json`).subscribe((res: any) => this.data15 = res)
		this.http.get(`./assets/data/question20.json`).subscribe((res: any) => this.data20 = res)
		this.http.get(`./assets/data/question21.json`).subscribe((res: any) => this.data21 = res)
		this.http.get(`./assets/data/question22.json`).subscribe((res: any) => this.data22 = res)
		this.http.get(`./assets/data/question23.json`).subscribe((res: any) => this.data23 = res)
		this.http.get(`./assets/data/question24.json`).subscribe((res: any) => this.data24 = res)
		this.http.get(`./assets/data/question25.json`).subscribe((res: any) => this.data25 = res)
		this.http.get(`./assets/data/question36.json`).subscribe((res: any) => this.data36 = res)
		this.http.get(`./assets/data/question37.json`).subscribe((res: any) => this.data37 = res)
		this.http.get(`./assets/data/question38_DFASM1.json`).subscribe((res: any) => this.data38_DFASM1 = res)
		this.http.get(`./assets/data/question38_DFASM2.json`).subscribe((res: any) => this.data38_DFASM2 = res)
		this.http.get(`./assets/data/question38_DFGSM2.json`).subscribe((res: any) => this.data38_DFGSM2 = res)
		this.http.get(`./assets/data/question38_DFGSM3.json`).subscribe((res: any) => this.data38_DFGSM3 = res)
		this.http.get(`./assets/data/question39.json`).subscribe((res: any) => this.data39 = res)
		this.http.get(`./assets/data/question40.json`).subscribe((res: any) => this.data40 = res)
		this.http.get(`./assets/data/question41.json`).subscribe((res: any) => this.data41 = res)
		this.http.get(`./assets/data/question42.json`).subscribe((res: any) => this.data42 = res)
	}

	getQuestion(res = [], val: string, question: string) {
		let arr = []
		if (question === "question4") {
			this.xaxis.map(x => arr.push(res.filter(r => r.ressource_preferee == x && r.annee == val).length))
			this.sum = res.filter(r => r.ressource_preferee != "empty").length

		}
		if (question === "question5") {
			this.xaxis.map(x => arr.push(res.filter(r => r.videos_visionnees == x && r.annee == val).length))
			this.sum = res.filter(r => r.videos_visionnees != "empty").length
		}
		if (question === "question6") {
			this.xaxis.map(x => arr.push(res.filter(r => r.presence_enseignement_magistral == x && r.annee == val).length))
			this.sum = res.filter(r => r.presence_enseignement_magistral != "empty").length
		}
		if (question === "question7") {
			this.xaxis.map(x => arr.push(res.filter(r => r.utilite_enseignement_magistral == x && r.annee == val).length))
			this.sum = res.filter(r => r.utilite_enseignement_magistral != "empty").length
		}
		if (question === "question10") {
			this.xaxis.map(x => arr.push(res.filter(r => r.volume_enseignement_magistralResponse == x && r.annee == val).length))
			this.sum = res.filter(r => r.volume_enseignement_magistralResponse != "empty").length
		}
		if (question === "question11") {
			this.xaxis.map(x => arr.push(res.filter(r => r.presence_aux_ED == x && r.annee == val).length))
			this.sum = res.filter(r => r.presence_aux_ED != "empty").length
		}
		if (question === "question12") {
			this.xaxis.map(x => arr.push(res.filter(r => r.utilite_des_ED == x && r.annee == val).length))
			this.sum = res.filter(r => r.utilite_des_ED != "empty").length
		}
		if (question === "question15") {
			this.xaxis.map(x => arr.push(res.filter(r => r.duree_des_ED == x && r.annee == val).length))
			this.sum = res.filter(r => r.duree_des_ED != "empty").length
		}
		if (question === "question20") {
			this.xaxis.map(x => arr.push(res.filter(r => r.nombre_intervenants_CM == x && r.annee == val).length))
			this.sum = res.filter(r => r.nombre_intervenants_CM != "empty").length
		}
		if (question === "question21") {
			this.xaxis.map(x => arr.push(res.filter(r => r.nombre_intervenants_ED == x && r.annee == val).length))
			this.sum = res.filter(r => r.nombre_intervenants_ED != "empty").length
		}
		if (question === "question22") {
			this.xaxis.map(x => arr.push(res.filter(r => r.preference_interactivite_presentiel == x && r.annee == val).length))
			this.sum = res.filter(r => r.preference_interactivite_presentiel != "empty").length
		}
		if (question === "question23") {
			this.xaxis.map(x => arr.push(res.filter(r => Math.round(r.preference_presentiel_versus_distanciel / 10) * 10 == x && r.annee == val).length))
			this.sum = res.filter(r => r.preference_presentiel_versus_distanciel != "empty").length
		}
		if (question === "question24") {
			this.xaxis.map(x => arr.push(res.filter(r => r.contrainte_controles_continus == x && r.annee == val).length))
			this.sum = res.filter(r => r.contrainte_controles_continus != "empty").length
		}
		if (question === "question25") {
			this.xaxis.map(x => arr.push(res.filter(r => r.timing_controles_continus == x && r.annee == val).length))
			this.sum = res.filter(r => r.timing_controles_continus != "empty").length
		}
		if (question === "question36") {
			this.xaxis.map(x => arr.push(res.filter(r => r.genre == x && r.annee == val).length))
			this.sum = res.filter(r => r.genre != "empty").length
		}
		if (question === "question37") {
			this.xaxis.map(x => arr.push(res.filter(r => Math.round(r.age / 10) * 10 == x && r.annee == val).length))
			this.sum = res.filter(r => r.age != "empty").length
		}
		// if (question === "question38") {
			
		// 	this.xaxis.map(x => arr.push(res.filter(r => r.Vous_avez_accédé_à_la_DFGSM2_par == x && r.annee == val).length))
		// 	this.sumModule = res.filter(r => r.Vous_avez_accédé_à_la_DFGSM2_par != "empty").length
		// }
		if (question === "question39") {
			this.xaxis.map(x => arr.push(res.filter(r => r.prepa_privee == x && r.annee == val).length))
			this.sum = res.filter(r => r.prepa_privee != "empty").length
		}
		if (question === "question40") {
			this.xaxis.map(x => arr.push(res.filter(r => r.auto_financement == x && r.annee == val).length))
			this.sum = res.filter(r => r.auto_financement != "empty").length
		}
		if (question === "question41") {
			this.xaxis.map(x => arr.push(res.filter(r => r.duree_transport == x && r.annee == val).length))
			this.sum = res.filter(r => r.duree_transport != "empty").length
		}
		if (question === "question42") {
			this.xaxis.map(x => arr.push(res.filter(r => r.pratique_souhaitee == x && r.annee == val).length))
			this.sum = res.filter(r => r.pratique_souhaitee != "empty").length
		}

		return arr
	}

	arr = []
	year: string
	getByYear(res = [], val: string, year: string) {
		this.arr = []
		this.xaxis.map(x => this.arr.push({name:x,value:res.filter(r => r[val] == x && r.annee == year).length}))
		this.sum = res.filter(r => r.annee == year).length
		return this.arr
	}

	question(question: string) {
		this.series = []
		let oneYear = []
		if (question === "question4") {
			this.title = "Si vous n'aviez qu'une seule ressource pour travailler, laquelle choisiriez-vous ?"
			this.xaxis = [
				
				"Ronéo rédigée \n par les étudiants \n de la promotion",
				"Diaporama ou \n pdf du cours",
				"Enregistrement \n vidéo des cours",
				"Enregistrement vidéo \n créé spécialement",
				"Polycopié local \n fait par \n les enseignants",
				"Référentiel \n national"
			]
			this.subtitle = "Ressource préferée"
			
			if (!this.year) {
				this.DFGSM2 = this.getQuestion(this.data4, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data4, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data4, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data4, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data4, 'ressource_preferee', this.year))
		}

		if (question === "question5") {
			this.title = "Concernant les enregistrements (vidéos/capsules), quelle proportion d'entre eux avez-vous visionné l'an passé ?"
			this.xaxis = ["Moins de 10%", "Entre 10% et <25%", "Entre 25% et <50%", "Entre 50% et <75%", "Plus de 75%"]
			this.subtitle = "Vidéos visionnées"
			
			if (!this.year) {
				this.DFGSM2 = this.getQuestion(this.data5, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data5, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data5, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data5, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data5, 'videos_visionnees', this.year))
		}

		if (question === "question6") {
			this.title = "Assistez-vous aux enseugnement magistraux (en amphi) ?"
			this.xaxis = ["Au cas par cas", "Presque toujours", "Quasiment jamais"]
			this.subtitle = "Présence enseignement magistral"

			if (!this.year) {
				this.DFGSM2 = this.getQuestion(this.data6, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data6, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data6, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data6, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data6, 'presence_enseignement_magistral', this.year))
		}

		if (question === "question7") {
			this.title = "Lorsque vous avez assisté aux cours magistraux (en amphi), vous ont-ils été plutôt utiles ?"
			this.xaxis = ["Non", "Oui", "Sans avis \njamais assisté \naux cours"]
			this.subtitle = "Utilité enseignement magistral"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data7, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data7, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data7, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data7, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data7, 'utilite_enseignement_magistral', this.year))
		}

		if (question === "question10") {
			this.title = "Concernant le volume horaire des enseignements magistraux (en amphi), voudriez-vous ?"
			this.xaxis = ["L'augmenter", "Le laisser inchangé", "Le réduire", "Sans avis"]
			this.subtitle = "Volume enseignement magistral Response"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data10, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data10, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data10, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data10, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data10, 'volume_enseignement_magistralResponse', this.year))
		}

		if (question === "question11") {
			this.title = "Assistez-vous aux enseignements dirigés (ED) ? "
			this.xaxis = ["Au cas par cas", "Presque toujours", "Quasiment jamais"]
			this.subtitle = "Présence aux ED"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data11, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data11, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data11, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data11, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data11, 'presence_aux_ED', this.year))
		}

		if (question === "question12") {
			this.title = "Lorsque vous avez assisté aux ED, vous ont-ils été plutôt utiles ?"
			this.xaxis = ["Non", "Oui", "Sans avis\n(jamais\nassisté aux ED)"]
			this.subtitle = "Utilité des ED"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data12, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data12, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data12, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data12, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data12, 'utilite_des_ED', this.year))
		}

		if (question === "question15") {
			this.title = "Concernant le volume horaire des ED, voudriez-vous ?"
			this.xaxis = ["Augmenter", "Inchanger", "Réduire", "Sans avis"]
			this.subtitle = "Durée des ED"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data15, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data15, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data15, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data15, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data15, 'duree_des_ED', this.year))
		}

		if (question === "question20") {
			this.title = "Concernant les cours magistraux (en amphi), préférez-vous qu'il y ait ?"
			this.xaxis = ["Au moins \n2 intervenants", "Sans avis", "Un seul intervenant"]
			this.subtitle = "Nombre intervenants CM"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data20, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data20, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data20, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data20, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data20, 'nombre_intervenants_CM', this.year))
		}

		if (question === "question21") {
			this.title = "Concernant les ED, préférez-vous qu'il y ait ?"
			this.xaxis = ["Au moins \n2 intervenants", "Sans avis", "Un seul intervenant"]
			this.subtitle = "Nombre intervenants ED"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data21, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data21, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data21, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data21, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data21, 'nombre_intervenants_ED', this.year))
		}

		if (question === "question22") {
			this.title = "Dans le cadre du présentiel, pour permettre l'interactivité, préférez-vous ? "
			this.xaxis = ["Sans avis", "Un enseignement\nen amphi\n(grand groupe)", "Un enseignement\nen salles\n(petits groupes)"]
			this.subtitle = "Préférence interactivité presentiel"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data22, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data22, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data22, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data22, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data22, 'preference_interactivite_presentiel', this.year))
		}

		if (question === "question23") {
			this.title = "Entre du « tout présentiel » (à gauche de l'échelle) et du « tout distanciel » (à droite de l'échelle), où situez-vous votre préférence ?"
			this.xaxis = [10, 20, 100, 30, 90, 60, 40, 80, 70, 50]
			this.subtitle = "Préférence présentiel versus distanciel"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data23, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data23, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data23, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data23, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data23, 'preference_presentiel_versus_distanciel', this.year))
		}

		if (question === "question24") {
			this.title = "Les contrôles continus sont :"
			this.xaxis = ["Utile", "Inutile", "Sans avis"]
			this.subtitle = "Contrainte controles continus"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data24, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data24, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data24, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data24, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data24, 'contrainte_controles_continus', this.year))
		}

		if (question === "question25") {
			this.title = "Les contrôles continus sont plus utiles :"
			this.xaxis = ["En début d’ED,\nobligeant un minimum\nde préparation\npersonnelle rendant\nl’ED plus performant", "En fin d’ED,\nvalorisant les acquis\nlors de la séance", "Sans avis"]
			this.subtitle = "Timing controles continus"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data25, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data25, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data25, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data25, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data25, 'timing_controles_continus', this.year))
		}

		if (question === "question36") {
			this.title = "Vous êtes:"
			this.xaxis = [ "Autre ou ne souhaite\npas répondre", "Un garçon", "Une fille"]
			this.subtitle = "genre"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data36, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data36, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data36, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data36, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data36, 'genre', this.year))
		}

		if (question === "question37") {
			this.title = "Votre âge:"
			// this.xaxis = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]
			this.xaxis1 = ["entre 35 - 42", "entre 25 - 34", "entre 18 - 24",]
			this.xaxis = [40, 30, 20]
			this.subtitle = "âge"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data37, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data37, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data37, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data37, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data37, 'age', this.year))
		}
		
		if (question === "question38") {
			this.sum = 0
			this.title = "Vous avez accédé à la DFGSM2 par :"
			let xx = [
				"Redoublant de PACES", 
				"Nouvelle-Calédonie / Luxembourg",
				"PACES adaptée oral",
				"Primant de PACES",
				"Alter Paces L2",
				"PACES adaptée écrit",
				"Passerelle",
			]
			this.xaxis = [
				"Redoublant\nde PACES", 
				"Nouvelle-Calédonie\nLuxembourg",
				"PACES\nadaptée oral",
				"Primant\nde PACES",
				"Alter\nPaces L2",
				"PACES\nadaptée écrit",
				"Passerelle",
			]
			this.subtitle = this.year
			if (this.year == "DFASM1"){
				xx.map(x => oneYear.push(this.data38_DFASM1.filter(r => r.Vous_avez_accédé_à_la_DFGSM2_par == x ).length))
				oneYear.map(v => this.sum += v)
			}
			if (this.year == "DFASM2"){
				xx.map(x => oneYear.push(this.data38_DFASM2.filter(r => r.Vous_avez_accédé_à_la_DFGSM2_par == x ).length))
				oneYear.map(v => this.sum += v)	
			}

			if (this.year == "DFGSM2"){
				xx.map(x => oneYear.push(this.data38_DFGSM2.filter(r => r.Vous_avez_accédé_à_la_DFGSM2_par == x ).length))
				oneYear.map(v => this.sum += v)
			}

			if (this.year == "DFGSM3"){
				xx.map(x => oneYear.push(this.data38_DFGSM3.filter(r => r.Vous_avez_accédé_à_la_DFGSM2_par == x ).length))
				oneYear.map(v => this.sum += v)				
			}
			
			
		}
		if (question === "question39") {
			this.title = "Lors de votre première année (PACES/PACESadaptée/PASS/LAS) avez-vous suivi une « prépa privée» :"
			this.xaxis = ["Oui", "Non"]
			this.subtitle = "prepa privée"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data39, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data39, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data39, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data39, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data39, 'prepa_privee', this.year))
		}

		if (question === "question40") {
			this.title = "Contribuez-vous à financer vos études par une activité extérieure ?"
			this.xaxis = ["Oui", "Non"]
			this.subtitle = "Auto financement"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data40, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data40, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data40, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data40, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data40, 'auto_financement', this.year))
		}

		if (question === "question41") {
			this.title = "Quelle est actuellement la durée moyenne de votre transport du domicile à la faculté ?"
			this.xaxis = ["entre 1 heure\net 2 heures", "entre 15\net 30 minutes", "entre 30 et\n60 minutes", "moins de 15 minutes", "plus de 2 heures"]
			this.subtitle = "Durée transport"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data41, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data41, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data41, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data41, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data41, 'duree_transport', this.year))
		}

		if (question === "question42") {
			
			this.title = "Quelle pratique médicale souhaiteriez-vous exercer ?"
			this.xaxis = ["Mixte\n(privé et public)", "Ne sait pas\npour le moment", "Secteur privé", "Secteur public"]
			this.subtitle = "Pratique souhaitée"

			if (!this.year){
				this.DFGSM2 = this.getQuestion(this.data42, "DFGSM2", question)
				this.DFGSM3 = this.getQuestion(this.data42, "DFGSM3", question)
				this.DFASM1 = this.getQuestion(this.data42, "DFASM1", question)
				this.DFASM2 = this.getQuestion(this.data42, "DFASM2", question)
			}
			else oneYear = (this.getByYear(this.data42, 'pratique_souhaitee', this.year))
		}		

		if (!this.year) {
			this.legend = ["DFGSM2", "DFGSM3", "DFASM1", "DFASM2"]
			this.series = this.createSeries([
				{ name: "DFGSM2", data: this.DFGSM2 },
				{ name: "DFGSM3", data: this.DFGSM3 },
				{ name: "DFASM1", data: this.DFASM1 },
				{ name: "DFASM2", data: this.DFASM2 }
			], 'total', '')
		}
		else {
			// let ar = []
			// this.xaxis.map((row,i) => {
			// 	ar.push({name:row,data:[oneYear[i]]})
			// })
			if (question == 'question23'){
				oneYear = oneYear.sort((a,b)=> {
					if (a.value > b.value) return 1
					if (a.value < b.value) return -1
					return 0
				})
			} 
			this.xaxis = []
			oneYear.map(item => this.xaxis.push(item.name))
			this.legend = [this.year]
			let color
			if (this.year == "DFGSM2") color = "#5C7BD9"
			if (this.year == "DFGSM3") color = "#9FE080"
			if (this.year == "DFASM1") color = "#FFDC60"
			if (this.year == "DFASM2") color = "#FF7070"
			this.series = this.createSeries([
				{ name: this.year, data: oneYear },
			], '', color)
		}
		if (question == 'question37') this.xaxis = this.xaxis1
		if (question == 'question23') this.bar = this.chartService.barH(this.title, this.subtitle, this.legend, this.xaxis, this.series, this.sum)
		else this.bar = this.chartService.bar(this.title, this.subtitle, this.legend, this.xaxis, this.series, this.sum)
	}



	selectYear(year) {
		if (year == 'Toutes les promotions') year = null
		this.year = year
	}

	resetYear(){
		this.year = null
	}

	createSeries(arr: any[], stack:string, color:string) {
		let series = []
		arr.map(val => {
			series.push({
				name: val.name,
				type: 'bar',
				stack: stack,
				// label: {
				// 	formatter: (val)=>{
				// 		return (val.value/this.sumYear*100).toFixed(2)+'%'
				// 	},
				// 	show: true
				//   },
				// label: {
				// 	show: true
				// },
				// stack: 'total',
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
