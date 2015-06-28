// Define Namesapce
var Grapher = Grapher || {};
(function(Grapher){
	"use strict";
	/*jshint esnext: true */
	class Graph {
		/**
		 * Creates a new canvas element in the document
		 */
		constructor(data, options) {
			let canvas = document.createElement("canvas"),
				context = canvas.getContext("2d");

			this.canvas = canvas;
			this.context = context;
			this.data = data;
			this.options = options || {
				height: 300,
				width: 300,
				onStart: function(){},
				onFinish: function(){}
			};

			// construct canvas
			canvas.height = options.height;
			canvas.width = options.width;
			document.body.appendChild(canvas);
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

		drawShape(dimensions=[0,0,100,100], type='rectangle', fill='black') {
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
					break;
				case "line":
					shape = new Graph.createLine(dimensions, fill);
					break;
				default:
					break;
			}

		}
	}
	// Export to Namespace
	Grapher.Graph = Graph;
})(Grapher);
