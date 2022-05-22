import { Typography } from "@mui/material";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setNftsSelected } from '../../redux/features/fight';


interface OwnedCharacterSmallGridItemProps {
    name: string,
    image: string,
    health: number,
    maxHealth: number,
    id: number
}

const OwnedCharacterSmallGridItem:React.FC<OwnedCharacterSmallGridItemProps> = ({ id, name }) => {
    
    const dispatch = useDispatch();
    const nftsSelected = useSelector((state:any) => state.nftsSelected.value);

    return (
        <div onClick={e => {
            dispatch(setNftsSelected({
                bossSelectedId: nftsSelected.bossSelectedId,
                characterSelectedId: id
            }))
        }}>
            <Typography variant="h5" sx={{
                color: '#ffffff',

            }}>
                {name}
            </Typography>
        </div>
    )
}

export default OwnedCharacterSmallGridItem;