import { Typography } from '@mui/material';


const Fight:React.FC = () => {
    return (
        <div style={{
            width: '100%',
            textAlign: 'center'
        }}>
            <Typography variant="h3" sx={{
                marginTop: '3rem',
                color: '#ffffff',
                fontFamily: 'Inter',
                fontWeight: '500'
            }}>
                Challenge a Billionaire!
            </Typography>

        </div>
    )
}

export default Fight;