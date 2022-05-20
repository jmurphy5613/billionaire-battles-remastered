//@ts-nocheck


import { Typography } from '@mui/material';

import { useState } from 'react';

import ProfileStatsGrid from '../profile-stats-grid/ProfileStatsGrid';
import OwnerUrl from '../OwnerUrl';
import ChallengeButton from '../ChallengeButton';
import SelectBillionairePopup from '../SelectBillionairePopup';

import { OwnerAddress } from '../../helpers/addresses';

type setBossSelected = () => void;

interface bossGridItemProps {
    name: string,
    health: number,
    maxHealth: number,
    description: string,
    image: string,
    wallet: string,
    tokenId: number,
    attackDamage: number,
    attackName: string,
    setBossSelected: setBossSelected
}

const BossGridItem:React.FC<bossGridItemProps> = ({
    name,
    health,
    maxHealth,
    description,
    image,
    wallet,
    tokenId,
    attackDamage,
    attackName,
    setBossSelected
}) => {

    const [abilities, setAbilites] = useState([{
        name: 'Primary Attack',
        nickname: attackName,
        damage: attackDamage
    }])

    return (
        <div style={{
            height: '450px',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                height: 'auto',
                width: '450px',
                borderRadius: '2rem',
                backgroundImage: `url(${image})`,    
                backgroundSize: 'cover'
            }} />
            <div style={{
                height: '100%',
                marginLeft: '1rem',
                width: '475px',
                textAlign: 'left'
            }}>
                <Typography variant="h3" sx={{
                    fontFamily: 'Inter',
                    color: '#ffffff',
                    fontWeight: '700',
                }}>
                    {`${name} #${tokenId}`}
                </Typography>

                <Typography variant="h4" sx={{
                    color: 'rgb(62, 67, 138)',
                    fontSize: '1.5rem',
                }}>
                    Billionaire Battles
                </Typography>
                <OwnerUrl owner={OwnerAddress} />
                <ProfileStatsGrid items={abilities} />
                <SelectBillionairePopup />
            </div>
        </div>
    )
}

export default BossGridItem;