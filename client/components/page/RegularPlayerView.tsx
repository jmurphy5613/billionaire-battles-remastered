import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import MarketPlace from './Marketplace';
import OwnedBillionaires from './OwnedBillionaires';
import Fight from './Fight';
import Store from './Store';


const RegularPlayerView:React.FC = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event:any, newValue:number) => {
        setValue(newValue);
    }

    return (
        <div style={{
            backgroundColor: theme.palette.primary.main,
            height: '100vh',
            width: '100vw',
        }}>
            <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {backgroundColor: "white"}}} centered>
                <Tab sx={{
                    color: '#fe5b77',
                    fontFamily: theme.typography.fontFamily.secondary,
                    fontSize: '1.0rem',
                    fontWeight: '500',
                    textTransform: 'none',
                }} label="Market Place" />
                <Tab sx={{
                    color: '#fe5b77',
                    fontFamily: theme.typography.fontFamily.secondary,
                    fontSize: '1.0rem',
                    fontWeight: '500',
                    textTransform: 'none',
                }} label="Owned Billionaires" />
                <Tab sx={{
                    color: '#fe5b77',
                    fontFamily: theme.typography.fontFamily.secondary,
                    fontSize: '1.0rem',
                    fontWeight: '500',
                    textTransform: 'none',
                }} label="Fight" />
                <Tab sx={{
                    color: '#fe5b77',
                    fontFamily: theme.typography.fontFamily.secondary,
                    fontSize: '1.0rem',
                    fontWeight: '500',
                    textTransform: 'none',
                }} label="Store" />
            </Tabs>
            {value === 0 && <MarketPlace />}
            {value === 1 && <OwnedBillionaires />}
            {value === 2 && <Fight />}
            {value === 3 && <Store />}
        </div>
    )
}

export default RegularPlayerView;