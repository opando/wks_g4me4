function Sprite(img, arrayFrames, x, y){ 
  this.x = x;
  this.y = y;
  this.img = img; 
  this.arrayFrames = arrayFrames;
  this.currentFrame = 0;  
  this.width = this.arrayFrames[this.currentFrame][2];
  this.height = this.arrayFrames[this.currentFrame][3]; 
}

Sprite.prototype.update = function(){ 
  
  if(this.currentFrame < (this.arrayFrames.length)){ 
  ctx.drawImage( 
      this.img, 
      this.arrayFrames[this.currentFrame][0],
      this.arrayFrames[this.currentFrame][1],      
      this.arrayFrames[this.currentFrame][2],
      this.arrayFrames[this.currentFrame][3], 
      this.x, 
      this.y, 
      this.width,
      this.height); 
  }
  
  this.currentFrame++; 
  
} 