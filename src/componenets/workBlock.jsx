import React from 'react'

const WorkBlock = ({block, shiftBlocks}) => {
  
  return (
    <div
      draggable="true"
      style={{...styles.WorkBlock_Wrapper, top:block.top + 12, height:`${block.height - 8}px` }}
      onClick={e=>{e.stopPropagation()}}
      onMouseDown={e=>{e.stopPropagation()}}
      onMouseUp={e=>{e.stopPropagation()}}
      onDrag={e=>shiftBlocks(e)}
      onDragStart={e=>{
        const modalRoot = new Image()
        e.dataTransfer.setDragImage(modalRoot, 0, 0)
      }}
      onDragEnd={(e) => shiftBlocks({type: "clearTypes", e})}
      id= {block.id}
    >
      <div 
       style={styles.WorkBlock_inner}
      >
      </div>
    </div>
  )
}

export default WorkBlock

const styles={
  WorkBlock_Wrapper:{
    width:"100%",
    position: "absolute",
    background:"rgba(0,0,0,0.3)",
    borderRadius:"5px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"0.25rem",
    cursor: "n-resize",

  },
  WorkBlock_inner:{
    width:"100%",
    height:"100%",
    background:"rgba(0,0,0,0.3)",
    borderRadius:"5px",
    cursor: "context-menu",
    position:"relative"
  },
  WorkBlock_Dragger:{
    width:"1rem",
    height:"1rem",
    borderRadius:"1rem",
    background: "rgba(255,255,255,1)",
    position:"relative",
    bottom:"-5rem",
    border:"solid",
    left:"14rem"
  },
  DownDragDiv:{
    width:" 100%",
    height:" 5px",
    background:" rgba(155,56,155,1)",
    position:" absolute",
    bottom:" 0",
    borderRadius:"5px",
    cursor: "n-resize",
  },
  TopDragDiv:{
    width:" 100%",
    height:" 5px",
    background:" rgba(155,56,155,1)",
    position:" absolute",
    top:" 0",
    borderRadius:"5px",
    cursor: "n-resize",
  }
}