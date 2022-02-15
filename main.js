import Sphere from './sphere.js'
import Camera from './camera.js'
import RayTracer from './raytracer.js'
import Draw from './draw.js'
import PointLight from './pointlight.js'

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function doSomething(canvas) {

    //default camer at 0,0,0 looking forward.
    const camera = new Camera({origin:[0,0,-10], aspectRatio: 1, raysPerUnit: canvas.height });

    //sphere at (0,0,3) radius 1, red
    const redSphere = new Sphere([0, 0, 3], 1, { color: [1, 0, 0], reflection: 0.1 });
    const blueSphere = new Sphere([2, -0.3, 3], 0.7, { color: [0, 0, 1], reflection: 0.1 });
    const greenSphere = new Sphere([-2, -0.3, 3], 0.7, { color: [0, 1, 0], reflection: 0.1 });
    
    
    const testMaterial = {
        reflection: 0,
        get color(){
            return [Math.random(),Math.random(),Math.random()];
        }
    }
    
    const groundSphere = new Sphere([0, -1000, 0], 999, {color:[1,1,1], reflection: 0.5});

    const world = [redSphere, blueSphere, greenSphere, groundSphere];

    const light = new PointLight([2, 4, 0], { color: [0.5, 0.5, 0.5] });
    const light2 = new PointLight([-2, 8, 0], { color: [0.5, 0.5, 0.5] });
    const rayTracer = new RayTracer(world, camera, [light, light2]);
    const draw = new Draw(canvas, rayTracer);
    draw.draw();
}
