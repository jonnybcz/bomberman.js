/**
* author: topa
* @class Třída Bomberman.Player
*/
Bomberman.Player = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Player",
	VERSION: "1.0"
});

Bomberman.Player.prototype.$constructor = function(nick, map){
	this._nick = nick;
	this._map = map;
	this._position = {x: 0, y: 0}
	this._ifMoveCallBack = null; // callback, kdyz se hrac pohne	
	
	this._hasBomb = 1;
	this._rangeOfBomb = 3;

	JAK.Events.addListener(window, "keydown", this, "_move");
}

Bomberman.Player.prototype.getRangeOfBomb = function(){
	return this._rangeOfBomb;
}

Bomberman.Player.prototype.setRangeOfBomb = function(range){
	this._rangeOfBomb = range;
}

Bomberman.Player.prototype._putBomb = function(){
	if(this._hasBomb > 0){
      		var bomb = new Bomberman.Player.Bomb(this, this.getPosition(), this._map.getCellSize());

		this._map.placeBomb(bomb);
      		this._bomb--;
	}
}

Bomberman.Player.prototype.setPosition = function(position){
	this._position = {x: position.x, y: position.y};
}

Bomberman.Player.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Player.prototype.ifMoveCallBack = function(f){
	this._ifMoveCallBack = f; // funkce v Bomberman.Map.canIMoveThere();
}

Bomberman.Player.prototype._move = function(e, elm){
	switch (e.keyCode) {
		case 65: // A 
		case 37:
			this._map.canIMoveThere("left", this);
			break;
		case 68: // D
		case 39: 
			this._map.canIMoveThere("right", this);
	      		break;
	      	case 87: // W
		case 38: 
			this._map.canIMoveThere("top", this);
	      		break;
	      	case 83: // S
		case 40: 
			this._map.canIMoveThere("down", this);
	      		break;
      		case 32: // space
      			this._putBomb();
	      		break;
	   default:
	   	console.log(e.keyCode);
		break;
	}
}
