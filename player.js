'use strice'

var http = require('http'),
	events = require('events'),
	config = require('./config').events,
	saveData = '',
	emtr = new events();

class Player{

	constructor($name, $prizes=0, $sport){
		this.name = $name;
		this.prizes = $prizes;
		this.sport = $sport;
	}

	addPrizes(){
		this.prizes += 1;
		emtr.emit(config.prizesChanged, this.name, this.sport, this.prizes);
	}
	removePrizes(){
		if(this.prizes == 0){
			emtr.emit(config.error);
			return false;
		}
		else {
			this.prizes -= 1;
			emtr.emit(config.prizesChanged, this.name, this.sport, this.prizes);
		}
	}
	getPlayerInfo(){
		return this.name + " has" +this.prizes +" prices"
	}

}
exports.newPlayer = function($name, $prizes, $sport) {
 // Create new instance of player
 var newPlayer = new Player($name, $prizes, $sport);
 return newPlayer;
}

 //create callback
 emtr.on(config.prizesChanged, function(name,sport,prizes){
 	console.log(`${name}`+" prize has been changed in "+`${sport}`+". prizes: "+`${prizes}`);
 	saveData += `<p>${name}` + " prize has been changed in " + `${sport} . prizes: ${prizes}</p>`;
 	exports.printData = saveData;
 });
 emtr.on(config.error,function(){
	console.log("this player has zero prizes");
	saveData += "<p>this player has zero prizes</p>";
	exports.printData = saveData; 
 });