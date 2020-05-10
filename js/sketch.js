const MAZE_START = [0,5]
const MAZE_FINISH = [8,2]
const OPEN_BLOCKS = [[1,5],[2,5],[3,5],[4,5],[5,5],
                     [5,4],[5,3],[5,2],[5,1],[2,6],
                     [2,7],[3,7],[4,7],[5,7],[6,7],
                     [7,7],[7,6],[7,5],[7,4],[7,3],
                     [4,6],[1,7],[1,4],[1,3],[1,2],
                     [1,1],[2,1],[3,1],[4,1],[3,2],
                     [3,3],[4,3],[6,2],[6,4],[7,1],[7,2]]

var BLOCK_SIZE = 100
var maze
var algorithm

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.parent('canvas_div')

    noStroke()
    frameRate(20)

    // MAZE SETUP
    maze = new Maze(9, 9, MAZE_START, MAZE_FINISH, OPEN_BLOCKS)
    maze.draw(0, 0, BLOCK_SIZE)

    algorithm = new BranchAndBound(maze)
}

function draw() {
    resizeCanvas(window.innerWidth, window.innerHeight)

    maze.draw(0, 0, BLOCK_SIZE, algorithm.getDetails())

    algorithm.nextStep()

    if(algorithm.finished){
        maze.drawPath(0, 0, BLOCK_SIZE, algorithm.bestPath)

        if(algorithm.bestPath.length == 0){
            document.getElementById('message').innerHTML = "<b>No path found!</b>"
            maze.draw(0, 0, BLOCK_SIZE)
        }

        frameRate(0)
    }

}
