import { Button } from '@mui/material';

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from '../helpers/addresses';
import BillionaireBattles from '../public/BillionaireBattles.json';


interface buyButtonProps {
    tokenId: number,
    marginLeft: number
}

declare var window:any;

const BuyButton:React.FC<buyButtonProps> = ({ tokenId, marginLeft }) => {

    const onButtonClick = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            //request transaction
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            await contract.createMarketSale(tokenId, {
                value: 10
            });
        }
    }

    return (
        <Button onClick={onButtonClick} variant="contained" sx={{
            marginLeft: `${marginLeft}rem`,
            backgroundColor: '#00e676',
            '&:hover': {
                backgroundColor: '#00e676'
            },
            width: '5rem'
        }}>
            Buy
        </Button>
    )
}

export default BuyButton;