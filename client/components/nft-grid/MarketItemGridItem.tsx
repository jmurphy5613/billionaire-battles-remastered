import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import SeeStats from '../SeeStats';
import HealthOnItem from '../HealthOnItem';

interface props {
    health: number,
    maxHealth: number,
    img: string,
    id: number,
    name: string
}

const MarketItemGridItem:React.FC<props> = ({
    health, 
    maxHealth,
    img,
    id,
    name
}) => {

    const [isBeingHovered, setIsBeingHovered] = useState(false);

    return (
        <div style={{
            height: '30vh',
            display: 'inline-flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '5px',
            border: '1px solid #3750A8',
            position: 'relative',
        }}
            onMouseEnter={ () => setIsBeingHovered(true)}
            onMouseLeave={ () => setIsBeingHovered(false)}
        >
            <Box sx={{
                position: 'absolute',
                transition: '0.5s',
                '&:hover': {
                    cursor: 'pointer',
                    backdropFilter: 'blur(2px)', /* Chrome, Safari, Opera */
                    filter: 'blur(2px)',                        
                },
                height: '100%',
                width: '100%',
            }}>
                <HealthOnItem health={health} maxHealth={maxHealth} />
            </Box>
        
            <div
                style={{
                    backgroundImage: `url(${img})`,
                    height: '80%',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'none',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                }}
            >
            { isBeingHovered && <SeeStats id={id} />  }

            </div>

            <div style={{
                height: '20%',
                width: '100%',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="h4" sx={{
                    fontSize: '1rem',
                    fontFamily: 'Ubuntu'
                }}>
                    {name}
                </Typography>
            </div>
        
        </div>
    )
}

export default MarketItemGridItem;