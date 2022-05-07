import { useRouter } from "next/router";
import { useState, useEffect } from "react";


import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from "../../../helpers/addresses";
import BillionaireBattles from '../../../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';


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
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                height: '450px',
                width: '450px',
                borderRadius: '2rem',
                backgroundImage: `url(${characterData[0]})`,    
                backgroundSize: 'cover'
            }}>

            </div>
        </div>
    )
}

export default ItemProfile;