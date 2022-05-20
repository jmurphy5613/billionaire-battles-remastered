import Popup from "reactjs-popup";
import MarketItemGrid from "./nft-grid/MarketItemGrid";

import { Button, Typography } from '@mui/material';

import { ethers } from "ethers";

import { useEffect, useState } from "react";

import { BillionaireBattlesAddress } from '../helpers/addresses';
import BillionaireBattles from '../public/BillionaireBattles.json';
import { putNftIntoCorrectObjectFormat } from "../helpers/format";


declare var window:any;

const SelectBillionairePopup = () => {

    const [ownedBillionaires, setOwnedBillionaires] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);


    const getOwnedBillionaires = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            //get the users wallet
            const wallet = await etherConnection.request({ method: 'eth_accounts' })
            console.log(wallet);


            //get the users nfts
            const nftIndexesHex = await contract.getCharactersFromAddress(wallet[0]);
            if(nftIndexesHex) {
                //get the indexes of the nfts that are owned
                const nftIndexesInt = [];
                if(nftIndexesHex.length > 0) {
                    for(let i = 0; i < nftIndexesHex.length; i++) {
                        nftIndexesInt.push(parseInt(nftIndexesHex[i], 16));
                    }
                    
                }
                console.log(nftIndexesInt);

                //get the metadata from the nfts owned
                const characterMetaData = [];
                for(let i = 0; i < nftIndexesInt.length; i++) {
                    const currentData = await contract.getCharacterDisplayDataById(nftIndexesInt[i]);
                    characterMetaData.push(currentData);
                }

                //get the health from the characters
                const characterHealth = [];
                for(let i = 0; i < nftIndexesInt.length; i++) {
                    const currentHealthHex = await contract.getCharacterHealthAndMaxHealthById(nftIndexesInt[i]);
                    const currentHealthInt = [];
                    for(let j = 0; j < 2; j++) {
                        currentHealthInt.push(parseInt(currentHealthHex[j], 10));
                    }
                    characterHealth.push(currentHealthInt);
                }

                //get everything in propper object format
                for(let i = 0; i < nftIndexesInt.length; i++) {
                    const objectFormat = putNftIntoCorrectObjectFormat(nftIndexesInt[i], characterMetaData[i][1], characterMetaData[i][0], characterHealth[i][0], characterHealth[i][1] );
                    ownedBillionaires.push(objectFormat);
                }
            }
            setDataFetched(true);
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            await getOwnedBillionaires();
        }
        fetchData();
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
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h3" sx={{
                        fontFamily: 'Inter',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '2rem',
                        marginTop: '3rem'
                    }}>
                        Choose your Billionaire
                    </Typography>
                </div>
            </div>
        </Popup>
    )
}

export default SelectBillionairePopup;