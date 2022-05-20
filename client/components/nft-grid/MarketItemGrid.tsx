import MarketItemGridItem from './MarketItemGridItem';


interface props {
    paddingTop: number,
    gridItems: Array<any>,
    isMarketplace: boolean,
}

const MarketItemGrid:React.FC<props> = ({paddingTop, gridItems, isMarketplace}) => {

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
                    <MarketItemGridItem key={element.id} id={element.id} name={element.name} img={element.img} health={element.health} maxHealth={element.maxHealth} isMarketplaceItem={isMarketplace} />
                )
            })}
        </div> 
    )
}

export default MarketItemGrid;