import React from 'react'

function Loading({ loading }) {

    return (
    <>
        {loading === true ? 
        <div className='loading-screen'>
         <svg className='circle'>
           <circle className='circle-svg' cx="50" cy="50" r="36" stroke="#137CFF" strokeWidth="5" fill="transparent" />  
         </svg> 
        </div> : ''}
    </> 
    )
}

export default Loading
