import { Typography } from "@mui/material";

interface OwnedCharacterSmallGridItemProps {
    name: string,
    image: string,
    health: number,
    maxHealth: number
}

const OwnedCharacterSmallGridItem:React.FC<OwnedCharacterSmallGridItemProps> = ({ name }) => {
    

    return (
        <div style={{
            
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