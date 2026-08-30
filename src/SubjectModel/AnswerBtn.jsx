import React from 'react'
import { Button } from 'react-bootstrap'
export default function AnswerBtn({n1,n2,n3,n4,n5,handleQuestionChange}) {
    const handleClick=(questionId)=>{
        handleQuestionChange(questionId);
    }
    const CircleBtn={
        backgroundColor:"white",
        color:"black",
        border:"none",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        fontWeight:600,
        display:"flex",
        justifyContent:"center",
        borderRadius:"50%",
        // padding:"10px",
        height:"30px",
        width:"35px",
        alignItem:"center"
        
      }
    
  return (
    <div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",paddingTop:"30px",}}>
        <button style={CircleBtn} onClick={() => handleClick(n1)}>
          {n1}
        </button>
        <button style={CircleBtn} onClick={() => handleClick(n2)}>
          {n2}
        </button>
        <button style={CircleBtn} onClick={() => handleClick(n3)}>
          {n3}
        </button>
        <button style={CircleBtn} onClick={() => handleClick(n4)}>
          {n4}
        </button>
        <button style={CircleBtn} onClick={() => handleClick(n5)}>
          {n5}
        </button>
                </div>
    </div>
  )
}
