import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Typed from 'react-typed';

import ConnectedStatus from '../components/ConnectedStatus';
import HomepageOwnerNav from '../components/HomepageOwnerNav';

import { BillionaireBattlesAddress, OwnerAddress } from '../helpers/addresses';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setConnectWallet } from '../redux/features/user';

declare var window: any;

const Home = () => {

  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user.value);

  const [walletIsConnected, setWalletIsConnected] = useState(false);

  const Router = useRouter();

  const connectWallet = async () => {
    if(walletIsConnected) {
      Router.push('/dashboard');
    }

    let provider = window.ethereum;

    if(typeof provider != 'undefined') {
      await provider.request({ method: 'eth_requestAccounts' }).then( async (accounts:any) => {
          setWalletIsConnected(true);
          dispatch(setConnectWallet({ 
            wallet: accounts[0],
            isOwner: await checkIfUserIsOwner(accounts[0])
          }));
      });
    }
  }

  const checkIfUserIsOwner = async (connectedWallet:string) => {
    if(OwnerAddress.toLowerCase() === connectedWallet.toLowerCase()) {
      return true;
    }
    console.log('Hey John, you are the owner of this contract!');
  }

  return (
      <div style={{
        backgroundColor: '#282c44',
        height: '100vh',
        width: '100vw',
      }}>
          { user.isOwner ?
            <> 
              <HomepageOwnerNav title={"Create Boss"} url={"http://localhost:3000/create-boss"} /> 
              <HomepageOwnerNav title={"Create Character"} url={"http://localhost:3000/create-character"} />
              <HomepageOwnerNav title={"View Smart Contract"} url={`https://rinkeby.etherscan.io/address/${BillionaireBattlesAddress}`} />
            </>
            : <HomepageOwnerNav title={"View Smart Contract"} url={`https://rinkeby.etherscan.io/address/${BillionaireBattlesAddress}`} />
          }
          <ConnectedStatus connected={walletIsConnected} />
          <div style={{
                paddingTop: '15%',
                marginLeft: '15%',
          }}>
              <Typography sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                color: '#fe5b77',
                marginBottom: '1.7rem'
              }} variant="h5">
                  Billionaire Beatdown
              </Typography>
              <Typography variant="h2" sx={{
                fontFamily: "Inter, sans-serif",
                color: '#ffffff',
                fontWeight: '600'
              }}>
                  {`Fight the richest tech pioneers `}<br/>  {`on a platform built with `}
                  
                  <Typed 
                      strings={['Hardhat', 'Ethers', 'Solidity', 'Open Zeppelin']}
                      loop
                      typeSpeed={60}
                      backSpeed={60}
                      style={{
                          color: '#fe5b77'
                      }}
                  />
              </Typography>
              <Typography variant="h6" sx={{
                fontFamily: 'Noto Sans, sans-serif',
                color: '#b2bAc2',
                marginTop: '1.7rem'
              }}>
                  This is a browser game that is built on the Ethereum blockchain on the rinkeby testnet.
              </Typography>
              
              <Button onClick={connectWallet} variant="contained" sx={{
                backgroundColor: '#6c56d2',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                marginTop: '1.7rem',
                width: '12rem',
                height: '3.2rem',
                '&:hover': {
                    backgroundColor: '#6c56d2',
                }
              }}>
                  {walletIsConnected ? 'Play Now' : 'Connect Wallet'}
              </Button>
          </div>
      </div>
  )
}

export default Home
