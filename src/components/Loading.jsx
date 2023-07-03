import React from 'react';
import {CircularProgress} from "@mui/material";

function Loading(props) {
    return (
        <div className="loading-page">

            <CircularProgress disableShrink sx={{color: "#06d6a0"}}/>
        </div>
    );
}

export default Loading;