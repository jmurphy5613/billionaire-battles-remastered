//react imports
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

//contract imports
import BillionaireBattles from '../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';
import { BillionaireBattlesAddress } from '../../helpers/addresses';

//mui imports
import { Typography, Box } from '@mui/material';

import MarketItemGrid from '../nft-grid/MarketItemGrid';
import { putNftIntoCorrectObjectFormat } from '../../helpers/format';

declare var window: any

const MarketPlace = () => {

    const [numberOfMarketItems, setNumberOfMarketItems] = useState<number>();
    const [marketItems, setMarketItems] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    const getMarketItems = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            //get the market items
            const marketItemIdsHex = await contract.getMarketItems();

            if(marketItemIdsHex) {
                const nftIndexesInt = [];
                for(let i = 0; i < marketItemIdsHex.length; i++) {
                    nftIndexesInt.push(parseInt(marketItemIdsHex[i], 16));
                }

                let numberThatIsNotZero = false;
                for(let i = 0; i < nftIndexesInt.length; i++) {
                    if(nftIndexesInt[i] > 0) numberThatIsNotZero = true;
                }
                if(!numberThatIsNotZero) setNumberOfMarketItems(0);
                if(numberThatIsNotZero) {
                    await getMarketItemData(nftIndexesInt);
                }
            }
            setDataFetched(true); 
        }
    }

    const getMarketItemData = async (nftIndexesInt:Array<number>) => {

        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

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
                marketItems.push(objectFormat);
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
        <div style={{
            display: 'flex',
            width: '100vw',
            justifyContent: 'center',
        }}>
            <MarketItemGrid gridItems={marketItems} paddingTop={2} isMarketplace={true} />
        </div>
    )
}

export default MarketPlace;