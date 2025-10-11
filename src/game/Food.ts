export class Food {
    x: number;
    y: number;
    color: string;
    size: number;

    constructor(x: number, y: number, color: string, size: number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size)
    };
};