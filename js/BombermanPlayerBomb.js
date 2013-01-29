/**
* author: topa
* @class Třída Bomberman.Player.Bomb
*/
Bomberman.Player.Bomb = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Player.Bomb",
	VERSION: "1.0"
});

Bomberman.Player.Bomb.BombTime = 3000; // 60 * 3 * 1000 , cas nez jebne bomba
Bomberman.Player.Bomb.ExplodeTime = 2000; // 60 * 1 * 1000 , jak bude dlouho trvat vybuch, je treba jen pro vykresleni

Bomberman.Player.Bomb.prototype.$constructor = function(player, position, size){
	this._position = position;
	this._size = size;
	this._detonator = Date.now() + Bomberman.Player.Bomb.BombTime; // rozbuska
	this._timeWhenExplode = null; // cas kdy bomba vybuchla
	this._player = player;
	this._exploded = false; // je vybychla ? 
	this._exploding = false; // zrovna ted vybuchuje, vybuch bude trvat Bomberman.Player.Bomb.ExplodeTime
}

Bomberman.Player.Bomb.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Player.Bomb.prototype.getSize = function(){
	return this._size;
}

Bomberman.Player.Bomb.prototype.getRangeExplosion = function(){
	return this._player.getRangeOfBomb();
}

Bomberman.Player.Bomb.prototype.getPlayer = function(){
	return this._player;
}

// je cas aby bomba vybuchla ?
Bomberman.Player.Bomb.prototype.isTimeForBoom = function(nowExplode){
	if((Date.now() >= this._detonator && !this._exploded) || (nowExplode === true && !this._exploded)){
		var audio = JAK.ServiceLocator.getService("audio");
		audio.play("explosion");
		
		this._setExploded();
		this._setTimeWhenExplode();
		return true;	
	} 
	return false;
}

// je ta bomba vybuchla ? 
Bomberman.Player.Bomb.prototype.isExploded = function(){
	return this._exploded;
}

// bomba explodovala
Bomberman.Player.Bomb.prototype._setExploded = function(){
	this.getPlayer().addBombToInventory();
	this._exploded = true;
}

// bomba prave vybuchla, tak si to pamatuj
Bomberman.Player.Bomb.prototype._setTimeWhenExplode = function(){
	this._timeWhenExplode = Date.now();
}



