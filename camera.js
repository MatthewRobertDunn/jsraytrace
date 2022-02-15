export default class Camera {
    up;
    right;
    forward;
    aspectRatio;
    raysPerUnit;
    filmDistance;
    viewMatrix;
    constructor({ origin = [0, 0, 0],
        up = [0, 1, 0],
        right = [1, 0, 0],
        forward = [0, 0, 1],
        aspectRatio = 1.0,
        raysPerUnit = 200,
        filmDistance = 4.0 }) {

        this.origin = origin;
        this.up = up;
        this.right = right;
        this.forward = forward;
        this.aspectRatio = aspectRatio;
        this.raysPerUnit = raysPerUnit;
        this.filmDistance = filmDistance;
        this.createViewMatrix();
    }

    //Build a view matrix to transform the world.
    createViewMatrix() {
        //this.viewMatrix = math.matrix([this.right, this.up, this.forward, this.origin]);
        this.viewMatrix = [
            [this.right[0], this.up[0], this.forward[0], -this.origin[0]],
            [this.right[1], this.up[1], this.forward[1], -this.origin[1]],
            [this.right[2], this.up[2], this.forward[2], -this.origin[2]],
            [0, 0, 0, 1]
        ];
        console.log(this.viewMatrix);
    }

    //Transforms the current world so the camera is at 0,0,0 and pointing forward
    /**
     * 
     * @param {object[]} world 
     * @param {object[]} lights 
     */
    transformWorld(world, lights) {
        //todo: transform the world by the viewmatrix
        for (let entity of world.concat(lights)) {
            entity.origin.push(1);
            let o = math.multiply(this.viewMatrix, entity.origin);
            entity.origin = [o[0], o[1], o[2]];
        }
    }
    

    //Generator function returns all coordinates on the film
    //aspectRataio, eg, 16:9 for widescreen
    //raysPerUnit, how many rays per distance, similar to dpi
    //filmDistance distance from camera to viewplane
    *filmCoords() {
        for (let x = -1 * this.aspectRatio; x <= 1 * this.aspectRatio; x += 2.0 / (this.raysPerUnit * this.aspectRatio))
            for (let y = -1; y <= 1; y += 2.0 / this.raysPerUnit) {
                yield [x, y, this.filmDistance];
            }
    }
}
