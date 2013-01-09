/**
* // @TODO stones, staci vykreslit jednou
* author: topa
* @class Třída Bomberman.Map.Render
*/
Bomberman.Map.Render = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Map.Render",
	VERSION: "1.0"
});

//Bomberman.Map.Render.txtOfStone = "";

Bomberman.Map.Render.prototype.$constructor = function(map){
	this._map = map;
	this._canvas = map.getCanvas();
	this._ctx = this._canvas.getContext("2d");
}

// vykresli canvas
Bomberman.Map.Render.prototype.canvas = function(){
	this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.width);

	this._insertToMap(this._map.getStones());
	this._insertToMap(this._map.getBoxes());
	this._insertToMap(this._map.getPlayers());
	this._insertToMap(this._map.getBombs());
	this._insertToMap(this._map.getExplosions());
}

Bomberman.Map.Render.prototype._insertToMap = function(something){
	
	for (var i = 0; i < something.length; i++) {
		var pos = something[i].getPosition();

		if(something[i] instanceof Bomberman.Player.Human) this._putCell(pos.x, pos.y, "green");
		if(something[i] instanceof Bomberman.Player.Monster){
			this._putCell(pos.x, pos.y, "purple");	
			this._putImageCell(pos.x, pos.y, "img/textures/ghost.svg");
		} 

		if(something[i] instanceof Bomberman.Stone){
			this._putCell(pos.x, pos.y, "grey");
			this._putImageCell(pos.x, pos.y, "img/textures/stone.png");
		}

		if(something[i] instanceof Bomberman.Box){
			this._putCell(pos.x, pos.y, "yellow");
			//this._putImageCell(pos.x, pos.y, "img/textures/stone.png");
		}

		if(something[i] instanceof Bomberman.Player.Bomb){
			var bomb = something[i];
			var player = bomb.getPlayer();
			var bombPos = bomb.getPosition();

			if(!bomb.isTimeForBoom()) this._putCell(bombPos.x, bombPos.y, "blue");
		} 

		if(something[i] instanceof Bomberman.Player.Bomb.Explosion){
			var explosion = something[i];
			var explosionCoo = explosion.getCoordinates();

			if(explosion.runs()){
				for (var i = 0; i < explosionCoo.length; i++) this._putCell(explosionCoo[i].x, explosionCoo[i].y, "red");
			}
		}
	}
}

// vykresli ctverecek
Bomberman.Map.Render.prototype._putCell = function(x, y, color){
	var cellSize = this._map.getCellSize();
	var ctx = this._ctx;

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(x, y, cellSize, cellSize);
	ctx.fill();
}

Bomberman.Map.Render.prototype._putImageCell = function(x, y, path){
	var cellSize = this._map.getCellSize();
	var ctx = this._ctx;

	var img = new Image();
	img.src = path;
	ctx.drawImage(img, x, y, cellSize, cellSize);
}



