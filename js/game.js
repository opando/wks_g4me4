var c, ctx, w, h;
var monsters=[];
var nave;

c = document.getElementById('c'), 
ctx = c.getContext('2d');
w = c.width = 800;
h = c.height = 600;



function Monster(){
	this.x = 0;
	this.y = 0;
	this.vx = Math.random()*5;
	this.vy = Math.random()*5;
	this.img = new Image();
	this.img.src = "images/monster1.png";
	this.draw = function(){

		ctx.drawImage(this.img,this.x,this.y);

	};
	this.move = function(){

		this.x += this.vx;
		this.y += this.vy;

	};
}

function Nave(){
	
	this.img = new Image();
	this.img.src = "images/nave.png";
	this.w = 64;
	this.h = 64;
	this.x = w/2;
	this.y = h - this.h;
	this.draw = function(){

		ctx.drawImage(this.img,this.x,this.y);

	};
	this.move = function(){

		
	};
}
nave = new Nave();

function update(){

	if(Math.random()<0.25){

		monsters.push(new Monster());
	}
	
	nave.move();
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].move();
	}

}

function draw(){
	ctx.fillStyle = "rgb(F,F,F,F)";
	ctx.fillRect(0,0,w,h);

	

	for (var i = 0; i < monsters.length; i++) {
		monsters[i].draw();
	}
	nave.draw();
	
}

var gameLoop = function(){
	update();
	draw();
	setTimeout(gameLoop, 1000 / 50);
}

gameLoop();