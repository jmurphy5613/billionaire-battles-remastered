import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';

const Home = () => {
  const [connectedWallet, setConnectedWallet] = useState('');
  const [walletIsConnected, setWalletIsConnected] = useState(false);

  useEffect(async () => {
      await checkConnection();
  }, []);

  const checkConnection = async () => {
      const provider = window.ethereum;
      await provider.request({ method: 'eth_accounts' }).then(async (response) => {
          if(response.length == 0) {
              setWalletIsConnected(false);
          } else {
              setConnectedWallet(response[0]);
              setWalletIsConnected(true);
          }
      });
  }


  const connectWallet = async () => {

      if(walletIsConnected) {
        Router.push('/dashboard');
      }

      let provider = window.ethereum;

      if(typeof provider != 'undefined') {
          await provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
              setConnectedWallet(accounts);
              setWalletIsConnected(true);
          })
      }
      window.ethereum.on('accountsChanged', function(accounts) {
          setWalletIsConnected(true);
          setConnectedWallet(accounts);
      });
  }

  const classes = useStyles();

  return (
      <div style={{
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        width: '100vw',
      }}>
          <ConnectedStatus connected={walletIsConnected} />
          <div className={classes.titleMargin} style={{
                paddingTop: '15%',
                marginLeft: '15%',
          }}>
              <Typography sx={{
                fontFamily: theme.typography.fontFamily.secondary,
                fontSize: '1rem',
                color: '#fe5b77',
                marginBottom: '1.7rem'
              }} variant="h5" className={classes.smallTitle}>
                  Billionaire Beatdown
              </Typography>
              <Typography variant="h2" className={classes.mainTitle} sx={{
                fontFamily: theme.typography.fontFamily.primary,
                color: '#ffffff',
                fontWeight: '600'
              }}>
                  {`Fight the richest tech pioneers `}<br/>  {`on a platform built with `}
                  
                  <Typed 
                      className={classes.inerMainTitle}
                      strings={['Hardhat', 'Ethers', 'Solidity', 'Open Zeppelin']}
                      loop
                      typeSpeed={60}
                      backSpeed={60}
                  />
              </Typography>
              <Typography variant="h6" className={classes.descriptionTitle} sx={{
                fontFamily: theme.typography.fontFamily.tertiary,
                color: '#b2bAc2',
                marginTop: '1.7rem'
              }}>
                  This is a browser game that is built on the Ethereum blockchain on the rinkeby testnet.
              </Typography>
              
              <Button onClick={connectWallet} variant="contained" className={classes.landingPageButton} sx={{
                backgroundColor: '#6c56d2',
                color: '#ffffff',
                fontFamily: theme.typography.fontFamily.secondary,
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
