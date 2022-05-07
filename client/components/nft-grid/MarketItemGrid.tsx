import MarketItemGridItem from './MarketItemGridItem';


interface props {
    paddingTop: number,
    gridItems: Array<any>
}

const MarketItemGrid:React.FC<props> = ({paddingTop, gridItems}) => {

    if(!gridItems) return <div></div>;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            width: '65vw',
            gridGap: '3rem',
            marginTop: `${paddingTop}rem`
        }}>
            {gridItems.map(element => {
                {console.log(element.id)}
                return (
                    <MarketItemGridItem id={element.id} name={element.name} img={element.img} health={element.health} maxHealth={element.maxHealth} />
                )
            })}
        </div> 
    )
}

export default MarketItemGrid;