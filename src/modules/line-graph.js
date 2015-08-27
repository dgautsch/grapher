import Graph from './graph.js';

class LineGraph extends Graph {
	constructor(data, options) {
		super(data, options);
	}

	scaffold() {
		super.scaffold();
	}
	plot() {
		let data = this.Data,
			options = this.Options,
			labels = data.dataSetLabels,
			dataSets = data.sets,
			ctx = this.context;

		dataSets.forEach(function(obj){
			let [dataSet, label] = [obj.dataSet, obj.label];
			let [chartHeight, chartWidth] = [options.width, options.height];
			let numOfPoints = dataSet.length;
			let [lastPoint, nextPoint, interval] = [dataSet[0], dataSet[1], chartWidth/numOfPoints];
			let origin = 30;
			// Begin Plot
			ctx.beginPath();
			for (var i = 0; i < dataSet.length - 2; i++) {
				ctx.moveTo(origin, lastPoint);
				origin += interval;
				lastPoint = nextPoint;
				nextPoint = dataSet[i];
				ctx.lineTo(origin, nextPoint);
			}
			ctx.stroke();

		});

	}
}
module.exports = LineGraph;