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
        this.camera.transformWorld(this.world,this.lights);
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

    /**
     * 
     * @param {Ray} ray 
     * @returns 
     */
    traceRay(ray, iteration = 0) {
        const intersectResult = this._intersectsWorld(ray);
        if (intersectResult) {
            let reflection = intersectResult.entity.material.reflection;
            const surfaceColor = math.multiply3Scalar(this.shadowRays(intersectResult), 1.0 - reflection);
            if(intersectResult.entity.material.reflection > 0 && iteration < 3){
                const d = ray.direction;
                const n = intersectResult.normal;
                const r = math.subtract3(d,math.multiply3Scalar(math.multiply3Scalar(n,math.dot3(d,n)),2.0));
                const reflectedRay = new Ray(intersectResult.coord,r);
                return math.add3(surfaceColor, math.multiply3Scalar(this.traceRay(reflectedRay,iteration+1),reflection));
            } else {
                return surfaceColor;
            }
        } else {
            return [0.1, 0.1, 0.1];
        }
    }

    shadowRays(intersectResult) {
        const lightColors = this.lights.map(light => {
            const lightSourceColor = this.shadowRay(intersectResult, light);
            return math.dotMultiply3(intersectResult.entity.material.color, lightSourceColor);
        });

        return lightColors.reduce((a,b) => math.add3(a,b));
    }

    /**
     * Returns the color contribution of a shadow ray from an intersect point to a light
     * @param {object} intersectResult 
     * @param {object} light 
     * @returns {Number[]}
     */
    shadowRay(intersectResult, light) {
        //construct a ray going to the light
        const lightDirection = math.normalize3(math.subtract3(light.origin, intersectResult.coord));
        //Create a ray slightly off the surface
        //const surfaceCoord = math.add(intersectResult.coord,math.multiply(intersectResult.normal,Number.MIN_VALUE));
        const surfaceCoord = intersectResult.coord;


        const lightRay = new Ray(surfaceCoord, lightDirection);
        //Check if we hit anything
        const lightIntersectResult = this._intersectsWorld(lightRay);

        if (lightIntersectResult) {
            return [0, 0, 0];  //Black, light is blocked
        } else {
            //Figure out contribution of this light source to the surface.
            const lightingAmount = math.dot3(lightDirection, intersectResult.normal);
            return math.multiply3Scalar(light.material.color, lightingAmount);
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
