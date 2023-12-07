import { Marker } from "./marker.js"
import { Rectangle } from "./rectangle.js"
import { Vector } from "./vector.js"

export class SAT {
    /** 
     * @param { Rectangle } rect 
     * @param { Marker } marker
     * @param { CanvasRenderingContext2D } context
     * */
    constructor(rect, marker){
        this.rect = rect
        this.marker = marker
        this.rectCorner = []
        this.update()
        this.perpendicularLine = []
        this.angle = this.rect.angle
    }
    /** @param { CanvasRenderingContext2D } context */
    draw(sat){
        const angle = this.angle < 0 ? 90 + this.angle % 90 : this.angle % 90
        const horizontalStart = new Vector(this.marker.canvas.width, this.marker.canvas.height)
        const horizontalAngle = angle + 180
        const horizontalEnd = new Vector(Math.cos(horizontalAngle * Math.PI / 180), 
        Math.sin(horizontalAngle * Math.PI / 180)).setMag(1000)

        const verticalStart = new Vector(this.marker.canvas.width, 0)
        const verticalAngle = angle + 90
        const verticalEnd = new Vector(Math.cos(verticalAngle * Math.PI / 180), 
        Math.sin(verticalAngle * Math.PI / 180)).setMag(1000)

        this.rectCorner.forEach(corner => {
            this.marker.drawDotRect(corner.x, 0, 6, 6, this.rect.color)
            this.marker.drawDotRect(0, corner.y, 6, 6, this.rect.color)
            
            this.marker.drawDashLine(corner, {x : corner.x, y : 0})
            this.marker.drawDashLine(corner, {x : 0, y : corner.y})
            
            this.marker.drawProjectionLine(horizontalStart, horizontalEnd, this.rect.color)
            this.marker.drawProjectionLine(verticalStart, verticalEnd, this.rect.color)
        })
        
        const combineCorner = [
            ...this.rectCorner.map(corner => ({corner, color : 'red'})),
            ...sat.rectCorner.map(corner => ({corner, color : 'blue'})),
        ]

        combineCorner.forEach(({corner, color}) => {    
            const vecHorizontal = corner.sub(horizontalStart)
            const horizontalProjection = this.vectorDotProduct(vecHorizontal, horizontalEnd)
            // this.marker.drawProjectionLine(horizontalStart, horizontalProjection, 'black')
            const vecVertical = corner.sub(verticalStart)
            const verticalProjection = this.vectorDotProduct(vecVertical, verticalEnd)
            // this.marker.drawProjectionLine(verticalStart, verticalProjection, 'black')

            const horizontalMark = horizontalStart.add(horizontalProjection)
            this.marker.drawDotRect(horizontalMark.x, horizontalMark.y, 4, 4, color)
            const verticalMark = verticalStart.add(verticalProjection)
            this.marker.drawDotRect(verticalMark.x, verticalMark.y, 4, 4, color)
        })
    }
    update(){
        this.rectCorner = [
            this.rect.topLeftCoor(),
            this.rect.topRightCoor(),
            this.rect.bottomRightCoor(),
            this.rect.bottomLeftCoor()
        ]
        this.perpendicularLine = this.cornerToCorner().map(point => point.perpendicular())
        this.angle = this.rect.angle
    }
    cornerToCorner(){
        return this.rectCorner.map((point, index) => 
        point.sub(this.rectCorner[(index + 1) % this.rectCorner.length]))
    }
    vectorDotProduct(v1, v2){
        v2 = v2.normalize()
        const sp = v1.dot(v2)
        return v2.mult(sp)
    }
    /** @param { SAT } sat */
    separatingProjection(sat){
        const perpendicularLine = [...this.perpendicularLine, ...sat.perpendicularLine]
        for(let line of perpendicularLine){
            let amin = null, amax = null, bmin = null, bmax = null
            for(let corner of this.rectCorner){
                const dot = corner.dot(line)
                if(amax === null || dot > amax) amax = dot
                if(amin === null || dot < amin) amin = dot
            }
            for(let corner of sat.rectCorner){
                const dot = corner.dot(line)
                if(bmax === null || dot > bmax) bmax = dot
                if(bmin === null || dot < bmin) bmin = dot
            }
            if( (amin <= bmax && amin >= bmin) ||
                (bmin <= amax && bmin >= amin) ) continue
            else return false
        }
        return true
    }
}