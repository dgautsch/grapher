(function(Grapher){
	"use strict";
    class LineGraph extends Grapher.Graph {
        constructor(data, options) {
            super(data, options);
        }

        scaffold() {
			super.scaffold();
			this.plot();
        }
		plot() {
			console.log("Ploting the line graph.");
			let data = this.Data,
				options = this.Options,
				labels = data.dataSetLabels,
				dataSets = data.sets,
				ctx = this.context;

			dataSets.forEach(function(obj){
				let [dataSet, label] = [obj.dataSet, obj.label];
				let [width, numOfPoints] = [options.width, dataSet.length];
				let [lastPoint, nextPoint, interval] = [dataSet[0], dataSet[1], width/numOfPoints];
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
				ctx.restore();

			});

		}
    }
	Grapher.LineGraph = LineGraph;
})(Grapher);
