import { useEffect, useState } from "react";

import { ethers } from "ethers";

import BillionaireBattles from '../public/BillionaireBattles.json';
import { BillionaireBattlesAddress } from '../helpers/addresses';
import { hexToInt } from "../helpers/conversions";

import { Typography } from '@mui/material';

declare var window: any;


interface characterPriceProps {
    tokenId: number;
}

const CharacterPrice:React.FC<characterPriceProps> = ({tokenId}) => {

    const getPriceById = async (id: number) => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            contract.getPriceById(id).then((price:any) => {
                setPrice(hexToInt(price));
            })
        }
    }

    const [price, setPrice] = useState<number>();

    useEffect(() => {
        const fetchPrice = async () => {
            await getPriceById(tokenId);
        }
        fetchPrice();
    }, []);

    return (
        <div>
            {/* <Typography variant="h6">
                Current Price:
            </Typography> */}
            <Typography variant="h6" sx={{
                color: '#ffffff',
            }}>
                {price} ETH
            </Typography>
        </div>
    )
}

export default CharacterPrice;