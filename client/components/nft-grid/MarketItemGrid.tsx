


const MarketItemGrid = props => {

    return (
        <div className={classes.grid} style={{
            marginTop: `${props.paddingTop}rem`
        }}>
            {props.gridItems.map(element => {
                {console.log(element.id)}
                return (
                    <MarketItemGridItem id={element.id} name={element.name} img={element.img} health={element.health} maxHealth={element.maxHealth} />
                )
            })}
        </div> 
    )