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
	
	this._hasBomb = 1;
	this._rangeOfBomb = 3;

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
