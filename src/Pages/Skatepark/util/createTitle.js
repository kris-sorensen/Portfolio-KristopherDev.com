import React from 'react';



export const createTitle = () => {
    const opacity = 1
    const title = []
    const name = 'Skate-Factory'
    const colors = [`rgba(255,105,0,${opacity})`, `rgba(85,255,225,${opacity})`, `rgba(6,147,227,${opacity})`, `rgba(0,208,132,${opacity})`, `rgba(166,253,41,${opacity})`, `rgba(247,141,167,${opacity})`, `rgba(153,0,239,${opacity})`, `rgba(235,20,76,${opacity})`, `rgba(255,59,148,${opacity})`]
    for (let i = 0; i < 13; i++) {
        title.push(<span key={i} style={{ textShadow: `0px 0px 70px ${colors[i % colors.length]}`, color: `${colors[i % colors.length]}` }}>{name[i]}</span>)
    }


    return title
}