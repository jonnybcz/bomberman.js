/**
* author: topa
* @class Třída Bomberman.Player.Human
*/
Bomberman.Player.Human = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Player.Human",
	VERSION: "1.0",
	EXTEND: Bomberman.Player
});

Bomberman.Player.Human.prototype.$constructor = function(nick, map){
	this.$super(nick, map);
	JAK.Events.addListener(window, "keydown", this, "_move");
}

Bomberman.Player.Human.prototype._move = function(e, elm){
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
		break;
	}
}