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
}

