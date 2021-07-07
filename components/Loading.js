import React from 'react'
import {Circle} from 'better-react-spinkit'
import Image from 'next/image'

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height:"100vh"}}>
            <div>
                <Image
                src = "http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                alt = ""
                style ={{marginBottom: 10}}
                height={200}
                width = {200}
                />
                <Circle color="lightgreen" size={60}/>
            </div>
        </center>
    )
}

export default Loading
