/*jshint esnext: true */
class Person {
	constructor(biography, biology) {
		this.name = biography.name || '';
		this.job = biography.job || '';
		this.height = biology.height || '';
	}
	toString() {
		return this;
	}
}