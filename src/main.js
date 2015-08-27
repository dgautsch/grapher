/*jshint esnext: true */
import LineGraph from "./modules/line-graph.js";

(function() {
    "use strict";
    var data = {
        dataSetLabels: ["Alpha", "Beta", "Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
        yLabel: "Military Designations",
        sets: [{
            label: "Days in Role",
            dataSet: [10,12,13,20,22,30,50]
        },
        {
            label: "Promotions",
            dataSet: [5,8,10,2,3,4,1]
        }]
    };
    var lineGraph = new LineGraph(data, {id: "lineGraph", height: 400, width: 600});
    lineGraph.scaffold();
    lineGraph.plot();
})();
