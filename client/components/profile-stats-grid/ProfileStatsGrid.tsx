import { Typography } from "@mui/material";
import ProfileGridItem from "./ProfileGridItem";


interface gridProps {
    name: string,
    items: Array<any>
}

const ProfileStatsGrid:React.FC<gridProps> = ({name, items}) => {
    return (
        <>
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            width: '100%',
            gridGap: '1rem',
            paddingTop: '1rem',
        }}>
            {items.map((item, index) => {
                return (
                    <ProfileGridItem key={index} name={item.name} nickname={item.nickname} damage={item.damage} />
                )
            })}
        </div>
        </>
    )
}

export default ProfileStatsGrid;