export default class Draw {
    constructor(canvas, rayTracer) {
        this.rayTracer = rayTracer;
        this.canvas = canvas;
    }
    draw() {
        let width = this.canvas.width;
        let height = this.canvas.height;
        let ctx = this.canvas.getContext('2d');
        var id = ctx.getImageData(0, 0, width, height);
        var pixels = id.data;

        for (let pixel of this.rayTracer.trace()) {
            let canvasHalfWidth = self.canvas.width
            const x = Math.floor((pixel.coord[0] * width/2) +  width / 2);
            let y = Math.floor((pixel.coord[1] * height/2) + height / 2);
            y = height - y;
            const color = pixel.color;
            const off = (y * id.width + x) * 4;
            pixels[off] = color[0] * 255;
            pixels[off + 1] = color[1] * 255;
            pixels[off + 2] = color[2] * 255;
            pixels[off + 3] = 255;
        }
        ctx.putImageData(id, 0, 0);
    }
}