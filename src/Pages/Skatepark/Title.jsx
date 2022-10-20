import React, { useState } from 'react';
import { createTitle } from './util/createTitle'

const Title = () => {

    const title = useState(createTitle())

    return (
        <h1 className="titleSB" >{title}</h1>
    )
}


export default Title;