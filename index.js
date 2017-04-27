var http = require('http'),
	player = require('./player');
http.createServer(function (req,res) {
	var player1 = player.newPlayer("P1", 5, "swim");
		player1.addPrizes();
	var	player2 = player.newPlayer("P2", 3, "swim");
		player2.removePrizes();
		player2.removePrizes();
		player2.removePrizes();
		player2.removePrizes();
	res.writeHeader(200);
	res.write(player.printData);
	res.end('success\n');
}).listen(8081);
console.log('listening on port 8081');