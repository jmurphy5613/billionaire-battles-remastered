import { Button } from "@mui/material";

import { ethers } from 'ethers';

import { BillionaireBattlesAddress } from '../helpers/addresses';
import BillionaireBattles from '../public/BillionaireBattles.json';

interface submitListingProps {
    tokenId: number,
    price: number
}

declare var window:any;

const SubmitListing:React.FC<submitListingProps> = ({ tokenId, price }) => {

    const createMarketListing = async () => {
        const etherConnection = window.ethereum;

        if(etherConnection) {
            const provider = new ethers.providers.Web3Provider(etherConnection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(BillionaireBattlesAddress, BillionaireBattles.abi, signer);

            const ethersPrice = ethers.utils.parseEther(price.toString());
    
            await contract.createMarketListing(tokenId, ethersPrice);
        }
    }

    console.log(tokenId);

    return (
        <Button variant="contained" onClick={createMarketListing}>
            Submit Listing
        </Button>
    )
}

export default SubmitListing;