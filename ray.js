export default class Ray {
    origin;
    direction;
    /**
     * 
     * @param {number[]} origin 
     * @param {direction[]} direction 
     */
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = math.normalize(direction);
    }
}
