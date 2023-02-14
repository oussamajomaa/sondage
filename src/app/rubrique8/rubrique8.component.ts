import { Component, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { OneModuleService } from '../services/one-module.service';
import { ManyResponseService } from '../services/many-response.service';

@Component({
  selector: 'app-rubrique8',
  templateUrl: './rubrique8.component.html',
  styleUrls: ['./rubrique8.component.css']
})
export class Rubrique8Component {
	bar: EChartsOption = {}
	pie: EChartsOption = {}
	isChart = false
	isPie = false
	questionNBR: string
	// questions = ["question36", "question37", "question38", "question39", "question40", "question41", "question42", "question43", "question44", "question45"]
	questions = ["question44"]


	constructor(private oneModule: OneModuleService, private manyReponse: ManyResponseService,) { }

	question(nbr) {
		this.questionNBR = nbr
		this.isChart = true

		if (this.questionNBR == "question36" || this.questionNBR == "question37" || this.questionNBR == "question39" || this.questionNBR == "question41" || this.questionNBR == "question42" || this.questionNBR == "question43") {
			this.oneModule.question(this.questionNBR)
			this.bar = this.oneModule.bar
			this.isPie = false
		}
		if (this.questionNBR == "question44") {
			this.isPie = true
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
			this.pie = this.manyReponse.pie
		}
		if (this.questionNBR == "question45") {
			this.isPie = false
			this.manyReponse.question(this.questionNBR)
			this.bar = this.manyReponse.bar
		}
	}
}
