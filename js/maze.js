class Maze{
    constructor(height, width, start, finish, openBlocks){
        this.height = height
        this.width = width
        this.start = start
        this.finish = finish
        this.openBlocks = openBlocks

        this.blocks = new Array(this.height, this.width)

        for(let row = 0; row < height; row++){
            this.blocks[row] = []
            for(let column = 0; column < width; column++){
                this.blocks[row][column] = 0
            }
        }

        this.resetBlocks()
    }

    getStart(){
        return this.start
    }

    getFinish(){
        return this.finish
    }

    getBlockAt(x, y){
        if(y < this.height && y >= 0)
            return this.blocks[y][x]
        else return -1
    }

    setBlockAt(x, y, value){
        this.blocks[y][x] = value
    }

    resetBlocks(){

        this.setBlockAt(this.start[0], this.start[1], 2)
        this.setBlockAt(this.finish[0], this.finish[1], 3)
        
        this.openBlocks.forEach(element => {
            this.setBlockAt(element[0], element[1], 1)
        })
    }

    draw(x, y, blockSize, details){
        var colors = [0, 255, [0,0,255], [255,0,0], [100,100,200], [0,255,0], [150,255,255]]

        // Coloring the details of the current algorithm step
        if(details){

            let state = details[2]
            let lastBlock = state[state.length - 1]
            if(state.length > 0){
                state.forEach( block => { this.setBlockAt(block[0], block[1], 4) })

                this.setBlockAt(lastBlock[0], lastBlock[1], 5)
            }

            let children = details[3]

            children.forEach(path =>{
                let block = path[path.length - 1]
                this.setBlockAt(block[0], block[1], 6)
            })
        }

        // Drawing the blocks
        for(let row = 0; row < this.height; row++){
            for(let column = 0; column < this.width; column++){
                fill(colors[this.getBlockAt(column, row)])
                rect(x + column * blockSize, y + row * blockSize, blockSize, blockSize)
            }
        }

        // Reseting the blocks' matrix
        if(details){
            this.resetBlocks()
        }
        
    }
    
    drawPath(x, y, blockSize, path){
        var colors = [0, 255, [0,200,125]]

        if(path.length > 0){
            path.forEach(block => {
                this.setBlockAt(block[0], block[1], 2)
            })
    
            // Drawing the blocks
            for(let row = 0; row < this.height; row++){
                for(let column = 0; column < this.width; column++){
                    fill(colors[this.blocks[row][column]])
                    rect(x + column * blockSize, y + row * blockSize, blockSize, blockSize)
                }
            }
        }

    }
}
