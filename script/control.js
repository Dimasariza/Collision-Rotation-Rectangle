import { Rectangle1, Rectangle2 } from "./rectangle.js"

export class ButtonPress {
    constructor(){
        this.buttonsId = [
            "rotate_L1", "rotate_R1", "up_1", "left_1", "right_1", "down_1",
            "rotate_L2", "rotate_R2", "up_2", "left_2", "right_2", "down_2"]
        this.buttonElement = this.buttonsId.map(button => document.getElementById(button))
        this.buttonElement.forEach(el => this.addEvent(el))
        this.buttonPress = new Set()
    }
    addEvent(element){
        element.addEventListener("mousedown", (e) => {
            this.buttonPress.add(element.id)
        })
        element.addEventListener("mouseup", (e) => {
            this.buttonPress.delete(element.id)
        })
        element.addEventListener("mouseleave", (e) => {
            this.buttonPress.delete(element.id)
        })
    }
}

export class Input {
    /** 
     * @param { Rectangle1 } rect1 
     * @param { Rectangle2 } rect2 */
    constructor(rect1, rect2){
        this.rect1 = rect1
        this.rect2 = rect2
        this.inputId = [
            "position_x_1", "position_y_1", "angle_1", "width_1", "height_1", "sens_movement_1", "sens_angle_1",
            "position_x_2", "position_y_2", "angle_2", "width_2", "height_2", "sens_movement_2", "sens_angle_2",
        ]
        this.inputElement = this.inputId.map(input => document.getElementById(input))
        this.inputElement.forEach(el => this.addEvent(el))
        this.inputChange = new Set()
    }
    addEvent(element){
        element.addEventListener("change", (e) => {
            this.changeValue()
            this.inputChange.delete(element.id)
        })
        element.addEventListener("mousedown", (e) => {
            this.inputChange.add(element.id)
        })
        element.addEventListener("mouseleave", (e) => {
            this.inputChange.delete(element.id)
        })
    }
    value(){
        return [
            this.rect1.pos.x, this.rect1.pos.y, this.rect1.angle, this.rect1.width, this.rect1.height, 
            this.rect1.movementSpeed, this.rect1.angleSpeed, 
            this.rect2.pos.x, this.rect2.pos.y, this.rect2.angle,
            this.rect2.width, this.rect2.height, this.rect2.movementSpeed, this.rect2.angleSpeed
        ]
    }
    changeValue(){
        this.rect1.updateInput({
            posX : this.valueToFloat(0),
            posY : this.valueToFloat(1),
            angle : this.valueToFloat(2),
            width : this.valueToFloat(3),
            height : this.valueToFloat(4),
            movementSpeed : this.valueToFloat(5),
            angleSpeed : this.valueToFloat(6),
        })
        this.rect2.updateInput({
            posX : this.valueToFloat(7),
            posY : this.valueToFloat(8),
            angle : this.valueToFloat(9),
            width : this.valueToFloat(10),
            height : this.valueToFloat(11),
            movementSpeed : this.valueToFloat(12),
            angleSpeed : this.valueToFloat(13),
        })
    }
    valueToFloat(id){
        return parseFloat(this.inputElement[id].value)
    }
    setValue(){
        if(!this.inputChange.size)
        this.inputElement.forEach((el, index) => {
            const value = this.value()[index]
            el.value = parseFloat(value).toFixed(2)
        })
    }
}