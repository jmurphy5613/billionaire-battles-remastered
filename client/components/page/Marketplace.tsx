//react imports
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

//contract imports
import BillionaireBattles from '../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';
import { BillionaireBattlesAddress } from '../../helpers/addresses';

//mui imports
import { Typography, Box } from '@mui/material';

declare var window: any

const MarketPlace = () => {

    const [numberOfMarketItems, setNumberOfMarketItems] = useState<number>();

    const getMarketItems = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            //obtain wallet address
            const wallet = await etherConnection.request({ method: 'eth_accounts' })
            console.log(wallet);

            //get the market items
            const marketItemIdsHex = await contract.getMarketItems();

            if(marketItemIdsHex) {
                const nftIndexesInt = [];
                for(let i = 0; i < marketItemIdsHex.length; i++) {
                    nftIndexesInt.push(parseInt(marketItemIdsHex[i], 16));
                }
                console.log(nftIndexesInt);

                let numberThatIsNotZero = false;
                for(let i = 0; i < nftIndexesInt.length; i++) {
                    if(nftIndexesInt[i] > 0) numberThatIsNotZero = true;
                }
                if(!numberThatIsNotZero) setNumberOfMarketItems(0);
            } 
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            await getMarketItems();
        }
        fetchData();
    }, [])

    if(numberOfMarketItems === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '45vw'
            }}>
                <Typography variant='h1' style={{
                    color: '#ffffff',
                    fontFamily: 'Inter',
                    fontWeight: 'bold',
                    fontSize: "3rem",
                }}>
                    No items for sale
                </Typography>
            </Box>
        )
    }

    return (
        <div>
            
        </div>
    )
}

export default MarketPlace;