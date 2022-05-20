import { Typography } from "@mui/material";


type setCharactedSelected  = (id:number) => void;

interface OwnedCharacterSmallGridItemProps {
    name: string,
    image: string,
    health: number,
    maxHealth: number,
    setCharacterSelected: setCharactedSelected,
    id: number
}

const OwnedCharacterSmallGridItem:React.FC<OwnedCharacterSmallGridItemProps> = ({ id, name, setCharacterSelected }) => {
    

    return (
        <div onClick={e => {
            setCharacterSelected(id);
            console.log(id)
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