// Define Namesapce
var Grapher = Grapher || {};
(function(Grapher){
	"use strict";
	/*jshint esnext: true */
    class LineGraph extends Grapher.Graph {
        constructor(data, options) {
            super(data, options);
        }

        draw() {
			console.log("Draw method of " + LineGraph.name + " called");
			console.log(this.data);
        }

        addData() {
			console.log("I'm the addData method");
        }

        removeData() {

        }

        reflow() {

        }
    }
	Grapher.LineGraph = LineGraph;
})(Grapher);
