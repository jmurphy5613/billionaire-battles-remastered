import { Typography } from "@mui/material"


interface counterProps {
    currentId: number,
    numberOfBosses: number
}

const GridCounter:React.FC<counterProps> = ({
    currentId,
    numberOfBosses
}) => {
    return (
        <Typography variant="h3" sx={{
            color: '#ffffff',
            position: 'absolute',
            bottom: '5rem'
        }}>
            {`${currentId+1}/${numberOfBosses}`}
        </Typography>
    )
}

export default GridCounter;