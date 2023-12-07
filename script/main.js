import { Rectangle1, Rectangle2 } from "./rectangle.js"
import { SAT } from "./SAT.js"
import { Marker } from "./marker.js"
import { ButtonPress, Input } from "./control.js"

const canvas = /** @type { HTMLCanvasElement }*/ (document.getElementById('canvas1'))
const context = /** @type { CanvasRenderingContext2D } */ canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANAVS_HEIGHT = canvas.height = 600

const rect1 = new Rectangle1(300, 100, 50, 150)
const rect2 = new Rectangle2(500, 100, 150, 150)
const marker = new Marker(canvas,  context)
const separatingAxis1 = new SAT(rect1, marker)
const separatingAxis2 = new SAT(rect2, marker)
const button = new ButtonPress()
const input = new Input(rect1, rect2)

function animate(deltatime){
    context.clearRect(0, 0, CANVAS_WIDTH, CANAVS_HEIGHT)
    
    rect1.update(button.buttonPress)
    rect1.draw(context)
    
    rect2.update(button.buttonPress)
    rect2.draw(context)

    separatingAxis1.update()
    separatingAxis1.draw(separatingAxis2)
    if(separatingAxis1.separatingProjection(separatingAxis2))
    rect1.color = 'green'
    else if(rect1.boundaries(canvas))
    rect1.color = 'rgba(0, 100, 255, 0.9)'
    else rect1.color = 'rgba(0, 0, 255, 0.7)'
    
    separatingAxis2.update()
    separatingAxis2.draw(separatingAxis1)
    if(separatingAxis2.separatingProjection(separatingAxis1))
    rect2.color = 'gray'
    else if(rect2.boundaries(canvas))
    rect2.color = 'rgba(100, 10, 10, 0.9)'
    else rect2.color = 'rgba(255, 0, 0, 0.7)'

    input.setValue()
    requestAnimationFrame(animate)
}
animate(0)