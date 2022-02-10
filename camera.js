export default class Camera {
    constructor({ origin = [0, 0, 0],
        up = [0, 1, 0],
        right = [1, 0, 0],
        forward = [0, 0, 1],
        aspectRatio = 1.0,
        raysPerUnit = 200,
        filmDistance = 1.0 }) {

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
        let viewMatrix = [this.right, this.up, this.forward, this.origin];
    }

    //Transforms the current world so the camera is at 0,0,0 and pointing forward
    transformWorld(world) {
        //todo: transform the world by the viewmatrix
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