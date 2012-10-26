var c, ctx, w, h, FPS = 60;
var monsters=[];
var misiles=[];
var rockets=[];
var nave;
var moveRight = false;
var moveLeft = false;
var disparo = false;

c = document.getElementById('c'), 
ctx = c.getContext('2d');
w = c.width = 800;
h = c.height = 600;

var score=0;

function Monster(){
	this.x = Math.random()*w;
	this.y = 0;
	this.vx = Math.random()*10;
	this.vy = Math.random()*3;
	this.w = 48;
	this.h = 48;
	this.img = new Image();
	this.img.src = "images/monster1.png";
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

		if(this.show)
		ctx.drawImage(this.img,this.x,this.y);

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
		// Simplemente se crea un misil base para la nave en x, y 
		//
		//
		//			  !	  misil base en x, y
		//			 # #
		//			##### nave
		misiles.push(new Misil (this.x, this.y));
	};
}
nave = new Nave();

function update(){
		
	nave.move();
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].move();
	}

	for (var i = 0; i < misiles.length; i++) {
		misiles[i].move();
	}

}

function draw(){

	ctx.fillStyle = "rgb(F,F,F,F)";
	ctx.fillRect(0,0,w,h);

	//Crear un  nuevo mounstro
	if(Math.random()<0.025){

		monsters.push(new Monster());
	}

	
	//dibujar mounstro
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].draw();
	}
	//dibujar Nave
	nave.draw();

	//dibujar misil;
	if(disparo){
		misiles.push(new Misil(nave.x + ( nave.w )/2,nave.y));
		disparo = false;
	}
	for (var i = 0; i < misiles.length; i++) {
		misiles[i].draw();
	}
	
}

function hayChoque(misil,mounstro){

	var x1 = misil.x + (misil.w)/2;
	var y1 = misil.y + (misil.h)/2;

	var x2 = mounstro.x + (mounstro.w)/2;
	var y2 = mounstro.y + (mounstro.h)/2;

	//alert("x1 :" + x1 +", x2 :" +x2 + "y1 :" + y1 +", y2 :" + y2 );

	var d = Math.sqrt( Math.pow((x1-x2),2) + Math.pow((y1-y2),2) );
	var dmin= (mounstro.h)/2 + (misil.h)/2;
	//alert("d :" + d +", dmin :" +dmin);
	
	if(d<=dmin) return true;
	else return false;
}

function colision(){

	
	for (var i = 0; i < misiles.length; i++) {
		

		for (var j = 0; misiles[i].show && j < monsters.length ; j++) {
		

			if(monsters[j].show  && hayChoque(misiles[i],monsters[j])){
				//alert("choque");
				 monsters[j].show = false;
				 misiles[i].show = false;
				 score++;
			}

		}
	}

	//Para cuando choquen enemigos con la nave 
	//for(var i = 0; i < monsters.length; i++ )
	// 	if(monsters[i].show && hayChoque( monsters[i], new Nave(nave.x, nave.y)) )
			//Hacer algo: perder una vida || perder juego || mostrar puntajes || reiniciar
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

	