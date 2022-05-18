import { ethers } from "ethers";

export const hexToInt = (number) => {
    const num = ethers.BigNumber.from(number).toNumber();
    return num; 

}