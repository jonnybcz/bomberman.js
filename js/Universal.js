Array.prototype.copy = function(){
	var tmp = [];

	for (var i = 0; i < this.length; i++) tmp.push(this[i]);			

	return tmp;
}

Array.prototype.removeIndexes = function(indexes){
	for (var i = 0; i < indexes.length; i++) this.splice(indexes[i], 1);
}
