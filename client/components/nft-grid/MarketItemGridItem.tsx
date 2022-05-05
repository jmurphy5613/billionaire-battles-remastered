import { Typography } from '@mui/material';
import { useState } from 'react';


const MarketItemGridItem = props => {

    const [isBeingHovered, setIsBeingHovered] = useState(false);

    return (
        <div>
            <div>
                <HealthOnItem health={props.health} maxHealth={props.maxHealth} />
            </div>
        
            <div
                style={{
                    backgroundImage: `url(${props.img})`,
                }}
            >
            { isBeingHovered && <SeeStats id={props.id} />  }

            </div>

            <div className={classes.bioFrame}>
                <Typography variant="h4" className={classes.nftName}>
                    {props.name}
                </Typography>
            </div>
        
        </div>
    )