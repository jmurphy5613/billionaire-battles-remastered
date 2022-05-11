import { useState, useEffect } from 'react';

import { ethers } from 'ethers';

import BillionaireBattles from '../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';
import { BillionaireBattlesAddress } from '../../helpers/addresses';

//component imports
import MarketItemGrid from '../nft-grid/MarketItemGrid';

//helper functions
import { putNftIntoCorrectObjectFormat } from '../../helpers/format';

declare var window:any;

const OwnedBillionaires:React.FC = () => {


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


    useEffect(() => {
        const fetchData = async () => {
            await getOwnedBillionaires();
        }
        fetchData();

    }, []);


    return (

        <div style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <MarketItemGrid gridItems={ownedBillionaires} paddingTop={2} isMarketplace={false} />

        </div>
    )
}

export default OwnedBillionaires;