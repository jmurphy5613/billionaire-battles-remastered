import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from '../../helpers/addresses';
import BillionaireBattles from '../../public/BillionaireBattles.json';
import { hexToInt } from '../../helpers/conversions';

import HealthBar from './HealthBar';


declare var window:any;

interface CharacterInformationProps {
    tokenId: number
}

const CharacterInformation:React.FC<CharacterInformationProps> = ({ tokenId }) => {

    const [dataFetched, setDataFetched] = useState(false);

    const [currentHealth, setCurrentHealth] = useState<number>();
    const [maxHealth, setMaxHealth] = useState<number>();

    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const fetchData = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            const health = await contract.getCharacterHealthAndMaxHealthById(tokenId);
            setCurrentHealth(health[0]);
            setMaxHealth(health[1]);

            const displayInformation = await contract.getCharacterDisplayDataById(tokenId);
            setImage(displayInformation[0]);
            setName(displayInformation[1]);

            setDataFetched(true);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    borderRadius: '2rem'
                }}
            />
            {console.log(currentHealth, maxHealth)}
            <HealthBar health={currentHealth} maxHealth={maxHealth} />
        </div>
    )
}

export default CharacterInformation;