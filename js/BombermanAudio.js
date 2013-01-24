/**
* mmm to chce ServiceLocator... @todo
* author: topa
* @class Třída Bomberman.Audio
*/
Bomberman.Audio = JAK.ClassMaker.makeClass({
	NAME: "Bomberman.Audio",
	VERSION: "1.0"
});

Bomberman.Audio.prototype.$constructor = function(){
	this._path = "sound/";
	this._audio = JAK.mel("audio");
	this._extension = (this._audio.canPlayType("audio/ogg") ? ".ogg" : ".mp3");
	this._sounds = ["explosion", "gameOver", "killPlayer"];

	this._preLoad();
}

Bomberman.Audio.prototype._preLoad = function(file){
	var sounds = this._sounds;
	var audio = this._audio;

	for (var i = 0; i < sounds.length; i++) {
		audio.src = sounds[i] + this._extension;
		audio.load();
	}
}

Bomberman.Audio.prototype.play = function(file){
	this._audio.src = this._path + file + this._extension;
	this._audio.play();
}
