import { Button } from "@mui/material";

interface submitListingProps {
    tokenId: number
}

const SubmitListing:React.FC<submitListingProps> = ({tokenId}) => {

    const createMarketListing = () => {
        
    }

    return (
        <Button>
            Submit Listing
        </Button>
    )
}

export default SubmitListing;