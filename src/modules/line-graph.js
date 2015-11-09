import Graph from './graph.js';

class LineGraph extends Graph {
	constructor(data, options) {
		super(data, options);
	}

	plot() {
		let data = this.Data,
			options = this.Options,
			dataSets = data.sets,
			ctx = this.context;


		function getPoints(xAxis, yAxis) {
			var [x,y] = [xAxis, options.height - yAxis - options.graphPadding];
			return {
				x: x,
				y: y
			};
		}

		dataSets.forEach(function (obj) {
			let [dataSet, strokeStyle, lineWidth] = [obj.dataSet, obj.strokeStyle, obj.lineWidth];
			// Begin Plot
			ctx.beginPath();
			ctx.strokeStyle = strokeStyle;
			ctx.lineWidth = lineWidth;
			for (var i = 0; i < dataSet.length; i++) {
				let point = getPoints(options.xPoints[i], dataSet[i]);
				let nextPoint = getPoints(options.xPoints[i+ 1], dataSet[i+ 1]);
				ctx.moveTo(point.x, point.y);
				ctx.lineTo(nextPoint.x, nextPoint.y);
			}
			ctx.stroke();	

		});

	}
}
module.exports = LineGraph;
