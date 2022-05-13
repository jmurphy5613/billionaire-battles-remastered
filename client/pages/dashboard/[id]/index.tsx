import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from "../../../helpers/addresses";
import BillionaireBattles from '../../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';

import { Typography } from "@mui/material";

import ProfileStatsGrid from '../../../components/profile-stats-grid/ProfileStatsGrid';
import OwnerUrl from '../../../components/OwnerUrl';
import SellButtonPopup from '../../../components/SellButtonPopup';
import CharacterPrice from '../../../components/CharacterPrice';
import BuyButton from '../../../components/BuyButton';



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
            });

            await contract.getOwnerOfCharcterByID(id).then((res:any) => {
                setCharacterOwner(res);
            });
        }
    }

    const getUserWallet = async () => {
        let provider = window.ethereum;

        if(typeof provider != 'undefined') {
            await provider.request({ method: 'eth_requestAccounts' }).then((accounts:any) => {
                if(accounts[0] === characterOwner.toLowerCase()) setUserIsOwner(true);
            })
        }
    }

    const [userIsOwner, setUserIsOwner] = useState(false);
    const [characterData, setCharacterData] = useState<Array<number>>();
    const [dataLoaded, setDataLoaded] = useState<boolean>();
    const [characterOwner, setCharacterOwner] = useState<string>("");
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
            await getUserWallet();
            console.log(userIsOwner);
        }
        fetchData();
    }, [id, characterOwner])

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
                width: '475px',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '1rem',
            }}>
                <Typography variant="h3" sx={{
                    color: '#ffffff',
                    fontSize: '2rem',
                    fontFamily: "Inter",
                    fontWeight: '700',
                }}>
                    {`${characterData[1]} #${id}`}
                </Typography>
                <Typography variant="h4" sx={{
                    color: 'rgb(62, 67, 138)',
                    fontSize: '1.5rem',
                    marginTop: '0.1rem',
                }}>
                    Billionaire Battles
                </Typography>

                {userIsOwner ? <SellButtonPopup name={characterData[1]} tokenId={id} /> : <div style={{marginTop: '0.3rem'}}>
                    <OwnerUrl owner={characterOwner} />
                </div>}

                <div style={{
                    display: 'flex',
                    width: '100%'
                }}>
                    <CharacterPrice />
                    { !userIsOwner && <BuyButton marginLeft={3} tokenId={id} /> }
                    
                </div>
                <div style={{marginTop: '0.3rem'}}>
                    <ProfileStatsGrid name={"Character Stats:"} items={characterAbilities} />
                </div>

            </div>
        </div>
    )
}

export default ItemProfile;