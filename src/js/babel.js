/*jshint esnext: true */
class Artboard {
	constructor(id) {
		if (typeof id !== "string") {
			return;
		}
		let canvas = document.getElementById(id),
			context = canvas.getContext("2d");

		this.canvas = canvas;
		this.context = context;
	}
}
class Pen {
	constructor(color='#000000', stroke='1px', type='circle') {
		this.color = color;
		this.stroke = stroke;
		this.type = type;
	}
	draw() {
		console.log(this);
	}
}
$(document).ready(function(){
	let artBoard = new Artboard("drawingBoard");
	let bluePen = new Pen("#0000FF", "3px", "square");
	console.log(artBoard);
	console.log(bluePen);
});
