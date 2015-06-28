(function() {
    "use strict";
    var data = {
        dataLabels: ["Alpha", "Beta", "Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
        yLabel: "Military Designations",
        sets: [{
            xlabel: "Rounds of Ammunition",
            dataSet: [10,12,13,20,22,30,50]
        },
        {
            xlabel: "Promotions",
            dataSet: [5,8,10,2,3,4,1]
        }]
    };
    var lineGraph = new Grapher.LineGraph(data, {id: "lineGraph", height: 600, width: 600});
    lineGraph.draw();
})();
