class BranchAndBound{

    // Initializing algorithm parameters
    constructor(maze){
        this.maze = maze

        this.search = [ [maze.getStart()] ]
        this.cost = Infinity
        this.state = [ maze.getStart() ]
        this.children = this.getChildren(this.state)
        
        this.finished = false
        this.bestPath = []
    }

    // Get all the children of a given block
    getChildren(path){
        let children = []
        let block = path[ path.length - 1]
        let x = block[0]
        let y = block[1]

        let positions = [
            [x + 1, y], [x, y + 1],
            [x - 1, y], [x, y - 1]
        ]

        positions.forEach(position => {
            if(maze.getBlockAt(position[0], position[1]) > 0){
                children.push( path.concat( [position] ) )
            }
        })

        return children
    }

    // Get all the details of the current step of the algorithm
    getDetails(){
        return [ this.search,
                 this.cost,
                 this.state,
                 this.children]
    }  

    // String representation of a block
    // Example: [1,2] -> '1-2'
    makeStringBlock(block) {
        return block[0] + '-' + block[1]
    }

    // Checks if a path contains the given block
    blockInPath(path, block) {
        return path.map( el => this.makeStringBlock(el) ).includes( this.makeStringBlock(block) )
    }

    // Executing the next step of the algorithm
    nextStep(){
        this.search.shift()
        this.search = this.children.concat(this.search)

        if( this.search.length == 0){
            this.finished = true
        }
        else{
            this.state = this.search[0]
            this.children = []

            // If it is a final state
            if( this.blockInPath(this.state, this.maze.getFinish()) && this.state.length < this.cost){
                this.bestPath = this.state
                this.cost = this.state.length
            }
            // Branch and Bound: Examine the following paths only if they are better than the current best
            else if(this.state.length + 1 < this.cost){
                // Get the children paths with no repeating nodes
                this.children = this.getChildren(this.state).filter( child => !this.blockInPath(this.state, child[child.length - 1]) )
                
            }
        }
               
    }

}