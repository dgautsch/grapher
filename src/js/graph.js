// Define Namesapce
var Grapher = Grapher || {};
(function(Grapher) {
	"use strict";
	/*jshint esnext: true */
	Object.prototype.extend = function(obj) {
		/**
		 * Extends an object replacing the parents properties with the child's
		 */
		if (Object.extend !== undefined) {
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					this[i] = obj[i];
				}
			}
		}
	};
	class Graph {
		constructor(data, options) {
			if (!Graph.checkData(data)) {
				throw new Error("Cannot create a graph without data. You did not pass in data to plot.");
			}
			this.data = data || {};
			this.options = {
				// Graph Defaults
				height: 300,
				width: 300,
				onStart: function() {},
				onFinish: function() {}
			};
			this.options.extend(options); // override default options from contstructor call

			this.canvas = document.getElementById(options.id);
			if (this.canvas === null || undefined) {
				throw new Error("You must create an html canvas with an ID and pass it in with the options.");
			}
			this.context = this.canvas.getContext("2d");

			// construct canvas dimensions
			this.canvas.height = options.height;
			this.canvas.width = options.width;
		}
		static checkData(data) {
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

		static createLine(dimensions, fill) {
			[this.x, this.y] = [dimensions[0], dimensions[1]];
			[this.height, this.width] = [dimensions[2], dimensions[3]];
			this.fill = fill;
		}

		static createBrush(dimensions = [0, 0, 100, 100], type = 'rectangle', fill = 'black') {
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
	}
	// Export to Namespace
	Grapher.Graph = Graph;
})(Grapher);
