import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from '../../helpers/addresses';
import BillionaireBattles from '../../public/BillionaireBattles.json';

import HealthBar from './HealthBar';


declare var window:any;

interface BossInformationProps {
    tokenId: number
}

const BossInformation:React.FC<BossInformationProps> = ({ tokenId }) => {

    const [dataFetched, setDataFetched] = useState(false);
    const [bossInformation, setBossInformation] = useState<any>();

    const fetchData = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            const bossData = await contract.getBossStringDataById(tokenId);
            setBossInformation(bossData);

            setDataFetched(true);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    /*
    0 - wallet
    1 - name
    2 - descirption
    3 - image
    4 - attack
    */

    if(!dataFetched) {
        return <div></div>
    }

    return (
        <div style={{
            width: '100%',
            height: '44vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <div 
                style={{
                    height: '275px',
                    width: '275px',
                    backgroundImage: `url(${bossInformation[3]})`,
                    backgroundSize: 'cover',
                    borderRadius: '2rem'
                }}
            />
            <HealthBar health={bossInformation[5]} maxHealth={bossInformation[6]} />
        </div>
    )
}

export default BossInformation;