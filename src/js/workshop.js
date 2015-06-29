/*jshint esnext: true */
(function() {
    "use strict";
    var data = {
        dataSetLabels: ["Alpha", "Beta", "Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
        yLabel: "Military Designations",
        sets: [{
            label: "Rounds of Ammunition",
            dataSet: [10,12,13,20,22,30,50]
        },
        {
            label: "Promotions",
            dataSet: [5,8,10,2,3,4,1]
        }]
    };
    var lineGraph = new Grapher.LineGraph(data, {id: "lineGraph", height: 400, width: 600});
    lineGraph.scaffold();
    let newOptions = {height: 400, width: 800}
    lineGraph.Options = newOptions;
    debugger;
})();
