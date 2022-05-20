import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


const ExitPopup = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem'
        }}>
            <IconButton>
                <CloseIcon htmlColor="#ffffff" />
            </IconButton>
        </div>
    )
}

export default ExitPopup;