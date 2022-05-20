import Popup from "reactjs-popup";
import OwnedCharacterGridSmall from "./choose-character-grid/OwnedCharacterGridSmall";

import { Button, Typography } from '@mui/material';

const SelectBillionairePopup = () => {

    return (
        <Popup
            modal
            trigger={        
            <Button variant="contained" sx={{
                backgroundColor: '#e53935',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                width: '12rem',
                height: '3.2rem',
                '&:hover': {
                    backgroundColor: '#e53935',
                },
                marginTop: '1rem',
            }}>
                Challenge
            </Button>}
        >
            <div style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '80vw',
                    height: '80vh',
                    background: '#00000f',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography variant="h3" sx={{
                        fontFamily: 'Inter',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '2rem',
                        marginTop: '3rem',
                        marginBottom: '3rem'
                    }}>
                        Choose your Billionaire
                    </Typography>
                    <OwnedCharacterGridSmall />
                </div>
            </div>
        </Popup>
    )
}

export default SelectBillionairePopup;