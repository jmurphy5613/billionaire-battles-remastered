import Popup from "reactjs-popup";
import SubmitListing from "./SubmitListing";
import InputErrorCode from "./InputErrorCode";

import { Button, Typography } from "@mui/material";
import { useState } from "react";

interface sellButtonProps {
    name: string,
    tokenId: number
}

const SellButtonPopup:React.FC<sellButtonProps> = ({name, tokenId}) => {

    const [price, setPrice] = useState<number>();
    const [isValidAmount, setIsValidAmount] = useState<boolean>();

    return (
        <Popup 
            modal
            trigger={ <Button variant="contained" sx={{ width: '30%', marginTop: '0.3rem' }}>Sell</Button> }
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
                    width: '40vw',
                    height: '40vh',
                    background: '#00000f',
                    borderRadius: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography sx={{
                        color: '#fe5b77',
                        fontSize: '1.8rem',
                        fontFamily: "Inter",
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>
                        {`Set price for ${name}`}
                    </Typography>
                    <div style={{ 
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        marginTop: '1rem',
                        marginBottom: '3rem'
                    }}>
                        <input type="text" placeholder="Price" onChange={e => {
                            if(!isNaN(e.target.value)) {
                                setPrice(e.target.value);
                                setIsValidAmount(true);
                            } else {
                                setIsValidAmount(false);
                            }
                        }} style={{
                            //create a style for the input
                            width: '30%',
                            height: '3rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #fe5b77',
                            outline: 'none',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            fontSize: '1.5rem',
                            fontFamily: "Inter",
                            fontWeight: '700',
                            color: '#ffffff',
                            backgroundColor: '#00000f',
                        }} />
                        <Typography sx={{
                            color: '#ffffff',
                            fontSize: '1.8rem',
                            fontFamily: "Inter",
                            fontWeight: '700',
                            paddingLeft: '0.7rem',
                        }}>
                            ETH
                        </Typography>
                    </div>  
                    {isValidAmount ? <SubmitListing tokenId={tokenId} /> : <InputErrorCode />}
                </div>
            </div>
        </Popup>
    )
}

export default SellButtonPopup;