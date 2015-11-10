Object.prototype.extend = function(obj) {
	/**
	 * Extends an object replacing the parents properties with the child's.
	 * This is used to extend the options during construction of the graph.
	 */
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			this[i] = obj[i];
		}
	}
};
class Graph {
	constructor(data, options) {
		if (!Graph.dataWasPassed(data)) {
			throw new Error("Cannot create a graph without data. You did not pass in data to plot.");
		}
		// Set the graph options overriding defaults
		this.data = data;
		this.options = {
			// Graph Defaults
			height: 300,
			width: 300,
			graphPadding: 30,
			font: "Arial",
			axisColor: "#282828",
			lineCap: 'butt',
			labelXPoints: [],
			onStart: function() {},
			onFinish: function() {}
		};
		this.options.extend(options);

		// Create the canvas, checking for null values
		this.canvas = document.getElementById(options.id);
		if (this.canvas === null || undefined) {
			throw new Error("You must create an html canvas with an ID and pass it in with the options.");
		}
		this.context = this.canvas.getContext("2d");

		// construct canvas dimensions
		this.canvas.height = options.height;
		this.canvas.width = options.width;

	}

	get Options() {
		return this.options;
	}
	set Options(updates) {
		this.options.extend(updates);
	}
	get Data() {
		return this.data;
	}
	set Data(updates) {
		this.data.extend(updates);
	}

	static dataWasPassed(data) {
		var keys = Object.keys(data);
		if (keys.length === 0) {
			return false;
		}
		return true;
	}
	
	static createRectangle(dimensions, fill) {
		[this.x, this.y] = [dimensions[0], dimensions[1]];
		[this.height, this.width] = [dimensions[2], dimensions[3]];
		this.fill = fill;
	}

	static createCircle(dimensions, fill) {
		[this.x, this.y] = [dimensions[0], dimensions[1]];
		[this.height, this.width] = [dimensions[2], dimensions[3]];
		this.fill = fill;
	}

	static getPoints(xAxis, yAxis, options) {
		var [x,y] = [xAxis, options.height - yAxis - options.graphPadding];
		return {
			x: x,
			y: y
		};
	}
	
	createPoint(dimensions = [0, 0, 100, 100], type = 'circle', fill = 'black') {
		/**
		 * @param {dimensions} an array containing the x,y pos values and dimensions of the drawn object
		 * @param {type} the type of object, rectangle or circle
		 * @param {fill} the fill/color of the object
		 */
		let shape;
		let ctx = this.context;
		if (typeof dimensions !== "object" && dimensions.length < 4) {
			return;
		}
		switch (type) {
			case "rectangle":
				shape = new Graph.createRectangle(dimensions, fill);
				ctx.fillStyle = shape.fill;
				ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
				break;
			case "circle":
				shape = new Graph.createCircle(dimensions, fill);
				ctx.fillStyle = shape.fill;
				ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
				break;
			case "line":
				shape = new Graph.createLine(dimensions, fill);
				ctx.fillStyle = shape.fill;
				ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
				break;
			default:
				break;
		}

	}

	setLabels(val) {
		let options = this.Options;
		let data = this.Data;
		let padding = options.graphPadding;
		let point = ((options.width - padding) / data.dataSetLabels.length) * val + (padding * 1.5);
		this.Options.labelXPoints.push(point); // store our points in the options;
		return point;
	}

	calcDataSetPoints() {
		let data = this.Data;
		let options = this.Options;
		let interval = options.labelXPoints.length;
		let pointsPerInterval;
		data.sets.forEach((obj) => {
			pointsPerInterval = obj.dataSet.length / interval;
			obj.pointsPerInterval = pointsPerInterval;		
		});
	}

	scaffold() {
		/**
		 * @param {options} graph options and data
		 * Scaffolds the graph labels, scales, and axes
		 */
		let ctx = this.context,
			canvas = this.canvas,
			data = this.Data,
			options = this.Options,
			padding = options.graphPadding,
			yLabel = data.yLabel,
			font = options.font,
			axisColor = options.axisColor;
		
		// draw axes
		ctx.beginPath();
		ctx.moveTo(padding,0);
		ctx.lineWidth = 1;
		ctx.strokeStyle = axisColor;
		ctx.lineTo(padding, canvas.height-padding);
		ctx.lineTo(canvas.width, canvas.height-padding);
		ctx.stroke();

		// write y axis label
		ctx.rotate(270 * Math.PI / 180);
		ctx.font = font;
		ctx.fillText(yLabel, -canvas.height/2, 10);
		ctx.setTransform(1, 0, 0, 1, 0, 0); // reset rotation

		// write x axis labels
		for (var i = 0; i < data.dataSetLabels.length; i++) {
			ctx.fillText(data.dataSetLabels[i], this.setLabels(i), options.height - padding + 20);
		}

		this.calcDataSetPoints();

	}
	plot() {
		throw new Error(`Graph has no plot method defined, use a subclass module.`);
	}
	render() {
		this.scaffold();
		this.plot();
	}
}
module.exports = Graph;