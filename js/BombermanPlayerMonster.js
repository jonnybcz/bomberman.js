/**
* author: topa
* @class Třída Bomberman.Player.Monster
*/
Bomberman.Player.Monster = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Player.Monster",
	VERSION: "1.0",
	EXTEND: Bomberman.Player
});

Bomberman.Player.Monster.prototype.$constructor = function(nick, map){
	 this.$super(nick, map);
}

Bomberman.Player.Monster.prototype.generateMove = function(){
	var map = this._map;
	map.canIMoveThere(this._getDirection(Math.floor(Math.random() * (4 - 1 + 1)) + 1), this);
}

Bomberman.Player.Monster.prototype._getDirection = function(number){
	switch (number) {
		case 1:
			return "left";
		case 2:
			return "right";
		case 3:
			return "top";
		case 4:
			return "down";
	}
}


