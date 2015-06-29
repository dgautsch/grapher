/*jshint esnext: true */
// Define Namesapce
var Grapher = Grapher || {};
(function(Grapher){
	"use strict";
    class LineGraph extends Grapher.Graph {
        constructor(data, options) {
            super(data, options);
        }

        scaffold() {
			super.scaffold();
        }
    }
	Grapher.LineGraph = LineGraph;
})(Grapher);
