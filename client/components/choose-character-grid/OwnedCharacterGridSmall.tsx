import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { putNftIntoCorrectObjectFormat } from '../../helpers/format';
import { BillionaireBattlesAddress } from '../../helpers/addresses';
import BillionaireBattles from '../../public/BillionaireBattles.json';
import OwnedCharacterSmallGridItem from './OwnedCharacterSmallGridItem';


declare var window:any;

const OwnedCharacterGridSmall = () => {

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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: '80%',
            gridGap: '3rem',
        }}>
            {ownedBillionaires.map((element, index )=> {
                return (
                    <OwnedCharacterSmallGridItem key={index} id={element.id} name={element.name} health={element.health} maxHealth={element.maxHealth} image={element.image}  />
                )
            })}
        </div>
    )
}

export default OwnedCharacterGridSmall;