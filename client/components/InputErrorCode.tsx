import { Typography } from "@mui/material";


const ImportErrorCode:React.FC = () => {
    return (
        <div>
            <Typography variant="h3" sx={{
                fontSize: '1.5rem',
                fontFamily: 'Ubuntu',
                color: 'red'
            }}>
                Amount must be a number.
            </Typography>
        </div>
    )
}

export default ImportErrorCode;