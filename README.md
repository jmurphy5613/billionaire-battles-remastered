
# Billionaire Battles
![alt text](https://i.imgur.com/eR48Fp8.png)

This project is a browser based nft game that pits famous billionaires against each other, with a turn based combat system. All actions are ran on the ethereumn blockchain, on the rinkeby testnet.

## Features

- Market place that allows users to buy and sell their nfts that are on the platform
- Admin page for the contract uploader to mint new bosses (there are contract state variables to prevent the abuse of this)
- Fighting feature that allows users to fight bosses in turn based combat


## Demo

![alt text](https://i.imgur.com/9YcgfNl.png)

![alt text](https://i.imgur.com/CssWkUZ.png)
## Running Tests

To run tests, run the following commands:

This command creates a local blockchain, with some wallets that can be used to run tests on your smart contract
```bash
npx hardhat node
```

After writing a test in javascript, run this command to see the transaction history

```bash
  npx hardhat run tests/[yourtest].js --network
```


## Feedback

If you have any feedback, please reach out to me at jmurphy5613@gmail.com


## Acknowledgements

 - [Buildspace](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Nader Dabit](https://www.youtube.com/c/naderdabit)

