//@ts-nocheck


import { useState, useEffect } from "react";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BossGridItem from "./BossGridItem";
import GridCounter from "../GridCounter";

import { BillionaireBattlesAddress } from "../../helpers/addresses";
import BillionaireBattles from '../../public/BillionaireBattles.json';

import { ethers } from 'ethers';

import { hexToInt } from '../../helpers/conversions';

import { Box } from '@mui/material';

declare var window:any;

const BossGrid = () => {

    const [id, setId] = useState(0);
    const [numberOfBosses, setNumberOfBosses] = useState(0);
    const [bosses, setBosses] = useState<any>([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [tokenIds, setTokenIds] = useState([]);


    const fetchBosses = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);
            
            const nftIndexesHex = await contract.getBossIds();
            //convert the values to integer form
            const nftIndexesInt = [];
            for(let i = 0; i < nftIndexesHex.length; i++) {
                nftIndexesInt.push(parseInt(nftIndexesHex[i], 16));
            }

            //fetch data for indexes found
            for(let i = 0; i < nftIndexesInt.length; i++) {
                const current = await contract.getBossStringDataById(nftIndexesInt[i]);
                //check if the current index has a valid boss
                //current[1] is the name
                if(!current[1] == "") {
                    bosses[i] = (current);
                    tokenIds[i] = nftIndexesInt[i];
                }
            }
            setNumberOfBosses(bosses.length);
        }
        setDataFetched(true);
    }

    useEffect(() => {
        fetchBosses();
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            {/* This is the area for navigation between bosses */}
            <Box sx={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                '&:hover': {
                    cursor: 'pointer'
                },
            }}>
                <ChevronRightIcon htmlColor="#ffffff" fontSize="large" onClick={e => {
                    if(id+1 < numberOfBosses) {
                        setId(id+1);
                    }
                }} />
            </Box>
            <Box sx={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                '&:hover': {
                    cursor: 'pointer'
                }
            }}>
                <ChevronLeftIcon htmlColor="#ffffff" fontSize="large" onClick={e => {
                    if(!id == 0) {
                        setId(id-1);
                    }
                }} />
            </Box>
            {/*
            Object Format:
            0. wallet
            1. name
            2. description
            3. image
            5. health
            6. maxHealth
            7. attack
            4. attackName
            
            */}
            <div>
                { dataFetched && <BossGridItem 
                    id={id}
                    name={bosses[id][1]} 
                    health={hexToInt(bosses[id][5])} 
                    maxHealth={hexToInt(bosses[id][6])} 
                    description={bosses[id][2]} 
                    image={bosses[id][3]} 
                    wallet={bosses[id][0]}
                    tokenId={tokenIds[id]}
                    attackDamage={bosses[id][7]}
                    attackName={bosses[id][4]}
                />}
            </div>
            { dataFetched && <GridCounter currentId={id} numberOfBosses={numberOfBosses} />}
        </div>
    )
}

export default BossGrid;