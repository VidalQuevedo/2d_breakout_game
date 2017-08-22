(function(){
	
	'use strict';

	var ballRadius = 10;
	var canvas = document.getElementById('2d-breakout-canvas');
	var ctx = canvas.getContext('2d');
	var dx = 2;
	var dy = -2;
	var x = canvas.width / 2;
	var y = canvas.height - 30;

	function ballCollisionDetection() {
		
		// ceiling and floor
		if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
			dy = -dy;
		}

		// lefy and right walls
		if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
			dx = -dx;
		}

	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.width);
	}

	function draw() {
		clearCanvas();
		drawBall();
		ballCollisionDetection();
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
		
		// update ball coordinates
		x += dx;
		y += dy;
	}
	
	setInterval(draw, 10);


})();