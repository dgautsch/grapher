/*jshint esnext: true */
import LineGraph from "./modules/line-graph.js";

(function() {
    "use strict";
    var data = {
        dataSetLabels: ["Alpha", "Beta", "Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
        yLabel: "Promotion Rate",
        sets: [{
            label: "Days in Role",
            dataSet: [10,12,13,20,22,30,50,1000,120,130,20,22,300,50,50,10,12,123,20,22,30,50,50,10,12,13,20,22,30,500],
            strokeStyle: "orange",
            lineWidth: 2
        },
        {
            label: "Promotions",
            dataSet: [40,8,200,100,30,40,100],
            strokeStyle: "#CC000C",
            lineWidth: 3
        }]
    };
    var lineGraph = new LineGraph(data, {id: "lineGraph", height: 400, width: 600});
    lineGraph.render();
})();
