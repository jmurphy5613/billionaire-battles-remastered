

interface bossGridItemProps {
    name: string,
    health: number,
    maxHealth: number,
    description: string,
    image: string,
    wallet: string
}

const BossGridItem:React.FC<bossGridItemProps> = ({
    name,
    health,
    maxHealth,
    description,
    image,
    wallet
}) => {
    return (
        <div style={{
            height: '450px',
            width: '60%',
            display: 'flex',
            border: '1px solid white'
        }}>

        </div>
    )
}

export default BossGridItem;