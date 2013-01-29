/**
* author: topa
* @class Třída Bomberman.Door
*/
Bomberman.Door = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Door",
	VERSION: "1.0"
});

Bomberman.Door.prototype.$constructor = function(position, size){
	this._position = position;
	this._size = size;
}

Bomberman.Door.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Door.prototype.getSize = function(){
	return this._size;
}