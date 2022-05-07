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

    if(id == 0) return <div></div>;

    return (
        <div style={{
            height: '30vh',
            display: 'inline-flex',
            flexDirection: 'column',
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
                top: '0',
                left: '0',
                height: '100%',
                width: '100%',
                zIndex: '1',
                opacity: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                    opacity: '1'
                }

            }}>
                <HealthOnItem health={health} maxHealth={maxHealth} />
                { isBeingHovered && <SeeStats id={id} />  }
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