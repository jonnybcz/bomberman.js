/**
* author: topa
* @class Třída Bomberman.Map
*/
Bomberman.Map = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Map",
	VERSION: "1.0"
});

Bomberman.Map.prototype.$constructor = function(canvas, width, height, cellSize){
	this._canvas = canvas;
	this._width = width;
	this._height = height;
	this._columns = width / cellSize;
	this._rows = height / cellSize;
	this._cellSize = cellSize;

	this._stones = [];
	this._boxes = [];
	this._bombs = [];
	this._explosions = []; // tady se presouva po vybuchnuti bomba
	this._players = [];
	this._respawns = [];

	this._canvas.width = width;
	this._canvas.height = height;
	
	this._buildStones();
	this._buildBoxes();
	this._buildRespawns();
}

Bomberman.Map.prototype.getCanvas = function(){
	return this._canvas;
}

Bomberman.Map.prototype.getStones = function(){
	return this._stones;
}

Bomberman.Map.prototype.getPlayers = function(){
	return this._players;
}

Bomberman.Map.prototype.getRespawns = function(){
	return this._respawns;
}

Bomberman.Map.prototype.getBombs = function(){
	return this._bombs;
}

Bomberman.Map.prototype.getExplosions = function(){
	return this._explosions;
}

Bomberman.Map.prototype.getBoxes = function(){
	return this._boxes;
}

Bomberman.Map.prototype.getCellSize = function(){
	return this._cellSize;
}

Bomberman.Map.prototype.removeBox = function(position){
	var boxes = this.getBoxes();
	var tmp = [];

	for (var i = 0; i < boxes.length; i++) {
		var boxPos = boxes[i].getPosition();

		if(!(boxPos.x == position.x && boxPos.y == position.y)) tmp.push(boxes[i]);
	}

	this._boxes = tmp;
}

Bomberman.Map.prototype.refresh = function(){
	var players = this._players;
	this._removeExplodedBombs();
	this._removeExplosions();

	for (var i = 0; i < players.length; i++) {
		if(players[i] instanceof Bomberman.Player.Monster) players[i].generateMove();
	}

	var render = new Bomberman.Map.Render(this);
	render.canvas();
}

Bomberman.Map.prototype._removeExplodedBombs = function(){
	var bombs = this._bombs;
	var tmp = [];

	for (var i = 0; i < bombs.length; i++) if(bombs[i].isExploded()) tmp.push(i);

	var diff = 0;
	for (var i = 0; i < tmp.length; i++){
		this._explosions.push(new Bomberman.Player.Bomb.Explosion(bombs[i]));
		bombs.splice(tmp[i], 1);
		diff++;
	}
}

Bomberman.Map.prototype._removeExplosions = function(){
	var explosions = this._explosions;
	var tmp = [];

	for (var i = 0; i < explosions.length; i++) if(!explosions[i].runs()) tmp.push(i);

	var diff = 0;
	for (var i = 0; i < tmp.length; i++){
		explosions.splice(tmp[i], 1);
		diff++;
	}
}

Bomberman.Map.prototype._buildStones = function(){
	var columns = this._columns;

	// top wall
	for (var i = 0; i < columns; i++) this._stones.push(new Bomberman.Stone({x: (i * this._cellSize), y: 0}, this._cellSize));
	// bottom wall
	for (var i = 0; i < columns; i++) this._stones.push(new Bomberman.Stone({x: (i * this._cellSize), y: (this._height - this._cellSize)}, this._cellSize));
	// left wall
	for (var i = 0; i < columns; i++) this._stones.push(new Bomberman.Stone({x: 0, y: (this._cellSize * i)}, this._cellSize));
	// right wall
	for (var i = 0; i < columns; i++) this._stones.push(new Bomberman.Stone({x: (this._width - this._cellSize), y: (this._cellSize * i)}, this._cellSize));
	// buildStones rows
	for (var i = 1; i < this._columns; i++) {
		for (var j = 1; j < this._rows; j++) {
			if(i % 2 && j % 2) this._stones.push(new Bomberman.Stone({x: (i+1) * this._cellSize, y: (j+1) * this._cellSize}, this._cellSize));
		}
	}	
}

Bomberman.Map.prototype._buildBoxes = function(){
	var boxes = this._boxes;
	var columns = this._columns;
	var rows = this._rows;
	var cellSize = this._cellSize;
	var chancePutBox = 9; // 0 / 10 , cim vetsi cislo tim vetsi sance na polozeni bednicky

	for (var i = 1; i <= columns; i++) {
		for (var j = 1; j <= rows; j++) {
			var pos = {x: i * cellSize, y: j * cellSize};
			if(this._isCellEmpty(pos) && Math.random() * (10 - 0) + 0 < chancePutBox) boxes.push(new Bomberman.Box(pos, cellSize));	
		}
	}
}

