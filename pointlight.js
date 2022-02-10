import Material from "./material.js";

export default class PointLight {
    origin;
    material;
    /**
     * 
     * @param {number[]} origin 
     * @param {Material} material 
     */
    constructor(origin, material) {
        this.origin = origin;
        this.material = material;
    }
}
