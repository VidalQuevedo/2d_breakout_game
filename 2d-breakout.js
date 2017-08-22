(function(){
	
	'use strict';

	let canvas = document.getElementById('2d-breakout-canvas');
	let ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.rect(20, 40, 50, 60);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(240, 180, 40, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();


})();