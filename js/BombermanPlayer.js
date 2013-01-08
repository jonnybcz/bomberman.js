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
	this._killedMonsters = 0;
	this._howLongDoesMove = 250; 
	this._timeLastMove = null;

	this._hasBomb = 1;
	this._rangeOfBomb = 2;

	this._setTimeLastMove();
}

Bomberman.Player.prototype._getTimeLastMove = function(){
	return this._timeLastMove;
}

Bomberman.Player.prototype._setTimeLastMove = function(){
	this._timeLastMove = Date.now();
}

Bomberman.Player.prototype.getMap = function(){
	return this._map;
}

Bomberman.Player.prototype.getRangeOfBomb = function(){
	return this._rangeOfBomb;
}

Bomberman.Player.prototype.setRangeOfBomb = function(range){
	this._rangeOfBomb = range;
}

Bomberman.Player.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Player.prototype.setPosition = function(position){
	this._position = {x: position.x, y: position.y};
	this._setTimeLastMove();
}

Bomberman.Player.prototype.getKilledMonsters = function(){
	return this._killedMonsters;
}

Bomberman.Player.prototype.setKilledMonsters = function(count){
	this._killedMonsters = count;
}

// direction left, right, top, down
Bomberman.Player.prototype._makeStep = function(direction){
	if(this._getTimeLastMove() + this._howLongDoesMove <= Date.now()) this._map.canIMoveThere(direction, this);
}

Bomberman.Player.prototype._putBomb = function(){
	if(this._hasBomb > 0){
      		var bomb = new Bomberman.Player.Bomb(this, this.getPosition(), this._map.getCellSize());

		this._map.placeBomb(bomb);
      		this._bomb--;
	}
}
