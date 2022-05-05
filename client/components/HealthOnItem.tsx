import { Typography, Box } from '@mui/material';


interface props {
    health: number,
    maxHealth: number
}

const HealthOnItem:React.FC<props> = ({health, maxHealth}) => {

    if(health === 0) {
        return (
            <div style={{
                position: 'relative',
                height: '1.3rem',
                width: '8rem',
                left: '45%',
                bottom: '1rem',
                fontFamily: 'Ubuntu',
                backgroundColor: '#c9163a',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="h5" sx={{
                    fontSize: '0.9rem', 
                    fontWeight: '600'
                }}>
                    {`${health}/${maxHealth}`}
                </Typography>
            </div>
        )
    }

    return (
        <div style={{
            position: 'absolute',
            height: '1.3rem',
            width: '8rem',
            fontFamily: 'Ubuntu',
            backgroundColor: '#17EF97',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h5" style={{
                fontSize: '0.9rem', 
                fontWeight: '600'
            }}>
                {`${health}/${maxHealth}`}
            </Typography>
        </div>
    )
}

export default HealthOnItem;