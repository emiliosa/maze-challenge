# Solving the maze

## Rules  
* You have to start and finish the maze in the letter B
* You should solve it considering that you can only walk in the 3 letter and consecutive sequence **CCC-DDD-EEE-DDD** and repeating the pattern. The consecutive letters don’t need to be on the same line. Your solution should be able to find the exit starting on any of the maze entries.
* You can cut the sequence if you find the letter B. I will assume that **B-CCC-DDD-E-B** or **B-CCC-DDD-CC-B** can be possible solutions
* The pattern to find is **B-XXX-XXX-....-X*N-B**, being Xs consecutive between them and 1<=N<=3

## Solution
* The solution is a Typescript program that reads the maze from a .txt file and prints the solution in the console. The solution is a sequence of letters that represents the path to the exit. The program should be able to solve any maze in the resources folder.
* The algorithm used to solve the maze is a recursive backtracking algorithm. It starts on the first letter B and tries to find the next allowed (**C**, **D**, **E**) letter in the sequence. 
* The allowed movements are **up**, **down**, **left** and **right**. If the algorithm finds a letter that is not allowed (**A**), it goes back to the previous letter and tries another path. If the algorithm finds the letter **B**, it means that it has found a solution and it prints it in the console. If the algorithm doesn’t find any solution, it prints a message in the console.

## Requirements
* Node.js
* NPM

## How to run the program
* Clone the repository
* Run `npm install` to install the dependencies
* Run `npm run-script test-case1` to run the program with case1.txt
* Run `npm run-script test-case2` to run the program with case2.txt
* If you want to use another maze, you can create a new .txt file in the resources folder and run `npm run-script test-<your-file-name>` to run the program with your file