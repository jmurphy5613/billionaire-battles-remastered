import { useState } from 'react';
import { useSelector } from 'react-redux';

import BossGrid from '../boss-grid/BossGrid';
import BossInformation from '../combat/BossInformation';


const Fight:React.FC = () => {

    const nftsSelected = useSelector((state:any) => state.nftsSelected.value);

    if(nftsSelected.bossSelectedId != 0 && nftsSelected.characterSelectedId != 0) {
        console.log(nftsSelected);

        return (
            <div>
                {/* This is the area for the boss */}
                <BossInformation tokenId={nftsSelected.bossSelectedId} />
                {/* This is the area for the Attack Choices */}

                {/* This is the area for the character that is challenging */}

            </div>
        )
    }

    return (
        <div style={{
            width: '100%',
            height: '90vh',
            textAlign: 'center',
        }}>
            <BossGrid />
        </div>
    )
}

export default Fight;