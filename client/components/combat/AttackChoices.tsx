import { useEffect, useState } from 'react';

import { Button } from '@mui/material';

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from '../../helpers/addresses';
import BillionaireBattles from '../../public/BillionaireBattles.json';
import { hexToInt } from '../../helpers/conversions';

declare var window:any;

interface AttackChoicesProps {
    tokenId: number
}

const AttackChoices:React.FC<AttackChoicesProps> = ({ tokenId }) => {

    const [dataFetched, setDataFetched] = useState(false);
    const [abilitiesList, setAbilitiesList] = useState([{},{},{}])

    const fetchData = async () => {
        const etherConnection = window.ethereum;
        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            await contract.getCharacterById(tokenId).then((res:any) => {
                setAbilitiesList([
                    {
                        nickname: res.attack1Name,
                        damage: hexToInt(res[10])
                    },
                    {
                        nickname: res.attack2Name,
                        damage: hexToInt(res[11])
                    },
                    {
                        nickname: res.attack3Name,
                        damage: hexToInt(res[12])
                    }
                ])
            });

            setDataFetched(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div style={{
            height: '6vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Button variant="contained" sx={{ marginRight: '0.5rem', marginLeft: '0.5rem', backgroundColor: '#6c56d2' }}>{`${abilitiesList[0].nickname} | ${abilitiesList[0].damage} dmg`}</Button>
            <Button variant="contained" sx={{ marginRight: '0.5rem', marginLeft: '0.5rem', backgroundColor: '#6c56d2' }}>{`${abilitiesList[1].nickname} | ${abilitiesList[1].damage} dmg`}</Button>
            <Button variant="contained" sx={{ marginRight: '0.5rem', marginLeft: '0.5rem', backgroundColor: '#6c56d2' }}>{`${abilitiesList[2].nickname} | ${abilitiesList[2].damage} dmg`}</Button>
        </div>
    )
}

export default AttackChoices