export class Vector {
    constructor(x, y){
        this.x = x
        this.y = y
    }
    add(v){
        return new Vector(this.x + v.x, this.y + v.y)
    }
    sub(v){
        return new Vector(this.x - v.x, this.y - v.y)
    }
    mult(n){
        return new Vector(this.x * n, this.y * n)
    }
    div(n){
        return new Vector(this.x / n, this.y / n)
    }
    copy(){
        return new Vector(this.x, this.y)
    }
    mag(){
        return Math.hypot(this.x, this.y)
    }
    normalize(){
        const mag = this.mag()
        if(mag == 0) return new Vector(0, 0)
        return this.div(mag)
    }
    dot(v){
        return this.x * v.x + this.y * v.y 
    }
    setMag(n){
        return this.normalize().mult(n)
    }
    limit(n){
        if(this.mag() < n) return this.copy()
        return this.setMag(n)
    }
    perpendicular(){
        return new Vector(-this.y, this.x)
    }
}