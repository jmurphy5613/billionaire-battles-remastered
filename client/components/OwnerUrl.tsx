import { Typography } from '@mui/material';  


interface ownerUrlProps {
    owner: string,
}

const OwnerUrl:React.FC<ownerUrlProps> = ({owner}) => {
    return (
        <Typography variant="h5" sx={{
            fontSize: '1rem',
            fontFamily: "Ubuntu",
            color: '#b2bac2'
        }}>
           {`Owned by `}         
            <a href={`https://rinkeby.etherscan.io/search?f=0&q=${owner}`} style={{
                color: '#325DFF',
                textDecoration: 'none',
            }}>
                {owner}
            </a>
        </Typography>
    )
}

export default OwnerUrl;