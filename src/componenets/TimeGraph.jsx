import React from 'react'
import WorkBlockHolder from './workBlockHolder'
const TimeGraph = () => {

  const times = Array.from(Array(24).keys())

  return (
    <div style={{...styles.TimeGraph, position:"relative"}}>
        <table style={styles.Table}>
            <tbody>
                {times.map(time => {
                    return <tr style={styles.TimeBlock}>
                        <div style={styles.TimeNumberDiv}>
                            <span style={styles.TimeNumberSpan}>{time}</span>
                        </div>
                        <div style={styles.ContentDiv}></div>
                    </tr>
                })}
            </tbody>
        </table>
        <WorkBlockHolder />
    </div>
  )
}

export default TimeGraph


const styles={
    TimeGraph:{
        height:"fit-content",
        maxWidth: "31rem",
        width:"100%",
    },
    Table:{
      width:"100%"  
    },
    TimeBlock:{
        width:"100%",
        height:"100px",
        border:"black 1px",
        display:"flex",
    },
    TimeNumberDiv:{
        flexBasis:"10%"
    },
    TimeNumberSpan:{
        marginLeft: "17px",
        color:"slategray"
    },
    ContentDiv:{
        flexBasis:"90%",
        marginTop:"10px",
        borderTop: "solid 1px lightgray",
    }
}