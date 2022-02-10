import Camera from './camera.js';
import Ray from './ray.js'
export default class RayTracer {
    world;
    camera;
    lights;
    /**
     * 
     * @param {Object[]} world 
     * @param {Camera} camera 
     * @param {Object[]} lights 
     */
    constructor(world, camera, lights) {
        this.world = world;
        this.camera = camera;
        this.lights = lights;
    }

    *trace() {
        //Iterate through all the points on the film
        for (let filmCoord of this.camera.filmCoords()) {
            //Get our initial ray
            const ray = new Ray([0, 0, 0], filmCoord);
            const color = this.traceRay(ray);
            yield {
                coord: filmCoord,
                color: color
            }
        }
    }

    traceRay(ray) {
        const intersectResult = this._intersectsWorld(ray);
        if (intersectResult) {
            const light = this.lights[0];
            const lightDirection = math.subtract(light.origin, intersectResult.coord);
            const lightingAmount = math.dot(math.normalize(lightDirection), math.normalize(intersectResult.normal));

            const lightColor = math.multiply(lightingAmount,light.material.color);
            return math.dotMultiply(intersectResult.entity.material.color,lightColor);
        } else {
            return [0, 0, 0];
        }
    }

    _intersectsWorld(ray) {
        for (let entity of this.world) {
            const intersectResult = entity.intersects(ray);
            //Found a result, return it.
            if (intersectResult) {
                return intersectResult;
            }
        }
        return null;
    }
}
