import React from 'react';
import { createTitle } from './util/createTitle'
import useWindowSize from './../../hooks/useWindowSize';

const Title = () => {

    const { width } = useWindowSize();

    const Title_Styles = {
        color: 'white',
        fontSize: width > 600 ? '7rem' : '4rem',
        // fontSize: '4rem',
        letterSpacing: width > 600 ? '1rem' : '.6rem',
        // letterSpacing: '.6rem',
        fontWeight: 'normal'
    }

    const title = createTitle()
    return (
        <h1 className="titleSB" style={Title_Styles}>{title}</h1>
    )
}


export default Title;