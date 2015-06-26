(function($){
	/*jshint esnext: true */
	class Graph {
		constructor() {
			let canvas = document.createElement("canvas"),
				context = canvas.getContext("2d");
			canvas.height = 300;
			canvas.width = 300;
			document.body.appendChild(canvas);

			this.canvas = canvas;
			this.context = context;
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

		draw(dimensions='[0,0,100,100]', type='rectangle', fill='black') {
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
	$(document).ready(function(){
		let artBoard = new Graph();
		artBoard.draw([0,0, 100, 100], "rectangle", "#00FFCC");
		artBoard.draw([100,100, 100, 100], "rectangle", "#00FF00");
	});
})(jQuery);
