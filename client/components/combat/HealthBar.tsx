import ProgressPar from '@ramonak/react-progress-bar';


interface HealthBarProps {
    health: number,
    maxHealth: number
}

const HealthBar:React.FC<HealthBarProps> = ({ health, maxHealth }) => {
    return (
        <div style={{width: '250px', position: 'relative', top: '1rem'}}>
            <ProgressPar completed={health} maxCompleted={maxHealth} />
        </div>
    )
}

export default HealthBar;