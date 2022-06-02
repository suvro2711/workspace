export const offSetAndRound = (value, offset) => {
    return Math.floor((value-offset)/100)*100
}

export const getEventDetails = (e) => {

    const currentStetchCursorPosition = e?.pageY
    const top = e?.target?.offsetTop - 12
    const height = e?.target?.offsetHeight + 8
    const stretchedBlockId = e?.target?.id
    const bottom = top + height
    const midpoint = top + (height/2)
    const isStretchedUpwards = currentStetchCursorPosition < midpoint
    const changeInHeightWhenStretchedDown = currentStetchCursorPosition - bottom
    const changeInHeightWhenStretchedUp = top - currentStetchCursorPosition
    
    return ({
        top, 
        height, 
        bottom, 
        midpoint, 
        currentStetchCursorPosition,
        isStretchedUpwards,
        changeInHeightWhenStretchedUp,
        changeInHeightWhenStretchedDown,
        stretchedBlockId
    })
}

export const getBlockFromId = (id, array) => {
    let searchedBlock
    array.forEach(block =>{ 
        if(block.id === id){
            searchedBlock = block
        }
    })
    return searchedBlock
}

export const getBlockFromEvent = (event, array) => {
    const { stretchedBlockId } = getEventDetails(event)
    
    let searchedBlock
    array.forEach(block =>{ 
        if(block.id == stretchedBlockId){
            searchedBlock = block
        }
    })
    
    return searchedBlock
}

export const createNewWorkBlock = (e, useWorkBlockState) => {

    const [workBlocks, setWorkBlocks] = useWorkBlockState
    const clickPosition = e.pageY
    const hasClickedFirstHour = clickPosition < 100
    const id = Math.floor(Math.random() * Date.now())

    if(hasClickedFirstHour){
        setWorkBlocks([...workBlocks, 
            { 
                id, 
                top:0, 
                height:100
            }
        ])
    }else{
        setWorkBlocks([...workBlocks, 
            {
                id, 
                top: offSetAndRound(clickPosition, 12), 
                height: 100
            }
        ])
    }
}

const shiftOtherBlocksUp = (block,index,array) =>{
    let isNotLastBlock = (array.length - 1) > index
    if( isNotLastBlock ){
      let belowBlockTop = array[index+1].top
      let currentBlockBottom = block.top + block.height
      // If the block below is overlapping the above block's top
      if(belowBlockTop <= currentBlockBottom){
        return {...block, top:belowBlockTop - block.height -1}
      }
    }
    return block
  }

const shiftOtherBlocksDown = (block,index,array) => {
    if(index > 0){
      let currentBlockBottom = block.top + block.height
      let previousBlockBottom = array[index-1].top + array[index-1].height
      let hasReachedTheBottom = currentBlockBottom == 2400
      let hasCrossedTheBottom = currentBlockBottom > 2400
      if(hasReachedTheBottom){
          return block
      }
      if(hasCrossedTheBottom){
          return {...block, top:2400 - block.height}
      }
          if(previousBlockBottom >= block.top){
          return {...block, top:previousBlockBottom+1}
          }
      }
      return block
}

const addBlockToArray = (newBlock, array) => {
 return array.map(block => block.id === newBlock.id ? newBlock : block)
}

export class BlockCreatorAndStretcher {
    constructor(event, useWorkBlockState) {
        let [workBlocks, setWorkBlocks] = useWorkBlockState
        this.workBlocks = workBlocks
        this.setWorkBlocks = setWorkBlocks
        this.event = event
    }

    updateBlock = (currentBlock, payload) => {
        let updatedWorkBlocks = this.workBlocks.map(block => {
            if(block.id === currentBlock.id){
                return ({...block, ...payload})
            }
            return block
        })
        this.setWorkBlocks(updatedWorkBlocks)
    }
    addStrechedBlockAndAdjustOtherBlock = (strechedBlock, newWorkBlocks) => {
        newWorkBlocks.sort((a,b)=> a.top - b.top)
        
        

        if(strechedBlock.type === "upDrag"){      
            this.setWorkBlocks(newWorkBlocks.map(shiftOtherBlocksUp))
        }
        if(strechedBlock.type  === "downDrag"){
            this.setWorkBlocks(newWorkBlocks.map(shiftOtherBlocksDown))
        }
        
        

    }
    stretchBlockHeight = () => {
        const stretchedBlock = getBlockFromEvent(this.event, this.workBlocks)
        const { 
            currentStetchCursorPosition,
            changeInHeightWhenStretchedUp,
            changeInHeightWhenStretchedDown,
            bottom
        } = getEventDetails(this.event)
        if(stretchedBlock.type === "upDrag"){
            return ({
                ...stretchedBlock,
                top: currentStetchCursorPosition,
                height: stretchedBlock.height + changeInHeightWhenStretchedUp,
            })
        }
        if(stretchedBlock.type === "downDrag"){
            return ({
                ...stretchedBlock,
                height: stretchedBlock.height + changeInHeightWhenStretchedDown,
            })
        }
    }

    setAllBlockTypesToNull = () => {
        let currentBlocks = this.workBlocks.map(block =>({...block, type:null}))
        this.setWorkBlocks(currentBlocks)
    } 

    checkIfEventTypeIsNotMatchingBlockType = () => {
        console.log('this.event, this.workBlocks: ', this.event, this.workBlocks);
        const stretchedBlock = getBlockFromEvent(this.event, this.workBlocks)
        const {isStretchedUpwards} = getEventDetails(this.event)
        if(isStretchedUpwards && stretchedBlock.type !== "upDrag"){
            return({isNotMatching : true, correctType: "upDrag"})
        }

        if(!isStretchedUpwards && stretchedBlock.type !== "downDrag"){
            return({isNotMatching : true, correctType: "downDrag"})
        }
        return ({isNotMatching: false})
    }

    checkAndCorrectTypeWhenStretchingStarts = () => {
        const {isNotMatching, correctType} = this.checkIfEventTypeIsNotMatchingBlockType()
        const stretchedBlock = getBlockFromEvent(this.event, this.workBlocks)
        if(isNotMatching){
            this.updateBlock(stretchedBlock, {type:correctType})
        }
        return isNotMatching
    }

    stretchBlockAndAddToArray = () => {
        let strechedBlock = this.stretchBlockHeight()
        console.log('strechedBlock: ', strechedBlock);
        
        let newWorkBlocks = addBlockToArray(strechedBlock, this.workBlocks)
        this.addStrechedBlockAndAdjustOtherBlock(strechedBlock, newWorkBlocks)
        return strechedBlock
    }

}