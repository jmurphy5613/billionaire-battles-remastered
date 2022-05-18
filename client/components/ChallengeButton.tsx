import { Button } from "@mui/material"


const ChallengeButton = () => {
    
    return (
        <a href={``} target="_blank">
        <Button variant="contained" sx={{
            backgroundColor: '#e53935',
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'none',
            width: '12rem',
            height: '3.2rem',
            '&:hover': {
                backgroundColor: '#e53935',
            },
            marginTop: '1rem',
        }}>
            Challenge
        </Button>
    </a>
    )
}

export default ChallengeButton;