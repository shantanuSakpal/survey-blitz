import React from 'react';

function Button(props) {
    return (
        <button className="button-style">{props.name}</button>
    );
}

export default Button;