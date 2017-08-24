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

	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;

	var bricks = [];


	init();


	////////////////	

	function addEventListeners() {
		document.addEventListener('keydown', keyDownHandler, false);
		document.addEventListener('keyup', keyUpHandler, false);
	}

	function ballCollisionDetection() {
		
		// lefy and right walls
		if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
			dx = -dx;
		}

		// ceiling
		if (ballY + dy < ballRadius) {
			dy = -dy;
		} else if (ballY + dy > canvas.height - ballRadius) {
			// check if paddle has been hit
			if (ballX >= paddleX && ballX <= paddleX + paddleWidth) {
				dy = -dy;
			} else if (ballY + dy > canvas.height + ballRadius * 2){
				gameOver();
			}
		}

	}

	function bricksCollisionDetection() {
		for (var c = 0; c < brickColumnCount; c++) {
			for (var r = 0; r < brickRowCount; r++) {
				var brick = bricks[c][r];
				if (brick.status === 1) {
					if (ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
						dy = -dy;
						brick.status = 0;
					}					
				}
			}
		}
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.width);
	}

	function draw() {
		clearCanvas();
		drawBricks();
		drawBall();
		drawPaddle();
		ballCollisionDetection();
		paddleCollisionDetection();
		bricksCollisionDetection();

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

	function drawBricks() {
		for (var c = 0; c < brickColumnCount; c++) {
			for (var r = 0; r < brickRowCount; r++) {
				var brick = bricks[c][r];
				if (brick.status === 1) {
					var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
					var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
					brick.x = brickX;
					brick.y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = '#0095DD';
					ctx.fill();
					ctx.closePath();					
				}
			}
		}
	}

	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	function gameOver() {
		alert('Gave Over');
		document.location.reload();
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
		populateBricks();
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

	function populateBricks() {
		for (var c = 0; c < brickColumnCount; c++) {
			bricks[c] = [];
			for (var r = 0; r < brickRowCount; r++) {
				bricks[c][r] = {x: 0, y: 0, status: 1};
			}
		}
	}

})();