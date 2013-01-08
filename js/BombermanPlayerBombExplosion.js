/**
* author: topa
* @class Třída Bomberman.Player.Bomb.Explosion
*/
Bomberman.Player.Bomb.Explosion = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Player.Bomb.Explosion",
	VERSION: "1.0"
});

Bomberman.Player.Bomb.ExplodeTime = 2000; // 60 * 1 * 1000 , jak bude dlouho trvat vybuch, je treba jen pro vykresleni

Bomberman.Player.Bomb.Explosion.prototype.$constructor = function(bomb){
	this._bomb = bomb;
	this._coordinates = [];
	this._position = bomb.getPosition();
	this._size = bomb.getSize();
	this._explosionStart = Date.now();
	this._explosionTimeTo = this._explosionStart + Bomberman.Player.Bomb.ExplodeTime;
	this._initCoordinates();
}

Bomberman.Player.Bomb.Explosion.prototype.getPosition = function(){
	return this._position;
}

Bomberman.Player.Bomb.Explosion.prototype.getCoordinates = function(){
	return this._coordinates;
}

Bomberman.Player.Bomb.Explosion.prototype.getRange = function(){
	return this._bomb.getRangeExplosion();
}
// pravě probíhá výbuch
Bomberman.Player.Bomb.Explosion.prototype.runs = function(){
	return (Date.now() <= this._explosionTimeTo);
}

Bomberman.Player.Bomb.Explosion.prototype._initCoordinates = function(){
	var map = this._bomb.getPlayer().getMap();
	var coo = this._coordinates;
	var cellSize = this._size;
	var explosionPos = this._position;
	var rangeExplosion = this.getRange();
	var canIGenerate = {left: true, right: true, top: true, down: true};

	coo.push({x: explosionPos.x, y: explosionPos.y});

	for (var i = 1; i <= rangeExplosion; i++) {
		var posRight = {x: explosionPos.x + (i * cellSize), y: explosionPos.y};
		var posLeft = {x: explosionPos.x - (i * cellSize), y: explosionPos.y};
		var posTop = {x: explosionPos.x, y: explosionPos.y + (i * cellSize)};
		var posDown = {x: explosionPos.x, y: explosionPos.y - (i * cellSize)};

		if(map.isOnCellStone(posRight)) canIGenerate.right = false;
		if(map.isOnCellStone(posLeft)) canIGenerate.left = false;
		if(map.isOnCellStone(posTop)) canIGenerate.top = false;
		if(map.isOnCellStone(posDown)) canIGenerate.down = false;

		if(canIGenerate.right) coo.push(posRight);
		if(canIGenerate.left) coo.push(posLeft);
		if(canIGenerate.top) coo.push(posTop);
		if(canIGenerate.down) coo.push(posDown);

		if(map.isOnCellBox(posRight) && canIGenerate.right){
			canIGenerate.right = false;
			map.removeBox(posRight);	
		} 
		if(map.isOnCellBox(posLeft) && canIGenerate.left){
			canIGenerate.left = false;
			map.removeBox(posLeft);	
		} 
		if(map.isOnCellBox(posTop) && canIGenerate.top){
			canIGenerate.top = false;
			map.removeBox(posTop);	
		} 
		if(map.isOnCellBox(posDown) && canIGenerate.down){
			canIGenerate.down = false;
			map.removeBox(posDown);	
		} 
	}
}

