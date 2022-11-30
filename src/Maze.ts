import Node from "./Node";

export class Maze {
    private width: number;
    private height: number;
    private maze: string[][];
    private startNode: Node;
    private endNode: Node;
    private visited: boolean[][];
    private solution: Node[];
    public static readonly START_VALUE = "B";
    public static readonly END_VALUE = "B";
    public static readonly WALL_VALUE = "A";

    constructor(file: string) {
        this.maze = [];
        this.loadMaze(file);
        this.width = this.maze[0].length;
        this.height = this.maze.length;
        this.startNode = this.findStartNode();
        this.endNode = this.findEndNode();
        this.visited = new Array(this.width).fill(false).map(() => new Array(this.height).fill(false));
        this.solution = [];
    }

    private loadMaze(file: string): void {
        file.split("\n").forEach((line) => {
            this.maze.push(line.split(","));
        });
    }

    private findStartNode(): Node {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const value = this.maze[x][y];
                if (value === Maze.START_VALUE) {
                    return new Node(x, y, value);
                }
            }
        }
        throw new Error("No start node found");
    }

    private findEndNode(): Node {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const value = this.maze[x][y];
                if (value === Maze.END_VALUE) {
                    const node = new Node(x, y, value);
                    if (!this.startNode.equals(node)) {
                        return node;
                    }
                }
            }
        }
        throw new Error("No end node found");
    }

    private isWall(node: Node): boolean {
        return node.getValue() === Maze.WALL_VALUE;
    }

    private isSafe(x: number, y: number): boolean {
        return (x >= 0 && x < this.width && y >= 0 && y < this.height);
    }

    private isVisited(x: number, y: number): boolean {
        return this.visited[x][y];
    }

    private isSolution(node: Node): boolean {
        return this.solution.includes(node);
    }

    private isConsecutive(node: Node): boolean {
        let count = 1;

        for (let i = this.solution.length - 1; i >= 0; i--) {
            if (this.solution[i].getValue() === node.getValue()) {
                count++;
            } else {
                break;
            }
        }

        return count > 3;
    }

    private isEndNode(node: Node): boolean {
        return node.equals(this.endNode);
    }

    private backtracking(x: number, y: number): boolean {
        if (this.isSafe(x, y)) {
            const node = new Node(x, y, this.maze[x][y]);
            if (this.isEndNode(node)) {
                this.solution.push(node);
                this.visited[x][y] = true;
                return true;
            }

            if (!this.isVisited(x, y)) {
                if (this.isWall(node) || this.isSolution(node) || this.isConsecutive(node)) {
                    return false;
                }

                this.solution.push(node);
                this.visited[x][y] = true;

                /* Move forward in X direction */
                if (this.backtracking(x + 1, y)) {
                    return true;
                }

                /* Then move in Y direction */
                if (this.backtracking(x, y + 1)) {
                    return true;
                }

                /* Then move back in X direction */
                if (this.backtracking(x - 1, y)) {
                    return true;
                }

                /* Then move back in Y direction */
                if (this.backtracking(x, y - 1)) {
                    return true;
                }

                /* Backtrack if no previous movement works */
                this.solution.pop();
                this.visited[x][y] = false;

                return false;
            }
        }

        return false;
    }

    private printMaze(): void {
        const maze = this.maze.map((row) => row.join(",")).join("\n");
        process.stdout.write(`Maze:\n${maze}\n\nStart node: ${this.startNode}\nEnd node: ${this.endNode}\n\n`);
    }

    private printRawSolution(): void {
        process.stdout.write("Solution raw path:\n" + this.solution.map((node) => node).join("\n").concat("\n\n"));
    }

    private printSolution(): void {
        // process.stdout.write("Path:\n" + this.solution.map((node) => node.getWeight() == 1 ? node.getValue() + "-" : node.getValue()).join("").replace(/-$/, "").concat("\n"));
        let output = "";

        for (let i = 0; i < this.solution.length; i++) {
            const node = this.solution[i];
            const nextNode = this.solution[i + 1]!;
            output += node.getValue();
            if (nextNode && node.getValue() !== nextNode.getValue()) {
                output += "-";
            }
        }

        process.stdout.write("Solution path:\n" + output.concat("\n"));
    }

    public solve(): void {
        this.printMaze();

        this.backtracking(this.startNode.getX(), this.startNode.getY());
        if (this.solution.length == 0) {
            process.stdout.write("There is NO maze path solution\n");
            return;
        } else {
            this.printRawSolution();
            this.printSolution();
        }
    }
}