Bomberman.Map.prototype._buildRespawns = function(){
	var respawns = this._respawns;
	var columns = this._columns;
	var rows = this._rows;

	respawns.push(new Bomberman.Respawn({x: this._cellSize, y: this._cellSize}, this._cellSize));
	for (var i = 1; i < columns; i++) {
		for (var j = 1; j < rows; j++) {
			if(!(i % 3) && !(j % 3)) respawns.push(new Bomberman.Respawn({x: i * this._cellSize, y: j * this._cellSize}, this._cellSize));
		}
	}	

	respawns.reverse();
}

Bomberman.Map.prototype._removeBoxesAroundPlayer = function(playerPos){
	var boxes = this._boxes;
	var cellSize = this._cellSize;
	var tmp = [];

	for (var i = 0; i < boxes.length; i++) {
		var boxPos = boxes[i].getPosition();

		if(playerPos.x + (1 * cellSize) == boxPos.x && playerPos.y == boxPos.y) tmp.push(i);
		if(playerPos.x - (1 * cellSize) == boxPos.x && playerPos.y == boxPos.y) tmp.push(i);
		if(playerPos.x == boxPos.x && playerPos.y + (1 * cellSize) == boxPos.y) tmp.push(i);
		if(playerPos.x == boxPos.x && playerPos.y - (1 * cellSize) == boxPos.y) tmp.push(i);
	}

	var diff = 0;
	for (var i = 0; i <= tmp.length; i++){
		boxes.splice(tmp[i] - diff, 1);	
		diff++;
	} 
}

Bomberman.Map.prototype.addPlayer = function(player){
	var respawns = this.getRespawns();
	var respawnPos = respawns.pop().getPosition();
	
	player.setPosition(respawnPos);
	this._players.push(player);
	this._removeBoxesAroundPlayer(player.getPosition());
}

Bomberman.Map.prototype.canIMoveThere = function(direction, player){
	var pos = player.getPosition();

	switch (direction) {
		case "left":
		   	var nPos = {x: pos.x - this._cellSize, y: pos.y};
		   	
		   	if(this._isCellEmpty(nPos)) player.setPosition(nPos);
		      	
		      	break;

		case "right":
			var nPos = {x: pos.x + this._cellSize, y: pos.y};
		   	
			if(this._isCellEmpty(nPos)) player.setPosition(nPos);
		      	
			break;

		case "up":
			var nPos = {x: pos.x, y: pos.y - this._cellSize};
		   	
			if(this._isCellEmpty(nPos)) player.setPosition(nPos);
		      	
			break;

		case "down":
			var nPos = {x: pos.x, y: pos.y + this._cellSize};
		   	
			if(this._isCellEmpty(nPos)) player.setPosition(nPos);
		      	
			break;

	default:
	
		break;
	}

	return true; // @todo
}

Bomberman.Map.prototype.placeBomb = function(bomb, player){
	this._bombs.push(bomb);
}

Bomberman.Map.prototype.isOnCellStone = function(position){
	var stones = this.getStones();

	for (var i = 0; i < stones.length; i++) {
		var stonePos = stones[i].getPosition();

		if(stonePos.x == position.x && stonePos.y == position.y) return true;
	}

	return false;
}

Bomberman.Map.prototype.isOnCellBox = function(position){
	var boxes = this.getBoxes();

	for (var i = 0; i < boxes.length; i++) {
		var boxPos = boxes[i].getPosition();

		if(boxPos.x == position.x && boxPos.y == position.y) return true;
	}

	return false;
}

// neni nic na teto pozici ? kamen, bomba, hrac ....
Bomberman.Map.prototype._isCellEmpty = function(position){
	var stones = this.getStones();
	var bombs = this.getBombs();
	var boxes = this.getBoxes();
	var players = this.getPlayers();

	for (var i = 0; i < stones.length; i++) {
		var stonePos = stones[i].getPosition();
		if(stonePos.x == position.x && stonePos.y == position.y) return false;
	}

	for (var i = 0; i < bombs.length; i++) {
		var bombPos = bombs[i].getPosition();
		if(bombPos.x == position.x && bombPos.y == position.y) return false;
	}

	for (var i = 0; i < boxes.length; i++) {
		var boxPos = boxes[i].getPosition();
		if(boxPos.x == position.x && boxPos.y == position.y) return false;
	}

	for (var i = 0; i < players.length; i++) {
		var playerPos = players[i].getPosition();
		if(playerPos.x == position.x && playerPos.y == position.y) return false;
	}

	return true;

	// proiteruje a udela pruniky pres vsechny kameny

	// proiteruje a udela priniky pres vsechny bednicky
}

Bomberman.Map.prototype.debug = function(ctx){
	console.log("============ DEBUG ============");

	console.log("sirka: " + ctx.canvas.offsetWidth.toString());
	console.log("vyska: " + ctx.canvas.offsetHeight.toString());
	console.log("font: " + ctx.font.toString());

	console.log("============ END DEBDUG ============");
	console.log(ctx);
}
