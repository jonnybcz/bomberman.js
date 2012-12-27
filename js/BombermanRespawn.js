/**
* stone is rectangle
* author: topa
* @class Třída Bomberman.Respawn
*/
Bomberman.Respawn = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Respawn",
	VERSION: "1.0"
});

Bomberman.Respawn.prototype.$constructor = function(position, size){
	this._position = position;
	this._size = size;
}

Bomberman.Respawn.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Respawn.prototype.getSize = function(){
	return this._size;
}