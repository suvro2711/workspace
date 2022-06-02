import  React, {useState} from 'react'
import WorkBlock from './workBlock'
import {
  createNewWorkBlock,
  BlockCreatorAndStretcher,
  getEventDetails
} from '../utils/workBlockUtils'

const  WorkBlockHolder = () => {

  const useWorkBlockState = useState([])
  const [workBlocks, setWorkBlocks] = useWorkBlockState
  
  
  

  const shiftBlocks = (e) => {
  
    const BlockStretcher = new BlockCreatorAndStretcher(e, useWorkBlockState)

    const stretchedBlockType_justGotCorrected = BlockStretcher.checkAndCorrectTypeWhenStretchingStarts()
    if(stretchedBlockType_justGotCorrected){
      return
    }

    BlockStretcher.stretchBlockAndAddToArray()

  }


  return (
      <div style={{...styles.workTileHolder, position:"absolute"}}
       onMouseDown={(e) => createNewWorkBlock(e, useWorkBlockState)}
      >
        {workBlocks.map(block =>{
          return <WorkBlock 
            block={block} 
            shiftBlocks={shiftBlocks}
            key={block.id}
          />})}
      </div>
  )
}



export default WorkBlockHolder

const styles = {
  workTileHolder:{
    marginLeft: "4rem",
    height: "100%",
    top: "0",
    width: "100%",
    position: "absolute",
    borderLeft: "solid lightgray 1px"
  }
}
