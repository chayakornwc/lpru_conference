import React from 'react';

const Button = (props) => {
    return (
    <button onClick={props.handleClick}>{props.caption}</button>
    )
    }
    export default Button;
    

