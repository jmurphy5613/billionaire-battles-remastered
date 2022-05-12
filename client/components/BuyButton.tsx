import { Button } from '@mui/material';


interface buyButtonProps {
    tokenId: number,
    marginLeft: number
}

declare var window:any;

const BuyButton:React.FC<buyButtonProps> = ({ tokenId, marginLeft }) => {

    const onButtonClick = () => {
        const ethereum = window.ethereum;

        if(ethereum) {
            //request transaction
            
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