import React from 'react';
import './styles/skateboard.css'


const TextContainer = () => {

    const Container_Styles = {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        pointerEvents: "none",
        top: '7%'
    }

    const Wraper_Styles = {
        textAlign: 'center',
    }

    const Title_Styles = {
        color: 'white',
        fontSize: '7rem',
        letterSpacing: '1rem',
        fontWeight: 'normal'

    }

    const Subtitle_Styles = {
        color: 'white',
        fontSize: '10rem',
        marginTop: '1.2rem',
        // letterSpacing: '2rem',
        fontWeight: 'normal'
    }

    const title = getTitle()

    return (
        <div style={Container_Styles}>
            <div style={Wraper_Styles}>

                <h1 className="titleSB" style={Title_Styles}>{title}</h1>
                <h2 className="subtitleSB" style={Subtitle_Styles}>Custom Boards</h2>
            </div>
        </div>
    )
}

const getTitle = () => {
    const opacity = 1
    const title = []
    const name = 'Skate-Factory'
    const colors = [`rgba(255,105,0,${opacity})`, `rgba(85,255,225,${opacity})`, `rgba(6,147,227,${opacity})`, `rgba(0,208,132,${opacity})`, `rgba(166,253,41,${opacity})`, `rgba(247,141,167,${opacity})`, `rgba(153,0,239,${opacity})`, `rgba(235,20,76,${opacity})`, `rgba(255,59,148,${opacity})`]
    for (let i = 0; i < 13; i++) {
        title.push(<span key={i} style={{ textShadow: `0px 0px 70px ${colors[i % colors.length]}`, color: `${colors[i % colors.length]}` }}>{name[i]}</span>)
    }


    return title
}

export default TextContainer;