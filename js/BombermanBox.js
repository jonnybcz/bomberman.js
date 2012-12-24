/**
* stone is rectangle
* author: topa
* @class Třída Bomberman.Box
*/
Bomberman.Box = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Box",
	VERSION: "1.0"
});

Bomberman.Box.prototype.$constructor = function(position, size){
	this._position = position;
	this._size = size;
}

Bomberman.Box.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Box.prototype.getSize = function(){
	return this._size;
}