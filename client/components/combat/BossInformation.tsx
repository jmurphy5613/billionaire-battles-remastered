import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from '../../helpers/addresses';
import BillionaireBattles from '../../public/BillionaireBattles.json';


declare var window:any;

interface BossInformationProps {
    tokenId: number
}

const BossInformation:React.FC<BossInformationProps> = ({ tokenId }) => {

    const [dataFetched, setDataFetched] = useState(false);
    const [bossInformation, setBossInformation] = useState();

    const fetchData = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            const bossData = contract.getBossStringDataById(tokenId);
            setBossInformation(bossData);

            setDataFetched(true);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '40vh',
            border: '1px solid white'
        }}>

        </div>
    )
}

export default BossInformation;