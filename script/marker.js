import { Vector } from "./vector.js"

export class Marker {
    /** @param { CanvasRenderingContext2D } context */
    constructor(canvas, context){
        this.canvas = canvas
        this.context = context
        this.angle = 0
    }
    drawDotRect(x, y, width, height, color){
        this.context.save()
        this.context.fillStyle = color
        this.context.translate(-width / 2, -height / 2)
        this.context.fillRect(x, y, width, height)
        this.context.restore()
    }
    drawDashLine(start, end){
        this.context.save()
        this.context.globalAlpha = 0.2
        this.context.setLineDash([3, 7])
        this.context.beginPath()
        this.context.moveTo(start.x, start.y)
        this.context.lineTo(end.x, end.y)
        this.context.stroke()
        this.context.restore()
    }
    drawProjectionLine(start, end, color){
        this.context.save()
        this.context.globalAlpha = 0.4
        this.context.lineWidth = 0.5
        this.context.strokeStyle = color
        this.context.translate(start.x, start.y)
        this.context.beginPath()
        this.context.rotate(this.angle * Math.PI / 180)
        this.context.moveTo(0, 0)
        this.context.lineTo(end.x, end.y)
        this.context.stroke()
        this.context.restore()
    }
    drawCircle(x, y, color){
        const start = new Vector(this.canvas.width * 0.5, this.canvas.height * 0.7)

        this.context.save()
        this.context.fillStyle = color
        this.context.globalAlpha = 0.8
        this.context.translate(start.x, start.y)
        this.context.beginPath()
        this.context.arc(x, y, 10, 0, Math.PI * 2)
        this.context.fill()
        this.context.restore()
    }
}