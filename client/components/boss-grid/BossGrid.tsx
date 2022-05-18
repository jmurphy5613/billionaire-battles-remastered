import { useState, useEffect } from "react";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { BillionaireBattlesAddress } from "../../helpers/addresses";
import BillionaireBattles from '../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json'

import { ethers } from 'ethers';

import { hexToInt } from '../../helpers/conversions';

declare var window:any;

const BossGrid = () => {

    const [id, setId] = useState(0);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            const etherConnection = window.ethereum;

            if(etherConnection) {
                const provider = new ethers.providers.Web3Provider(etherConnection);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);
                
                const nftIndexesHex = await contract.getBossIds();
                console.log(nftIndexesHex);
                //convert the values to integer form
                const nftIndexesInt = [];
                if(nftIndexesHex.length > 0) {
                    for(let i = 0; i < nftIndexesHex.length; i++) {
                        nftIndexesInt.push(parseInt(nftIndexesHex[i], 16));
                    }
                    console.log(nftIndexesInt);
                }
                //fetch data for indexes found
                for(let i = 0; i < nftIndexesInt.length; i++) {
                    const current = await contract.getBossStringDataById(nftIndexesInt[i]);
                    console.log(hexToInt( current[6]));

                }
            }
            setDataFetched(true);
        }
        fetchData();
    }, [])

    return (
        <div>
            {/* This is the area for navigation between bosses */}
            <div style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
            }}>
                <ChevronRightIcon htmlColor="#ffffff" fontSize="large" />
            </div>
            <div style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',

            }}>
                <ChevronLeftIcon htmlColor="#ffffff" fontSize="large" />
            </div>
        </div>
    )
}

export default BossGrid;