import Graph from './graph.js';

class LineGraph extends Graph {
	constructor(data, options) {
		super(data, options);
	}

	plot() {
		let data = this.Data,
			options = this.Options,
			dataSets = data.sets,
			ctx = this.context,
			xPoints = options.get('labelXPoints');

		dataSets.forEach(function (obj) {
			let [dataSet, strokeStyle, lineWidth] = [obj.dataSet, obj.strokeStyle, obj.lineWidth];
			// Begin Plot
			ctx.beginPath();
			ctx.strokeStyle = strokeStyle;
			ctx.lineWidth = lineWidth;
			for (var i = 0; i < dataSet.length; i++) {
				let point = Graph.getPoints(xPoints[i], dataSet[i], options);
				let nextPoint = Graph.getPoints(xPoints[i+ 1], dataSet[i+ 1], options);
				ctx.moveTo(point.x, point.y);
				ctx.lineTo(nextPoint.x, nextPoint.y);
			}
			ctx.stroke();

		});

	}
}
module.exports = LineGraph;
