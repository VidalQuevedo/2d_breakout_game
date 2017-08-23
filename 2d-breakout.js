(function(){
	
	'use strict';

	var canvas = document.getElementById('2d-breakout-canvas');

	var ballRadius = 10;
	var ballX = canvas.width / 2;
	var ballY = canvas.height - 30;
	var ctx = canvas.getContext('2d');
	var dx = 2;
	var dy = -2;
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width - paddleWidth) / 2;
	var paddleY = (canvas.height - paddleHeight);
	var rightPressed = false;
	var leftPressed = false;


	init();


	////////////////	

	function addEventListeners() {
		document.addEventListener('keydown', keyDownHandler, false);
		document.addEventListener('keyup', keyUpHandler, false);
	}

	function ballCollisionDetection() {
		
		// ceiling and floor
		if (ballY + dy < ballRadius || ballY + dy > canvas.height - ballRadius) {
			dy = -dy;
		}

		// lefy and right walls
		if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
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
		drawPaddle();
		paddleCollisionDetection();
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
		
		// update ball coordinates
		ballX += dx;
		ballY += dy;
	}

	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	function keyDownHandler(event) {
		if (event.keyCode === 39) {
			rightPressed = true;
		} else if (event.keyCode === 37) {
			leftPressed = true;
		}
	}

	function keyUpHandler(event) {
		if (event.keyCode === 39) {
			rightPressed = false;
		} else if (event.keyCode === 37) {
			leftPressed = false;
		}
	}

	function init() {
		addEventListeners();
		setInterval(draw, 10);		
	}

	function paddleCollisionDetection() {
		if (rightPressed && paddleX + paddleWidth < canvas.width) {
			paddleX += 7;
		} else if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}
	}

})();