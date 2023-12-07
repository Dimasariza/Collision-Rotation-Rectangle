import { Vector } from "./vector.js";

export class Rectangle {
    constructor(x, y, width, height){
        this.pos = new Vector(x, y)
        this.width = width
        this.height = height
        this.angle = 0
        this.centerToCorner
        this.movementSpeed = 0.3
        this.angleSpeed = 0.05 
    }
    /** @param { CanvasRenderingContext2D } context */
    draw(context){
        context.fillStyle = this.color
        context.save()
        context.translate(this.pos.x, this.pos.y)
        context.rotate(this.angle * Math.PI / 180)
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height)
        context.restore()

        this.drawText(context)
        this.drawCenter(context)
    }
    /** @param { CanvasRenderingContext2D } context */
    drawText(context){
        context.fillStyle = 'black'
        context.font = "17px Georgia"  
        context.textAlign = 'center'
        context.fillText(this.name, this.pos.x, this.pos.y - this.height / 2 - 5)
    }
    /** @param { CanvasRenderingContext2D } context */
    drawCenter(context){
        context.font = "10px Georgia"  
        context.beginPath()
        const x = parseFloat(this.pos.x).toFixed(1)
        const y = parseFloat(this.pos.y).toFixed(1)
        context.fillText(`x : ${x}, y : ${y}`, this.pos.x, this.pos.y - 15)
        context.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2)
        context.fill()
        context.stroke()
    }
    update(){
        const x = this.pos.x - this.width / 2
        const y = this.pos.y - this.height / 2
        const corner = new Vector(x, y)
        this.centerToCorner = this.pos.sub(corner).mag()
    }
    vectorCoordinate(angle){
        const cos = Math.cos(angle * Math.PI / 180)
        const sin = Math.sin(angle * Math.PI / 180)
        const x = this.pos.x + this.centerToCorner * cos
        const y = this.pos.y + this.centerToCorner * sin
        return new Vector(x, y)
    }
    getAngle(pos){
        return Math.atan2(pos.y, pos.x) * 180 / Math.PI + this.angle
    }
    topRightCoor(){
        const point = new Vector(this.pos.x + this.width / 2, this.pos.y - this.height / 2)
        const angle = this.getAngle(point.sub(this.pos)) 
        return this.vectorCoordinate(angle)
    }
    topLeftCoor(){
        const point = new Vector(this.pos.x - this.width / 2, this.pos.y - this.height / 2)
        const angle = this.getAngle(point.sub(this.pos)) 
        return this.vectorCoordinate(angle)
    }
    bottomLeftCoor(){
        const point = new Vector(this.pos.x - this.width / 2, this.pos.y + this.height / 2)
        const angle = this.getAngle(point.sub(this.pos)) 
        return this.vectorCoordinate(angle)
    }
    bottomRightCoor(){
        const point = new Vector(this.pos.x + this.width / 2, this.pos.y + this.height / 2)
        const angle = this.getAngle(point.sub(this.pos)) 
        return this.vectorCoordinate(angle)
    }
    boundaries(canvas){
        const allCorner = [this.topRightCoor(), this.topLeftCoor(), this.bottomRightCoor(), this.bottomLeftCoor()]

        const xMax = allCorner.reduce((a, b) => a.x > b.x ? a : b)
        const xMin = allCorner.reduce((a, b) => a.x < b.x ? a : b)
        const yMax = allCorner.reduce((a, b) => a.y > b.y ? a : b)
        const yMin = allCorner.reduce((a, b) => a.y < b.y ? a : b)

        const horizontalMax = this.vectorDotProduct(xMax.sub(this.pos), new Vector(1, 0))
        const horizontalMin = this.vectorDotProduct(xMin.sub(this.pos), new Vector(-1, 0))
        const verticalMax = this.vectorDotProduct(yMax.sub(this.pos), new Vector(0, -1))
        const verticalMin = this.vectorDotProduct(yMin.sub(this.pos), new Vector(0, 1))
        
        if(horizontalMin.x + this.pos.x < 0){
            this.pos.x =  -horizontalMin.x
            return true
        } else
        if(horizontalMax.x + this.pos.x > canvas.width){
            this.pos.x = canvas.width - horizontalMax.x
            return true
        } 

        if(verticalMin.y + this.pos.y < 0){
            this.pos.y = -verticalMin.y
            return true
        } else 
        if(verticalMax.y + this.pos.y > canvas.height){
            this.pos.y = canvas.height - verticalMax.y 
            return true
        }
        return false
    }
    vectorDotProduct(v1, v2){
        v2 = v2.normalize()
        const sp = v1.dot(v2)
        return v2.mult(sp)
    }
}

export class Rectangle1 extends Rectangle {
    constructor(x, y, width, height){
        super(x, y, width, height)
        this.name = "Rectangle 1"
        this.color = 'rgba(0, 0, 255, 0.7)'
    }
    /** @param { Set } button */
    update(button){
        super.update()
        if(button.has("left_1")) this.pos.x -= this.movementSpeed
        if(button.has("right_1")) this.pos.x += this.movementSpeed
        if(button.has("up_1")) this.pos.y -= this.movementSpeed
        if(button.has("down_1")) this.pos.y += this.movementSpeed
        if(button.has("rotate_L1")) this.angle -= this.angleSpeed
        if(button.has("rotate_R1")) this.angle += this.angleSpeed
    }
    updateInput({posX, posY, angle, width, height, movementSpeed, angleSpeed}){
        this.pos.x = posX
        this.pos.y = posY
        this.angle = angle
        this.width = width
        this.height = height
        this.movementSpeed = movementSpeed
        this.angleSpeed = angleSpeed
    }
}

export class Rectangle2 extends Rectangle {
    constructor(x, y, width, height){
        super(x, y, width, height)
        this.name = "Rectangle 2"
        this.color = 'rgba(255, 0, 0, 0.7)'
    }
    /** @param { Set } button */
    update(button){
        super.update()
        if(button.has("left_2")) this.pos.x -= this.movementSpeed
        if(button.has("right_2")) this.pos.x += this.movementSpeed
        if(button.has("up_2")) this.pos.y -= this.movementSpeed
        if(button.has("down_2")) this.pos.y += this.movementSpeed
        if(button.has("rotate_L2")) this.angle -= this.angleSpeed
        if(button.has("rotate_R2")) this.angle += this.angleSpeed
    }
    updateInput({posX, posY, angle, width, height, movementSpeed, angleSpeed}){
        this.pos.x = posX
        this.pos.y = posY
        this.angle = angle
        this.width = width
        this.height = height
        this.movementSpeed = movementSpeed
        this.angleSpeed = angleSpeed
    }
}