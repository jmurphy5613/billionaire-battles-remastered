import {Typography} from "@mui/material";



interface statusProps {
    connected: boolean
}

const ConnectedStatus:React.FC<statusProps> = ({
    connected
}) => {

    return (
        <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: 'auto',
            height: '100px',
        }}>
            <Typography variant="h6" sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.0rem',
                fontWeight: '500',
                textTransform: 'none',
                color: '#ffffff',
                backgroundColor: '#6c56d2',
                padding: '0.8rem',
                borderRadius: '0.5rem',
            }}>
                { connected ? 'Wallet Connected' : 'Wallet Not Connected' }
            </Typography>
        </div>
    )
}

export default ConnectedStatus;