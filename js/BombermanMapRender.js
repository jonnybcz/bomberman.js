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
	this._textures = {};

	this._preLoadTextures();
}

Bomberman.Map.Render.prototype._preLoadTextures = function(){
	var textures = ["bomb", "bombermanDown", "bombermanUp", "bombermanLeft", "bombermanRight", "door", "ghost", "spectre", "squid", "stone", "swallow", "terror", "wall"];

	var texturesObject = {};

	for (var i = 0; i < textures.length; i++) {
		var image = new Image();
		image.src = "img/textures/" + textures[i] + ".svg";

		texturesObject[textures[i]] = image;
	}

	this._textures = texturesObject;
}

// vykresli canvas
Bomberman.Map.Render.prototype.canvas = function(){
	this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.width);
	this._insertToMap(this._map.getStones());
	this._insertToMap(this._map.getDoor());
	this._insertToMap(this._map.getBoxes());
	this._insertToMap(this._map.getBombs());
	this._insertToMap(this._map.getPlayers());
	this._insertToMap(this._map.getExplosions());
}

Bomberman.Map.Render.prototype._insertToMap = function(something){	
	var length = something.length;

	for (var i = 0; i < length; i++) {
		var pos = something[i].getPosition();

		if(something[i] instanceof Bomberman.Player.Human){
			var player = something[i];
			if(player.getDirection() == "left") this._putImageCell(pos.x, pos.y, "bombermanLeft");
			if(player.getDirection() == "right") this._putImageCell(pos.x, pos.y, "bombermanRight");
			if(player.getDirection() == "up") this._putImageCell(pos.x, pos.y, "bombermanUp");
			if(player.getDirection() == "down") this._putImageCell(pos.x, pos.y, "bombermanDown");
		} 

		if(something[i] instanceof Bomberman.Player.Monster){
			this._putCell(pos.x, pos.y, "purple");	
			this._putImageCell(pos.x, pos.y, something[i].getKind());
		} 

		if(something[i] instanceof Bomberman.Stone){
			this._putCell(pos.x, pos.y, "grey");
			this._putImageCell(pos.x, pos.y, "stone");
		}
		
		if(something[i] instanceof Bomberman.Door){
			this._putImageCell(pos.x, pos.y, "door");
		}

		if(something[i] instanceof Bomberman.Box){
			//this._putCell(pos.x, pos.y, "yellow");
			this._putImageCell(pos.x, pos.y, "wall");
		}

		if(something[i] instanceof Bomberman.Player.Bomb){
			var bomb = something[i];
			var player = bomb.getPlayer();
			var bombPos = bomb.getPosition();

			if(!bomb.isTimeForBoom()) this._putImageCell(pos.x, pos.y, "bomb");
		} 

		if(something[i] instanceof Bomberman.Player.Bomb.Explosion){
			var explosion = something[i];
			var explosionCoo = explosion.getCoordinates();

			if(explosion.runs()){
				for (var j = 0; j < explosionCoo.length; j++) this._putCell(explosionCoo[j].x, explosionCoo[j].y, "red");
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

Bomberman.Map.Render.prototype._putImageCell = function(x, y, key){
	var textures = this._textures;
	var cellSize = this._map.getCellSize();
	var ctx = this._ctx;
	
	ctx.drawImage(textures[key], x, y, cellSize, cellSize);
}



