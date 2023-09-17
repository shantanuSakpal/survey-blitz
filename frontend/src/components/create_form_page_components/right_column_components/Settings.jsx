import React from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LockIcon from '@mui/icons-material/Lock';
import CollapseButton from './CollapseButton';

function Settings() {
    return (
        <div className={`settings-container`}>
            <p>Settings</p>
            <CollapseButton
                icon={<AbcIcon fontSize="large"/>}
                text="Edit form name"
                content="name"
            />
            <CollapseButton
                icon={<ColorLensIcon/>}
                text="Change theme"
                content="theme"
            />
            <CollapseButton
                icon={<LockIcon/>}
                text="Change status"
                content="status"
            />
        </div>
    );
}

export default Settings;
