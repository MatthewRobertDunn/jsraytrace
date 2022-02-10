import Material from './material.js';
import Ray from './ray.js'

export default class Sphere {
    origin;
    radius;
    material;
    /**
     * Constructs an instance of the Sphere class
     * @param {number[]} origin 
     * @param {number} radius 
     * @param {Material} material 
     */
    constructor(origin, radius, material) {
        this.origin = origin;
        this.radius = radius;
        this.material = material;
        this.radiusSquare = math.square(radius);
    }

    intersects(ray) {
        //normalize to sphere origin
        let o = math.subtract(ray.origin, this.origin);

        //Solve using quadratic equation
        let a = math.dot(ray.direction, ray.direction); //Not needed if we normalize ray.direction really
        let b = math.dot(ray.direction, o) * 2.0;
        let c = math.dot(o, o) - this.radiusSquare;   //todo: calculate r^2 in constructor?

        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return null;
        }

        discriminant = math.sqrt(discriminant);

        let root1 = (-b - discriminant) / (2 * a);
        let root2 = (-b + discriminant) / (2 * a);
        if (root2 < 0) {
            return null;
        }

        let chosenRoot = root1 > 0 ? root1 : root2;
        let intersect = math.add(ray.origin, math.multiply(ray.direction, chosenRoot));
        const normal = math.normalize(math.subtract(intersect, this.origin));

        return {
            root1,
            root2,
            normal,
            coord: intersect,
            entity: this
        }
    }
}
