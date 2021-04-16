const canvas = document.getElementById('MCanvas');
const ctx = canvas.getContext('2d');

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    get size(){
        return Math.sqrt(this.x ** 2 +  this.y ** 2)
    }

    get angle(){
        return Math.atan2(this.y, this.x);
    }

    normalize(){
        let x = this.x/this.size;
        let y = this.y/this.size;
        return new Vector(x,y);
    }
    
    add(vec){
        this.x += vec.x;
        this.y += vec.y;
    }

    static add(a, b){
        return new Vector(a.x + b.x, a.y + b.y);
    }
}

class Ball{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.velocity = new Vector(0,0); 
        this.acc = new Vector(0,0);
    }
    
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = '5';
        ctx.stroke();

        //ctx.font = '10px serif';
        //ctx.fillText(`angle : ${this.velocity.angle}`, 10, 10);

        const arrSize = 5;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.velocity.x * 10, this.y + this.velocity.y * 10);
        ctx.lineTo(this.x + this.velocity.x * 10 - arrSize * Math.cos(this.velocity.angle - Math.PI / 6), this.y + this.velocity.y * 10 - arrSize * Math.sin(this.velocity.angle - Math.PI / 6));
        ctx.moveTo(this.x + this.velocity.x * 10, this.y + this.velocity.y * 10);
        ctx.lineTo(this.x + this.velocity.x * 10 - arrSize * Math.cos(this.velocity.angle + Math.PI / 6), this.y + this.velocity.y * 10 - arrSize * Math.sin(this.velocity.angle + Math.PI / 6));
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.acc.x * 100, this.y + this.acc.y * 100);
        ctx.lineTo(this.x + this.acc.x * 100 - arrSize * Math.cos(this.acc.angle - Math.PI / 6), this.y + this.acc.y * 100 - arrSize * Math.sin(this.acc.angle - Math.PI / 6));
        ctx.moveTo(this.x + this.acc.x * 100, this.y + this.acc.y * 100);
        ctx.lineTo(this.x + this.acc.x * 100 - arrSize * Math.cos(this.acc.angle + Math.PI / 6), this.y + this.acc.y * 100 - arrSize * Math.sin(this.acc.angle + Math.PI / 6));
        ctx.stroke();
    }

    frame(minX,minY,maxX,maxY){
        this.velocity.add(this.acc) 

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x < minX){
            this.x = minX;
            this.velocity.x = -this.velocity.x;
        }
        if(this.x > maxX){
            this.x = maxX;
            this.velocity.x = -this.velocity.x;
        }
        if(this.y < minY){
            this.y = minY;
            this.velocity.y = -this.velocity.y;
        }
        if(this.y > maxY){
            this.y = maxY;
            this.velocity.y = -this.velocity.y;
        }
    }

    kick(x,y){
        this.velocity.x += x;
        this.velocity.y += y;
    }

    accel(x,y){
        this.acc.x += x;
        this.acc.y += y;
    }
}

const balls = [];

for(let i = 0; i <= 15; i++){
    balls.push(new Ball(10, 50 + i * 10));
}

balls.forEach((e, i)=>{
    e.accel(0, 0.1);
    e.kick(i + 1, 0);
});

const frame = function(){
    ctx.clearRect(0, 0, 300, 300);
    balls.forEach((e)=>{
        e.frame(10, 10, 290, 290);
        e.draw(ctx);
    })
    window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);