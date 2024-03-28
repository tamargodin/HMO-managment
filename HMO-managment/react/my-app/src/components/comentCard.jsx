import React from 'react'

export default function comentCard(props) {
  const client = props.client; 
  console.log("covidddddddddddddddddd",client.memberCovid);
  return (
   
    <div>
      <p style={{color:"black"}}>{client.identity}</p>
     
    </div>
  )
}
