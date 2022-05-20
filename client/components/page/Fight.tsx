//@ts-nocheck


import { Typography } from '@mui/material';

import { useState, useEffect } from 'react';

import BossGrid from '../boss-grid/BossGrid';


const Fight:React.FC = () => {

    const [bossSelected, setBossSelected] = useState(0);
    const [characterSelected, setCharacterSelected] = useState(0);

    if(bossSelected != 0 && characterSelected != 0) {
        console.log(bossSelected, characterSelected);
    }

    return (
        <div style={{
            width: '100%',
            height: '90vh',
            textAlign: 'center',
        }}>
            {/* <Typography variant="h3" sx={{
                marginTop: '3rem',
                color: '#ffffff',
                fontFamily: 'Inter',
                fontWeight: '500'
            }}>
                Challenge a Billionaire!
            </Typography> */}
            <BossGrid setBossSelected={setBossSelected} setCharacterSelected={setCharacterSelected} />
        </div>
    )
}

export default Fight;