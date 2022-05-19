import Popup from "reactjs-popup"
import ChallengeButton from "./ChallengeButton";

import { Button } from '@mui/material'

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
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '30vw',
                    height: '30vh',
                    background: '#00000f'
                }}>

                </div>
            </div>
        </Popup>
    )
}

export default SelectBillionairePopup;