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
	 this._kindMonster = "";
	 this._setKindOfMonster();
}

Bomberman.Player.Monster.prototype.getKind = function(){
	return this._kindMonster;
}

Bomberman.Player.Monster.prototype.generateMove = function(){
	this._makeStep(this._getDirection(Math.floor(Math.random() * (4 - 1 + 1)) + 1));
}

Bomberman.Player.Monster.prototype._setKindOfMonster = function(){
	var monsters = ["ghost", "spectre", "squid", "swallow", "terror"];
	var randomNumber = Math.floor(Math.random() * (monsters.length - 1 + 1)) + 1;
	
	this._kindMonster = monsters[randomNumber];
}

Bomberman.Player.prototype.kill = function(){
	var audio = new Bomberman.Audio();
	audio.play("killPlayer");
	
	this._dead = true;
}

Bomberman.Player.Monster.prototype._getDirection = function(number){
	switch (number) {
		case 1:
			return "left";
		case 2:
			return "right";
		case 3:
			return "up";
		case 4:
			return "down";
	}
}


