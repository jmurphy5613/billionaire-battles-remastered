import { ethers } from "ethers";

import { useState, useEffect } from 'react';

import { BillionaireBattlesAddress } from '../../helpers/addresses';
import { hexToInt } from "../../helpers/conversions";
import { putNftIntoCorrectObjectFormat } from "../../helpers/format";
import BillionaireBattles from '../../public/BillionaireBattles.json';

import MarketItemGrid from '../nft-grid/MarketItemGrid';

declare var window:any;

const Roster  = () => {
    const [allBillionaires, setAllBillionaires] = useState([]);

    const [dataFetched, setDataFetched] = useState(false);


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
                allBillionaires.push(objectFormat);
            }            
        }
        setDataFetched(true);
    }

    const getIdsOfBillionaires = async () => {
        const etherConnection = window.ethereum;
        const provider = new ethers.providers.Web3Provider(etherConnection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

        const bossIdsHex = await contract.getBossIds();
        let bossIdsInt = [];
        for(let i = 0; i < bossIdsHex.length; i++) {
            bossIdsInt[i] = hexToInt(bossIdsHex[i]);
        }
        const numberOfCharacters = await contract.getCharacterCount();

        let array = [];
        for(let i = 1; i <= numberOfCharacters; i++) {
            if(!bossIdsInt.includes(i)) {
                array.push(i);
            }
        }
        return array;
    }


    useEffect(() => {
        

        const fetchData = async () => {
            const array = await getIdsOfBillionaires();
            await getMarketItemData(array);
        }
        fetchData();

    }, []);


    return (

        <div style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <MarketItemGrid gridItems={allBillionaires} paddingTop={2} isMarketplace={false} />

        </div>
    )
}

export default Roster;