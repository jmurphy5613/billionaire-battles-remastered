import { useState } from 'react';
import { useSelector } from 'react-redux';

import BossGrid from '../boss-grid/BossGrid';


const Fight:React.FC = () => {

    const nftsSelected = useSelector((state:any) => state.nftsSelected.value);

    if(nftsSelected.bossSelectedId != 0 && nftsSelected.characterSelectedId != 0) {
        console.log(nftsSelected);

        return (
            <div>
                
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