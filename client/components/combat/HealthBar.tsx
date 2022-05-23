import ProgressPar from '@ramonak/react-progress-bar';


interface HealthBarProps {
    health: number,
    maxHealth: number
}

const HealthBar:React.FC<HealthBarProps> = ({ health, maxHealth }) => {
    return (
        <div style={{width: '250px', position: 'relative', top: '1rem'}}>
            <ProgressPar labelColor="#000000" bgColor="rgb(23, 239, 151)" completed={health} maxCompleted={maxHealth}  />
        </div>
    )
}

export default HealthBar;