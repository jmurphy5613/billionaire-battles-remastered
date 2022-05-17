import { BillionaireBattlesAddress } from "../helpers/addresses";

import { Typography } from "@mui/material";


const SmartContractWallet = () => {
    return (
        <div style={{
            position: 'absolute',

        }}>
            <Typography>
                {`Smart Contract Wallet: `}
            </Typography>
            <a href={``}>
                {BillionaireBattlesAddress}
            </a>
        </div>
    )
}

export default SmartContractWallet;