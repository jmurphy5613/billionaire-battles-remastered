import Popup from "reactjs-popup";
import MarketItemGrid from "./nft-grid/MarketItemGrid";

import { Button, Typography } from '@mui/material';

import { ethers } from "ethers";

import { useEffect } from "react";

import { BillionaireBattlesAddress } from '../helpers/addresses';
import BillionaireBattles from '../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';


declare var window:any;

const SelectBillionairePopup = () => {

    useEffect(() => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);
        }
    }, [])

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
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '60vw',
                    height: '60vh',
                    background: '#00000f',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    <Typography variant="h3" sx={{
                        fontFamily: 'Inter',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '2rem'
                    }}>
                        Choose your Billionaire
                    </Typography>
                    <MarketItemGrid />
                </div>
            </div>
        </Popup>
    )
}

export default SelectBillionairePopup;