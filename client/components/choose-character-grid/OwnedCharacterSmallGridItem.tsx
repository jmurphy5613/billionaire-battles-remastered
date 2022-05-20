

interface OwnedCharacterSmallGridItemProps {
    name: string,
    image: string,
    health: number,
    maxHealth: number
}

const OwnedCharacterSmallGridItem:React.FC<OwnedCharacterSmallGridItemProps> = ({ }) => {
    

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            width: '60%',
            gridGap: '3rem',
        }}>

        </div>
    )
}

export default OwnedCharacterSmallGridItem;