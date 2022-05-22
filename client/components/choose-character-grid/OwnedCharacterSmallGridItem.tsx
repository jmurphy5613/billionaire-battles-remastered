import { Typography } from "@mui/material";


interface OwnedCharacterSmallGridItemProps {
    name: string,
    image: string,
    health: number,
    maxHealth: number,
    id: number
}

const OwnedCharacterSmallGridItem:React.FC<OwnedCharacterSmallGridItemProps> = ({ id, name }) => {
    

    return (
        <div onClick={e => {
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