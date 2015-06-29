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
				labels = data.dataSetLabels,
				dataSets = data.sets;


		}
    }
	Grapher.LineGraph = LineGraph;
})(Grapher);
