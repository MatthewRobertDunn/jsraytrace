export default class Material {
    color;
    reflection;
    /**
     * 
     * @param {number[]} color 
     * @param {number} reflection 
     */
    constructor(color, reflection = 0.0) {
        this.color = color;
        this.reflection = reflection;
    }
}
