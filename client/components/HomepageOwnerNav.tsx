import { Button } from "@mui/material";


interface HomepageOwnerNavProps {
    title: string;
    url: string;
}

const HomepageOwnerNav:React.FC<HomepageOwnerNavProps> = ({ title, url }) => {
    return (
        <a href={`/${url}`}>
            <Button variant="contained" sx={{
                backgroundColor: '#6c56d2',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                width: '12rem',
                height: '3.2rem',
                '&:hover': {
                    backgroundColor: '#6c56d2',
                },
                marginTop: '1rem',
                marginLeft: '1rem',
            }}>
                { title }
            </Button>
        </a>
    )
}

export default HomepageOwnerNav;