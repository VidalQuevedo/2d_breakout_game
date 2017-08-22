(function(){
	
	'use strict';

	var canvas = document.getElementById('2d-breakout-canvas');
	var ctx = canvas.getContext('2d');
	var x = canvas.width / 2;
	var y = canvas.height - 30;
	var dx = 2;
	var dy = -2;

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.width);
	}

	function draw() {
		clearCanvas();
		drawBall();
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI*2);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
		
		// update ball coordinates
		x += dx;
		y += dy;
	}
	
	setInterval(draw, 10);


})();