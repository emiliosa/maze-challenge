export default class Node {
    private x: number;
    private y: number;
    private value: string;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    public getX(): number {
        return this.x;
    }
    public setX(value: number) {
        this.x = value;
    }

    public getY(): number {
        return this.y;
    }
    public setY(value: number) {
        this.y = value;
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(value: string) {
        this.value = value;
    }

    public equals(node: Node): boolean {
        return this.x === node.x && this.y === node.y && this.value === node.value;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}) => ${this.value}`;
    }
}
