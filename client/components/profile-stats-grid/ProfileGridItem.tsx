import { Typography } from '@mui/material';

interface profileGridItemProps {
    name: string,
    nickname: string,
    damage: number,
}

const ProfileGridItem:React.FC<profileGridItemProps> = ({name, nickname, damage}) => {
    return (
        <div
            style={{
                backgroundColor: '#314ca6',
                height: '115px',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h5" sx={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontFamily: "Inter",
                fontWeight: '700',
                paddingLeft: '1rem',
                padding: '0',
                margin: '0',
            }}>
                {name}
            </Typography>
            <Typography variant="h5" sx={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontFamily: "Inter",
                fontWeight: '700',
                paddingLeft: '1rem',
                padding: '0',
                margin: '0',
            }}>
                {nickname}
            </Typography>
            <Typography variant="h5" sx={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontFamily: "Inter",
                fontWeight: '700',
                paddingLeft: '1rem',
                padding: '0',
                margin: '0',
            }}>
                {`${damage} dmg`}
            </Typography>
        </div>
    )
}

export default ProfileGridItem;