import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ChartService {

	constructor() { }
	optionScatter: any
	optionBar: any
	optionBarH:any
	optionPie: any
	optionDonut: any

	scatter(reponse: any, legend: any, pos: any, neg: any) {
		this.optionScatter = {
			title: {
				text: `Nombre d'étudiants ${pos.length} - ${reponse}`,
				// subtext: reponse,
				left: 'center'
			},
			xAxis: {},
			yAxis: {},
			legend: {
				data: legend,
				padding: 30,

			},
			tooltip: {
				trigger: 'item',
				formatter: 'nombre de mots {b}: {c}'
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'center',
				feature: {
					mark: { show: true },
					// dataView: { show: true, readOnly: false },
					// restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			dataZoom: {
				start: 10,
				type: "inside"
			},
			series: [
				{
					name: 'Positive',
					symbolSize: 14,
					data: pos,
					type: 'scatter',
					itemStyle: {
						color: '#6C97BE',
					}
				},
				{
					name: 'Negative',
					symbolSize: 14,
					data: neg,
					type: 'scatter',
					itemStyle: {
						color: '#ff7f7f',
					},
				},
			]
		};
		return this.optionScatter
	}

	bar(title: string,subtext:string, legend: any, xAxis: any, series: any) {
		this.optionBar = {
			title: {
				text: title,

				subtext: subtext,
				left: 'center',
				subtextStyle: {
					fontSize: 24,
					fontWeight: 'bolder',
					color: "#A9A9A9"
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} : {c}'
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'top',
				padding: 30,
				feature: {
					mark: { show: true },
					// dataView: { show: true, readOnly: false },
					magicType: { show: true, type: ['stack'] },
					// restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			legend: {
				data: legend,
				orient: 'vertical',
				right: 10,
				top: 'center'
			},
			yAxis: {
				type: 'category',
				data: xAxis,
				axisLabel: {
					// overflow: 'truncate',
					// interval: 3,
					// rotate: 45,
					// inside:true,	
				},
			},
			xAxis: {
				type: 'value',
			},
			dataZoom: {
				start: 0,
				type: "inside"
			},
			series: series
		};
		return this.optionBar
	}

	barH(title: string, subtext:string,legend: any, xAxis: any, series: any) {
		this.optionBarH = {
			title: {
				text: title,
				subtext: subtext,
				left: 'center',
				subtextStyle: {
					fontSize: 20,
					fontWeight: 'bolder',
					color: "#A9A9A9"
				}
				
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} : {c}'
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'top',
				feature: {
					mark: { show: true },
					// dataView: { show: true, readOnly: false },
					magicType: { show: true, type: ['stack'] },
					// restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			legend: {
				data: legend,
				orient: 'vertical',
				right: 10,
				top: 'center'
			},
			yAxis: {
				type: 'category',
				data: xAxis,
				axisLabel: {
					overflow: 'truncate',
					interval: 0,
					align:"right"
					// rotate: 30,
					// inside:true,	
				},
			},
			xAxis: {
				type: 'value',
			},
			dataZoom: {
				start: 0,
				type: "inside"
			},
			series: series
		};
		return this.optionBarH
	}

	donut(subtext, title, name, series: any) {
		this.optionDonut = {
			title: {
				text: title,
				subtext: subtext,
				left: 'center',
				subtextStyle: {
					fontSize: 20,
					fontWeight: 'bolder',
					color: "#A9A9A9"
				}
			},
			tooltip: {
				trigger: 'item'
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'top',
				feature: {
					// mark: { show: true },
					// dataView: { show: true, readOnly: false },
					saveAsImage: { show: true }
				}
			},
			legend: {
				orient: 'vertical',
				right: 10,
				top: 'center'
			},
			series: [
				{
					name: name,
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 40,
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: series
				}
			]
		}
		return this.optionDonut
	}


	pie(subtext, title, name, series: any) {
		this.optionPie = {

			title: {
				text: title,
				subtext: subtext,
				left: 'center',
				subtextStyle: {
					fontSize: 20,
					fontWeight: 'bolder',
					color: "#A9A9A9"
				}
			},
			tooltip: {
				trigger: 'item',

			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'top',
				feature: {
					mark: { show: true },
					// dataView: { show: true, readOnly: false },
					saveAsImage: { show: true }
				}
			},
			// legend: {
			// 	// padding:40
			// },
			series: [
				{
					name: name,
					type: 'pie',
					top: '10%',
					radius: '90%',
					data: series,

					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		}
		return this.optionPie
	}

}
