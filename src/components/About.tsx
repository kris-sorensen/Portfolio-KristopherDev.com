import * as React from 'react';


interface AboutProps {
    hello: string;
    goodbye?: string;
}


const About=({hello, goodbye}: AboutProps) => {

    return (
        <div>{hello}</div>

    )
}


export default About