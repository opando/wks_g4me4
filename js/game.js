var c, ctx, w, h, FPS = 60;
var enemigos=[];
var misiles=[];
var explosiones=[];
var nave;
var moveRight = false;
var moveLeft = false;
var disparo = false;
var soundExplosion = new Audio("sound/explosion.wav");
var soundDisparo = new Audio("sound/disparo.wav");

c = document.getElementById('c'), 
ctx = c.getContext('2d');
w = c.width = 800;
h = c.height = 700;

var score=0;
function Explosion(x,y){
	this.x = x;
	this.y = y;
	this.w = 120;
	this.h = 120;

	this.img = new Image();
	this.img.src = "images/explosion.png";
	//x,y,w,h
	this.explosionFrames = [[0,0,120,120],[120,0,120,120],[240,0,120,120],[360,0,120,120],[480,0,120,120],
					[600,0,120,120],[720,0,120,120],[840,0,120,120],[960,0,120,120],[1080,0,120,120]];
	this.sprite = new Sprite(this.img, this.explosionFrames, this.x,this.y);
	this.draw = function(){

		this.sprite.draw();

	};

}
function Enemigo(){
	this.x = Math.random()*w;
	this.y = 0;
	this.vx = Math.random()*10;
	this.vy = Math.random()*3;
	this.w = 120;
	this.h = 120;
	this.img = new Image();
	this.img.src = "images/enemigo.png";
	this.cont = 0;
	this.show = true;
	this.draw = function(){

		if(this.show)
		ctx.drawImage(this.img,this.x,this.y);

	};
	this.move = function(){

		this.x += this.vx;
		this.y += this.vy;

		this.cont++;
		if(this.cont > 10){
			this.vx = this.vx * (-1);
			this.cont = 0;
		}
	};
}

function Misil(x,y){
	

	this.w = 19;
	this.h = 33;
	this.vx = 0;
	this.vy = 5;
	this.x = x;
	this.y = y - this.h;
	this.img = new Image();
	this.img.src = "images/Misil.png"; // misil => Misil
	this.show = true;
	this.draw = function(){

		if(this.show){
			ctx.drawImage(this.img,this.x,this.y);

		}

	};
	this.move = function(){		
		
		this.y -= this.vy;		
		
	};
}

function Nave(){
	

	this.w = 64;
	this.h = 64;
	this.vx = 5;
	this.vy = 5;
	this.x = w/2 - (this.w)/2;
	this.y = h - this.h;
	this.img = new Image();
	this.img.src = "images/nave.png";
	this.draw = function(){

		ctx.drawImage(this.img,this.x,this.y);

	};
	this.move = function(){

		if(moveRight){
			this.x += this.vx;
			// Para no salirse del canvas x la derecha
			if( this.x + this.w > w )
				this.x = w - this.w;
		}
		if(moveLeft){
			this.x -= this.vx;
			// Para no salirse del canvas x la izquierda
			if( this.x < 0 )
				this.x = 0;
		}
		
	};
	this.shoot = function() {
		
		misiles.push(new Misil (this.x, this.y));
	};
}
nave = new Nave();

function update(){
		
	nave.move();
	for (var i = 0; i < enemigos.length; i++) {
		enemigos[i].move();
	}

	for (var i = 0; i < misiles.length; i++) {
		misiles[i].move();
	}

}

function draw(){

	ctx.fillStyle = "rgb(F,F,F,F)";
	ctx.fillRect(0,0,w,h);

	//Crear un  nuevo enemigo
	if(Math.random()<0.01){

		enemigos.push(new Enemigo());
	}

	
	//dibujar enemigo
	for (var i = 0; i < enemigos.length; i++) {
		enemigos[i].draw();
	}

	//Dibujar explosiones
	for (var i = 0; i < explosiones.length; i++) {
		explosiones[i].draw();
	}
	//dibujar Nave
	nave.draw();

	//dibujar misil;
	if(disparo){
		misiles.push(new Misil(nave.x + ( nave.w )/2,nave.y));
		soundDisparo.play();
		disparo = false;
	}
	for (var i = 0; i < misiles.length; i++) {
		misiles[i].draw();

	}
	
}

function hayChoque(misil,enemigo){

	return enemigo.x + enemigo.w > misil.x &&
			misil.x + misil.w > enemigo.x &&
			enemigo.y + enemigo.h > misil.y &&
			misil.y + misil.h > enemigo.y

}

function colision(){

	
	for (var i = 0; i < misiles.length; i++) {
		

		for (var j = 0; misiles[i].show && j < enemigos.length ; j++) {
		

			if(enemigos[j].show  && hayChoque(misiles[i],enemigos[j])){
				//alert("choque");
				 enemigos[j].show = false;
				 misiles[i].show = false;
				 explosiones.push(new Explosion(enemigos[j].x,enemigos[j].y));
				 soundExplosion.play();
				 score++;
			}

		}
	}

}

var gameLoop = function(){
	update();
	colision();
	draw();
	
	setTimeout(gameLoop, 1000 / FPS);
}

gameLoop();



$(document).keydown(function(tecla){
    if (tecla.keyCode == 37) {
       moveLeft = true;
    }else if (tecla.keyCode == 39) {
       moveRight = true;
    }
});
$(document).keyup(function(tecla){
    if (tecla.keyCode == 37) {
       moveLeft = false;
    }else if (tecla.keyCode == 39) {
       moveRight = false;
    }
});
$(document).keypress(function(tecla){
    if (tecla.keyCode == 32) {
       disparo = true;
    }
});

	