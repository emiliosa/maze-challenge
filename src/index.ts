import { readFileSync } from "fs";
import { Maze } from "./Maze";

const file = readFileSync(`${process.argv[2]}`, "utf8");
const maze = new Maze(file);

maze.solve();