import { Typography } from '@mui/material';


interface props {
    id: number,
}

const SeeStats:React.FC<props> = ({id}) => {


    return (
        <a target="_blank" href={`/dashboard/${id}`}>
            <Typography variant="h2" sx={{
                position: 'absolute',
                color: '#ffffff',
                zIndex: '999',
                fontSize: '1.5rem',
                fontFamily: theme.typography.h2.fontFamily,
                fontWeight: '500',
                left: '50%',
                top: '35%',
                transform: 'translate(-50%, 40%)',
                width: '100%',
                textAlign: 'center'
            }}>
                See Stats
            </Typography>
        </a>
    )
}

export default SeeStats;