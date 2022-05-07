import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from "../../../helpers/addresses";
import BillionaireBattles from '../../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';

import { Typography } from "@mui/material";

import ProfileStatsGrid from '../../../components/profile-stats-grid/ProfileStatsGrid';



declare var window: any


const ItemProfile = () => {

    const router = useRouter();
    const { id } = router.query;

    const fetchCharacterData = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            await contract.getCharacterDisplayDataById(id).then((res:any) => {
                setCharacterData(res);
                setDataLoaded(true);
            })
        }
    }

    const [characterData, setCharacterData] = useState<Array<number>>();
    const [dataLoaded, setDataLoaded] = useState<boolean>();
    const [characterAbilities, setCharacterAbilities] = useState<Array<any>>([
        {
            name: 'Primary Attack',
            nickname: 'Jab',
            damage: 25
        },
        {
            name: 'Primary Attack',
            nickname: 'Jab',
            damage: 25
        },
        {
            name: 'Primary Attack',
            nickname: 'Jab',
            damage: 25
        },

    ]);

    useEffect( () => {
        if(!id) {
            return;
        }
        const fetchData = async () => {
            await fetchCharacterData();
        }
        fetchData();
    }, [id])

    if(!dataLoaded) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div style={{
            backgroundColor: '#282c44',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                height: '450px',
                width: '450px',
                borderRadius: '2rem',
                backgroundImage: `url(${characterData[0]})`,    
                backgroundSize: 'cover'
            }} />
            <div style={{
                width: '450px',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="h3" sx={{
                    color: '#ffffff',
                    fontSize: '2rem',
                    fontFamily: "Inter",
                    fontWeight: '700',
                    paddingLeft: '1rem',
                }}>
                    {`${characterData[1]} #${id}`}
                </Typography>
                <ProfileStatsGrid name={"Character Stats:"} items={characterAbilities} />
            </div>
        </div>
    )
}

export default ItemProfile;