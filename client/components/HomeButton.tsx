import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

import router from 'next/router';



const HomeButton = () => {

    const pushToHomepage = () => {
        router.push('/');
    }

    return (
        <IconButton onClick={pushToHomepage} sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '9999',
        }} >
            <HomeIcon htmlColor={'#fe5b77'} sx={{ fontSize: '2rem' }}  />
        </IconButton>
    )
}

export default HomeButton;