/**
* stone is rectangle
* author: topa
* @class Třída Bomberman.Stone
*/
Bomberman.Stone = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Stone",
	VERSION: "1.0"
});

Bomberman.Stone.prototype.$constructor = function(position, size){
	this._position = position;
	this._size = size;
}

Bomberman.Stone.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Stone.prototype.getSize = function(){
	return this._size;
}