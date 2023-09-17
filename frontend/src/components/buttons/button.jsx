import React from 'react';
import {CircularProgress} from "@mui/material";

function Button({isLoading, name}) {
    return (

        <div className="button-style">
            {
                isLoading ? (
                        <CircularProgress size={20} color="inherit"/>
                    )
                    : (
                        <p>{name}</p>
                    )
            }
        </div>


    );
}

export default Button;