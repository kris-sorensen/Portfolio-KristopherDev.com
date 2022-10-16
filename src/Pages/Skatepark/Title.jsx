import React from 'react';
import './styles/skateboard.css'


const Title = () => {

    const Container_Styles = {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        pointerEvents: "none",
        top: '8%'
    }

    const Wraper_Styles = {
        textAlign: 'center',
    }

    const Title_Styles = {
        color: 'white',
        fontSize: '5rem',
        letterSpacing: '2.5rem',
        fontWeight: 'normal'

    }

    const Subtitle_Styles = {
        color: 'white',
        fontSize: '10rem',
        // letterSpacing: '2rem',
        fontWeight: 'normal'
    }

    return (
        <div style={Container_Styles}>
            <div style={Wraper_Styles}>
                <h1 className="titleSB" style={Title_Styles}>Skate-Factory</h1>
                <h2 className="subtitleSB" style={Subtitle_Styles}>Custom Boards</h2>
            </div>
        </div>
    )
}


export default Title;