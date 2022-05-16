import { ethers } from 'ethers';

import { Typography, Button } from '@mui/material';
import { useState } from 'react';

import { BillionaireBattlesAddress } from '../helpers/addresses';
import BillionaireBattles from '../../server/artifacts/contracts/BillionaireBattles.sol/BillionaireBattles.json';

import HomeButton from '../components/HomeButton';

declare var window:any;

const CreateBoss = () => {

    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [attack, setAttack] = useState<number>(0);

    const onSubmit = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            await contract.mintNewBoss(name, description, attack, image);
        }
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#282c44',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <HomeButton />
            <Typography variant="h3" sx={{
                color: '#fe5b77',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                paddingTop: '3rem',
                marginBottom: '1rem'
            }}>
                Mint a boss
            </Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center'
            }}>
                <input placeholder="Name" onChange={e => setName(e.target.value)} style={{
                    width: '20%',
                    marginBottom: '1rem'
                }}/>
                <input placeholder="Description" onChange={e => setDescription(e.target.value)} style={{
                    width: '20%',
                    marginBottom: '1rem'
                }}/>
                <input placeholder="Attack Damage" onChange={e => setAttack(e.target.value)} type="number" style={{
                    width: '20%',
                    marginBottom: '1rem'
                }}/>
                <input placeholder="Image" onChange={e => setImage(e.target.value)} style={{
                    width: '20%',
                    marginBottom: '1rem'
                }}/>
                <Button variant="contained" onClick={onSubmit} sx={{
                    textTransform: 'none'   
                }}>Submit</Button>
            </div>

        </div>
    )
}

export default CreateBoss;