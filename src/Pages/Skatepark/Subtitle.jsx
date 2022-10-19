import React from 'react';
import useWindowSize from './../../hooks/useWindowSize';


const Subtitle = () => {

    const { width } = useWindowSize();

    const Subtitle_Styles = {
        color: 'white',
        fontSize: width > 600 ? '9.5rem' : '6rem',
        // fontSize: '6rem',
        marginTop: '1.3rem',
        fontWeight: 'normal'
    }

    return (
        <h2 className="subtitleSB" style={Subtitle_Styles}>Custom Boards</h2>
    )
}


export default Subtitle;